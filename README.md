# 📊 Liquidity Tape

> Advanced Binance Futures Liquidity, Funding Rate & Open Interest Signal Dashboard

Liquidity Tape is a lightweight browser-based dashboard that monitors Binance Futures markets in real time and detects potential trading opportunities using:

- 💧 Liquidity Sweeps
- 📈 Funding Rate Analysis
- 📊 Open Interest Divergence
- 🎯 Entry / Stop Loss / Take Profit Signals

No backend server or API key is required.

---

## ✨ Features

- 📡 Real-time Binance Futures monitoring
- 💧 Liquidity Sweep detection
- 📊 Funding Rate analysis
- 📈 Open Interest divergence detection
- 🎯 Automatic BUY / SELL trade setups
- 🛑 Entry, Stop Loss and Take Profit calculation
- 📜 Signal history
- 🔍 Coin search
- ⭐ Custom watchlist
- ⚙️ Fully configurable settings
- 🌙 Modern dark trading interface

---

## 📷 Preview

<img width="100%" src="preview.png">

<img width="1892" height="900" alt="image" src="https://github.com/user-attachments/assets/06da3007-63eb-4991-83be-8f149106c414" />


---

## 🚀 Getting Started

Clone the repository

```bash
git clone https://github.com/sardor9/LiquidityTape.git
```

Go into the project

```bash
cd LiquidityTape
```

Open

```
index.html
```

or use a local server

```bash
python -m http.server
```

or

```bash
npx serve
```

---

## ⚙️ Configuration

The dashboard allows you to configure:

- API URL
- Refresh interval
- Number of monitored coins
- Funding threshold
- Sweep interval
- Sweep lookback
- Open Interest thresholds
- Risk : Reward ratio
- Stop Loss buffer

All settings are saved in LocalStorage.

---

## 📊 Signals

### Liquidity Sweep

Detects when price takes previous highs/lows and immediately rejects.

Produces:

- BUY Signal
- SELL Signal

---

### Funding Rate

Shows crowded positioning.

Positive Funding

- Possible Long squeeze
- Potential SELL opportunity

Negative Funding

- Possible Short squeeze
- Potential BUY opportunity

---

### Open Interest Divergence

Compares:

- Price movement
- Open Interest movement

Used to identify:

- Trend continuation
- Weak rallies
- Liquidations
- Market exhaustion

---

## 🛠 Tech Stack

- HTML5
- CSS3
- Vanilla JavaScript
- Binance Futures Public API

No framework required.

---

## 📂 Project Structure

```
LiquidityTape/

│── index.html
│── README.md
```

---

## 🌐 Data Source

Binance Futures Public REST API

- Premium Index
- Funding Rate
- Klines
- Open Interest
- 24hr Ticker

No API Key required.

---

## ⚠️ CORS

Some browsers may block direct requests to Binance because of CORS restrictions.

If necessary, use a Cloudflare Worker or another proxy.

---

## 📌 Roadmap

- [ ] Multi-timeframe analysis
- [ ] WebSocket support
- [ ] Telegram alerts
- [ ] Discord notifications
- [ ] Email alerts
- [ ] TradingView integration
- [ ] Portfolio tracking
- [ ] Multi-exchange support

---

## 🤝 Contributing

Pull requests are welcome.

Feel free to fork the project and submit improvements.

---

## 📄 License

MIT License

---

## 👨‍💻 Author

**Sardor**

GitHub

https://github.com/sardor9
