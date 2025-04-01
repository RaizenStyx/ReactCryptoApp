import React, { useState } from "react";
import axios from "axios";

const CryptoGrid = () => {
  const [customCryptos, setCustomCryptos] = useState([]);
  const [cryptoInput, setCryptoInput] = useState("");

  const fetchCrypto = async (cryptoId) => {
    try {
      const response = await axios.get(
        `https://api.coingecko.com/api/v3/simple/price?ids=${cryptoId}&vs_currencies=usd&include_24hr_change=true`
      );

      const logoResponse = await axios.get("https://api.coingecko.com/api/v3/coins/markets", {
        params: {
          vs_currency: "usd",
          ids: cryptoId,
          order: "market_cap_desc",
          per_page: 1,
          page: 1,
          sparkline: false,
        },
      });

      const newCrypto = {
        id: cryptoId,
        price: response.data[cryptoId]?.usd || "N/A",
        change: response.data[cryptoId]?.usd_24h_change?.toFixed(2) || "N/A",
        logo: logoResponse.data[0]?.image || "",
      };

      setCustomCryptos([...customCryptos, newCrypto]);
      setCryptoInput("");
    } catch (error) {
      console.error("Invalid crypto ID or API error:", error);
      alert("Invalid cryptocurrency name. Please try again.");
    }
  };

  // Handle Enter key press
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      fetchCrypto(cryptoInput);
    }
};

  return (
    <div style={styles.container}>
      <h3 style={styles.header}>Add a Cryptocurrency</h3>
      <input
        type="text"
        value={cryptoInput}
        onChange={(e) => setCryptoInput(e.target.value.toLowerCase())}
        onKeyDown={handleKeyDown} 
        placeholder="Enter cryptocurrency ID (e.g., 'bitcoin')"
        style={styles.input}
      />
      <button onClick={() => fetchCrypto(cryptoInput)} style={styles.button}>
        Add
      </button>

      <div style={styles.grid}>
        {customCryptos.map((crypto) => (
          <div key={crypto.id} style={styles.cryptoCard}>
            <img src={crypto.logo} alt={crypto.id} style={styles.logo} />
            <p style={styles.name}>{crypto.id.toUpperCase()}</p>
            <p style={styles.price}>${crypto.price}</p>
            <p style={{ ...styles.change, color: crypto.change >= 0 ? "green" : "red" }}>
              {crypto.change >= 0 ? "▲" : "▼"} {crypto.change}%
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = { 
    container: {
        textAlign: "center",
        fontFamily: "Arial, sans-serif",
        padding: "20px",
    },
    header: {
        marginBottom: "20px",
        fontSize: "24px",
        fontWeight: "bold",
        color: "#fff",
    },
    input  : {
        padding: "10px",
        borderRadius: "5px",
        border: "1px solid #ddd",
        marginBottom: "20px",
        width: "300px",
    },
    button : {
        padding: "10px 20px",
        borderRadius: "5px",
        backgroundColor: "#007BFF",
        color: "#fff",
        border: "none",
        cursor: "pointer",
    },
    grid: {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
        gap: "20px",
        maxWidth: "800px",
        margin: "auto",
    },
    cryptoCard: {
        background: "#fff",
        padding: "15px",
        borderRadius: "10px",
        boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
        textAlign: "center",
        border: "1px solid #ddd",
    },
    name: {
        fontSize: "18px",
        fontWeight: "bold",
        marginBottom: "5px",
      },
    price: {
        fontSize: "16px",
        fontWeight: "bold",
        marginBottom: "5px",
    },
    change: {
        fontSize: "16px",
        fontWeight: "bold",
    },
    logo: {
        width: "50px",
        height: "50px",
        objectFit: "contain",
        marginBottom: "10px",
    },
};

export default CryptoGrid;
