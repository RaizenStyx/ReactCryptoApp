# Crypto Tracker App

## Description

The **Crypto Tracker App** allows users to track real-time prices of popular cryptocurrencies. The app fetches data from the CoinGecko API, displaying the current price and 24-hour percentage change for each cryptocurrency. Additionally, users can add custom cryptocurrencies by entering the coin's name (e.g., "bitcoin", "ethereum") into an input field. The app will display the newly added cryptocurrencies in a grid format along with their prices and price changes.

The app also includes a **carousel** to display cryptocurrency cards, which auto-scrolls and can be manually dragged by the user.

## Features

- **Real-Time Data**: The app fetches the latest cryptocurrency prices and percentage changes from the [CoinGecko API](https://www.coingecko.com/).
- **Add Custom Cryptos**: Users can input any cryptocurrency (by its CoinGecko ID) to add it to the grid.
- **Auto Scroll Carousel**: Displays cryptocurrencies in a scrollable carousel. The carousel auto-scrolls and can be manually dragged.
- **Responsive Design**: The layout is designed to be responsive, ensuring a smooth experience across different devices.

## Technologies Used

- **React**: The front-end library used to build the app.
- **Axios**: For making HTTP requests to the CoinGecko API.
- **CoinGecko API**: The API used to fetch cryptocurrency prices and data.

## Usage
- **View Cryptos**: The app will automatically load the current prices and 24-hour percentage changes for a default list of cryptocurrencies.

- **Add Cryptos**: Use the input field below the carousel to add a new cryptocurrency by typing its CoinGecko ID (e.g., "bitcoin", "ethereum"). Press Enter or click the Add button to add the coin to the grid.

- **Drag to Scroll**: Click and hold the carousel to drag and view more cryptocurrency cards. The carousel will also auto-scroll every few seconds.

# Code Overview

## Components

- **CryptoTracker**: This is the main component responsible for displaying the carousel and fetching cryptocurrency data. It uses the useEffect hook to call the CoinGecko API and update the state periodically.

- **CryptoGrid**: This component allows users to add custom cryptocurrencies to a grid. It handles fetching the data for the new crypto and displays it with the price and percentage change.

## Functionality
- The CryptoTracker component fetches cryptocurrency data and sets it in the state. This data includes price and 24-hour change percentage.

- The CryptoGrid component allows users to input the name of a cryptocurrency and add it to the grid. The data for the custom coin is fetched from the API and displayed alongside other coins.

- The carousel automatically scrolls and can be dragged by the user to view more coins. It is continuously looped to ensure a smooth user experience.