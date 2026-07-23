/**
 * Liquidity Tape — CORS proxy for Binance Futures public API
 * + xavfsiz Telegram relay.
 *
 * 1) BINANCE PROXY
 *    Binance ba'zi endpointlarga brauzerdan to'g'ridan-to'g'ri so'rov
 *    yuborishga CORS ruxsat bermaydi. Bu Worker so'rovni server tomonidan
 *    (brauzer emas) Binance'ga yuboradi va javobga CORS header qo'shib
 *    qaytaradi.
 *
 * 2) TELEGRAM RELAY (/tg/send)
 *    Bot tokenni brauzerga (dashboard koduga) yozib qo'ysak, sahifa manbasini
 *    ko'rgan har kim undan foydalanib qolishi mumkin. Shuning uchun token
 *    faqat shu Worker'ning maxfiy o'zgaruvchisida (environment secret)
 *    saqlanadi — brauzer faqat "chat_id" va "text" yuboradi, Worker esa
 *    tokenni qo'shib Telegram'ga jo'natadi.
 *
 * Deploy qilish (bepul, Cloudflare akkount kifoya):
 *   1. https://dash.cloudflare.com -> Workers & Pages -> Create -> Create Worker
 *   2. Kodni tahrirlovchiga shu faylning to'liq mazmunini joylashtiring -> Deploy
 *   3. Worker sahifasida: Settings -> Variables and Secrets -> Add
 *      Nomi:  TELEGRAM_BOT_TOKEN
 *      Qiymati: BotFather bergan token
 *      Type: Secret (Encrypt) -> Save and deploy
 *   4. Sizga beriladigan https://<nom>.<subdomain>.workers.dev manzilini nusxalang
 *   5. Dashboard'da Sozlamalar -> "API manzili" maydoniga shu manzilni yozing
 *   6. Dashboard'da Sozlamalar -> Telegram bo'limida yoqing va Chat ID kiriting
 *      (token bu yerda kerak emas — u faqat Worker'da turadi)
 */

export default {
  async fetch(request, env) {
    const corsHeaders = {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "*",
    };

    if (request.method === "OPTIONS") {
      return new Response(null, { headers: corsHeaders });
    }

    const incoming = new URL(request.url);

    // ---------- Telegram relay ----------
    if (incoming.pathname === "/tg/send") {
      if (request.method !== "POST") {
        return new Response(JSON.stringify({ error: "POST talab qilinadi" }), {
          status: 405,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (!env.TELEGRAM_BOT_TOKEN) {
        return new Response(
          JSON.stringify({ error: "TELEGRAM_BOT_TOKEN Worker'da sozlanmagan (Settings -> Variables and Secrets)" }),
          { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      let payload;
      try {
        payload = await request.json();
      } catch (e) {
        return new Response(JSON.stringify({ error: "JSON body noto'g'ri" }), {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      const { chat_id, text } = payload || {};
      if (!chat_id || !text) {
        return new Response(JSON.stringify({ error: "chat_id va text talab qilinadi" }), {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      try {
        const tgResp = await fetch(`https://api.telegram.org/bot${env.TELEGRAM_BOT_TOKEN}/sendMessage`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ chat_id, text, parse_mode: "HTML" }),
        });
        const body = await tgResp.text();
        return new Response(body, {
          status: tgResp.status,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      } catch (err) {
        return new Response(JSON.stringify({ error: String(err) }), {
          status: 502,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
    }

    // ---------- Binance proxy (default) ----------
    const target = "https://fapi.binance.com" + incoming.pathname + incoming.search;
    try {
      const upstream = await fetch(target, {
        method: "GET",
        headers: { "Accept": "application/json" },
      });
      const body = await upstream.text();
      return new Response(body, {
        status: upstream.status,
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
          "Cache-Control": "no-store",
        },
      });
    } catch (err) {
      return new Response(JSON.stringify({ error: String(err) }), {
        status: 502,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
  },
};
