import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

const cryptoList = ["bitcoin", "ethereum", "dogecoin", "cardano", "solana", "ripple", "litecoin", "polkadot", "chainlink", "stellar"];

const CryptoTracker = () => {
  const [cryptoData, setCryptoData] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const carouselRef = useRef(null);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  useEffect(() => {
    const fetchCryptoData = async () => {
      try {
        const response = await axios.get(
          `https://api.coingecko.com/api/v3/simple/price?ids=${cryptoList.join(",")}&vs_currencies=usd&include_24hr_change=true`
        );

        const logosResponse = await axios.get("https://api.coingecko.com/api/v3/coins/markets", {
          params: {
            vs_currency: "usd",
            ids: cryptoList.join(","),
            order: "market_cap_desc",
            per_page: cryptoList.length,
            page: 1,
            sparkline: false,
          },
        });

        const logos = logosResponse.data.reduce((acc, coin) => {
          acc[coin.id] = coin.image;
          return acc;
        }, {});

        setCryptoData({ prices: response.data, logos });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchCryptoData();
    const interval = setInterval(fetchCryptoData, 60000); // Refresh every minute

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const autoScroll = () => {
      if (!isDragging && carouselRef.current) {
        carouselRef.current.scrollLeft += 5;
        if (carouselRef.current.scrollLeft >= carouselRef.current.scrollWidth - carouselRef.current.clientWidth) {
          carouselRef.current.scrollLeft = 0; // Reset to beginning
        }
      }
    };

    const interval = setInterval(autoScroll, 30);
    return () => clearInterval(interval);
  }, [isDragging]);

  const handleMouseDown = (e) => {
    setIsDragging(true);
    startX.current = e.pageX - carouselRef.current.offsetLeft;
    scrollLeft.current = carouselRef.current.scrollLeft;
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - carouselRef.current.offsetLeft;
    const walk = (x - startX.current) * 10; // Increased drag speed
    carouselRef.current.scrollLeft = scrollLeft.current - walk;
  };

  const handleMouseUp = () => setIsDragging(false);
  const handleMouseLeave = () => setIsDragging(false);

  if (!cryptoData) return <p>Loading...</p>;

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>My favorite Crypto's and their prices</h2>
      <div
        ref={carouselRef}
        style={styles.carousel}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
      >
        {[...cryptoList, ...cryptoList, ...cryptoList, ...cryptoList, ...cryptoList, ...cryptoList, ...cryptoList, ...cryptoList, ...cryptoList].map((coin, index) => {
          const crypto = cryptoData.prices[coin];
          const logo = cryptoData.logos[coin];

          return (
            <div key={coin} style={styles.cryptoCard}>
              <img src={logo} alt={coin} style={styles.logo} />
              <p style={styles.name}>{coin.toUpperCase()}</p>
              <p style={styles.price}>${crypto.usd.toLocaleString()}</p>
              <p style={{ ...styles.change, color: crypto.usd_24h_change >= 0 ? "green" : "red" }}>
                {crypto.usd_24h_change >= 0 ? "▲" : "▼"} {crypto.usd_24h_change.toFixed(2)}%
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const styles = {
  container: {
    textAlign: "center",
    fontFamily: "Arial, sans-serif",
    padding: "20px",
    color: "#333",
    maxWidth: "95%",
  },
  header: {
    marginBottom: "20px",
    fontSize: "24px",
    fontWeight: "bold",
    color: "#fff",
  },
  carousel: {
    display: "flex",
    overflowX: "hidden", // Hides horizontal scroll bar
    scrollBehavior: "smooth",
    whiteSpace: "nowrap",
    gap: "10px",
    padding: "10px",
    cursor: "grab",
    userSelect: "none",
    scrollbarWidth: "none", // Hides scrollbar in Firefox
    msOverflowStyle: "none", // Hides scrollbar in IE/Edge
    width: "100%",
  },
  cryptoCard: {
    background: "#fff",
    padding: "15px",
    borderRadius: "10px",
    boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
    textAlign: "center",
    border: "1px solid #ddd",
    minWidth: "180px",
    maxWidth: "180px",
    transition: "transform 0.3s",
  },
  logo: {
    width: "50px",
    height: "50px",
    objectFit: "contain",
    marginBottom: "10px",
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
};

export default CryptoTracker;
