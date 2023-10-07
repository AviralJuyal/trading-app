const { default: axios } = require("axios");
require("dotenv").config();

exports.getTokens = async (req, res) => {
  try {
    const response = await axios({
      method: "get",
      url: `${process.env.API_END_POINT}/swap/v5.2/1/tokens`,
      responseType: "json",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.API_KEY}`,
      },
    });

    res.status(200).send({ success: true, tokens: response.data.tokens });
  } catch (error) {
    console.log(error);

    res.status(500).send({ success: false, msg: "some error occurred" });
  }
};

exports.getQuote = async (req, res) => {
  try {
    const { src, dst, amount } = req.query;
    const response = await axios({
      method: "get",
      url: `${process.env.API_END_POINT}/swap/v5.2/1/quote?src=${src}&dst=${dst}&amount=${amount}`,
      responseType: "json",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.API_KEY}`,
      },
    });

    res.status(200).send({ success: true, data: response.data });
  } catch (error) {
    console.log(error);

    res.status(500).send({ success: false, msg: "some error occurred" });
  }
};

exports.Swap = async (req, res) => {
  try {
    const { src, dst, amount, from, slippage } = req.query;
    const response = await axios({
      method: "get",
      //   url: `${process.env.API_END_POINT}/swap/v5.2/1/swap?src=${src}&dst=${dst}&amount=${amount}&from=${from}&slippage=${slippage}`,
      url: `https://api-rinkeby.1inch.dev/swap/v5.2/1/swap?src=${src}&dst=${dst}&amount=${amount}&from=${from}&slippage=${slippage}`,

      responseType: "json",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.API_KEY}`,
      },
    });

    res.status(200).send({ success: true, data: response.data });
  } catch (error) {
    console.log(error);

    res.status(500).send({ success: false, msg: "some error occurred" });
  }
};
