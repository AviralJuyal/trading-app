import React, { useEffect, useState } from "react";
import BigCard from "../components/BigCard";
import { apiEndPoint } from "../utils/apiEndPoint.js";

const Home = ({ connectToMetaMask, account }) => {
  // Local state to hold the list of tokens
  const [tokens, setTokens] = useState([]);
  // Loading state to display spinner or loading message when fetching data
  const [loading, setLoading] = useState(false);
  // State to hold information about the currently selected token
  const [selectedToken, setSelectedToken] = useState({});
  // State to hold the quoted price of a swap
  const [quotedPrice, setQuotedPrice] = useState(0);

  // Function to fetch a list of tokens from the backend
  const getTokens = async () => {
    setLoading(true);

    const response = await fetch(`${apiEndPoint}/tokens`);
    const data = await response.json();

    if (data.success) {
      // Take the first 10 tokens from the returned list so that app doesn't get heavy
      setTokens(Object.values(data.tokens).splice(0, 10));
    }
    setLoading(false);
  };

  // Function to fetch the quote price for a swap from the backend
  const getQuote = async (src, dst, amount) => {
    setLoading(true);
    const response = await fetch(
      `${apiEndPoint}/quotes?src=${src}&dst=${dst}&amount=${amount}`
    );
    const data = await response.json();

    if (data.success) {
      setQuotedPrice(data.data?.toAmount);
    } else {
      setQuotedPrice(0);
    }
    setLoading(false);
  };

  // Use effect hook to fetch tokens when the component mounts
  useEffect(() => {
    getTokens();
  }, []);

  // Use effect hook to get a quote whenever the selected token information changes
  useEffect(() => {
    // setInterval(() => {
    if (selectedToken.src && selectedToken.dst && selectedToken.amount) {
      getQuote(selectedToken.src, selectedToken.dst, selectedToken.amount);
    }
    // }, 1500);
  }, [selectedToken]);

  return (
    <main className="w-full flex h-[1000px] items-start justify-center bg-[#f4f6fc]">
      <div className="w-full flex flex-col items-center justify-center">
        <div className="w-full flex items-center justify-center px-10">
          {/* Render the BigCard component with necessary props */}
          <BigCard
            loading={loading}
            setLoading={setLoading}
            connectToMetaMask={connectToMetaMask}
            tokens={tokens}
            selectedToken={selectedToken}
            setSelectedToken={setSelectedToken}
            quotedPrice={quotedPrice}
            account={account}
          />
        </div>
      </div>
    </main>
  );
};

export default Home;
