import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import './Converter.css'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';


// Register the necessary chart components
ChartJS.register(
  CategoryScale, // Needed for the x-axis category scale (like dates)
  LinearScale,   // Needed for the y-axis linear scale (for prices)
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Converter = () => {
  const [amount, setAmount] = useState(0);
  const [fromCurrency, setFromCurrency] = useState('ethereum');
  const [toCurrency, setToCurrency] = useState('usd');
  const [convertedAmount, setConvertedAmount] = useState(null);
  const [exchangeRate, setExchangeRate] = useState(0);
  const [walletConnected, setWalletConnected] = useState(false);
  const [priceHistory, setPriceHistory] = useState([]);

  const currencies = [
    { id: 'bitcoin', label: 'BTC' },
    { id: 'ethereum', label: 'ETH' },
    { id: 'usd', label: 'USD' },
    { id: 'inr', label: 'INR' }
  ];

  const fetchExchangeRate = async () => {
    try {
      const response = await axios.get(
        `https://api.coingecko.com/api/v3/simple/price?ids=${fromCurrency}&vs_currencies=${toCurrency}`
      );
      setExchangeRate(response.data[fromCurrency][toCurrency]);
    } catch (error) {
      console.error('Error fetching exchange rate:', error);
    }
  };

  const fetchPriceHistory = async () => {
    try {
      const response = await axios.get(
        `https://api.coingecko.com/api/v3/coins/${fromCurrency}/market_chart?vs_currency=${toCurrency}&days=7`
      );
      setPriceHistory(response.data.prices);
    } catch (error) {
      console.error('Error fetching price history:', error);
    }
  };

  const handleConvert = () => {
    setConvertedAmount(amount * exchangeRate);
  };

  useEffect(() => {
    if (fromCurrency && toCurrency) {
      fetchExchangeRate();
      fetchPriceHistory();
    }
  }, [fromCurrency, toCurrency]);

  const connectWallet = () => {
    setWalletConnected(true);
  };

  // Prepare data for the graph
  const chartData = {
    labels: priceHistory.map((price) => {
      const date = new Date(price[0]);
      return `${date.getDate()}/${date.getMonth() + 1}`;
    }),
    datasets: [
      {
        label: `${fromCurrency.toUpperCase()} Price in ${toCurrency.toUpperCase()}`,
        data: priceHistory.map((price) => price[1]),
        fill: false,
        borderColor: '#00cc66',
        tension: 0.1
      }
    ]
  };

  return (
    <div id="converter-container">
      <div id="converter-card">
        <h2 id="converter-title">Crypto Converter</h2>

        {/* From Currency Selection */}
        <label htmlFor="fromCurrency" id="from-label">From</label>
        <select
          id="fromCurrency"
          value={fromCurrency}
          onChange={(e) => setFromCurrency(e.target.value)}
        >
          {currencies.map((currency) => (
            <option key={currency.id} value={currency.id}>
              {currency.label}
            </option>
          ))}
        </select>

        {/* Amount Input */}
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          id="amount-input"
          placeholder="Enter amount"
        />

        {/* To Currency Selection */}
        <label htmlFor="toCurrency" id="to-label">To</label>
        <select
          id="toCurrency"
          value={toCurrency}
          onChange={(e) => setToCurrency(e.target.value)}
        >
          {currencies.map((currency) => (
            <option key={currency.id} value={currency.id}>
              {currency.label}
            </option>
          ))}
        </select>

        {/* Convert Button */}
        <button onClick={handleConvert} id="convert-button">
          Convert
        </button>

        {/* Converted Amount Display */}
        {convertedAmount !== null && (
          <p id="converted-result">
            {amount} {fromCurrency.toUpperCase()} = {convertedAmount.toFixed(4)} {toCurrency.toUpperCase()}
          </p>
        )}

        {/* Price Trend Graph */}
        <div id="chart-container">
          <Line data={chartData} />
        </div>

      </div>
    </div>
  );
};

export default Converter;
