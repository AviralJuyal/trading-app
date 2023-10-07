const express = require("express");
const { getTokens, getQuote, Swap } = require("../controllers/swapController");
const router = express.Router();

router.route("/tokens").get(getTokens);
router.route("/quotes").get(getQuote);

router.route("/swap").get(Swap);


module.exports = router;
