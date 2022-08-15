const mongoose = require("mongoose");

const WalletSchema = mongoose.Schema({
  address: {
    type: String,
    required: true,
  },
  EFL_balance: {
    type: Number,
    default: 0,
  },
  ETH_balance: {
    type: Number,
    default: 0,
  },
  USDT_balance: {
    type: Number,
    default: 0,
  },
  LINK_balance: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model("Wallet", WalletSchema);
