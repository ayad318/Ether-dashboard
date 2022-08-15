const Web3 = require("web3");

const express = require("express");

const router = express.Router();
const Wallet = require("../models/wallet");

const min_abi = require("../min_abi.json");

let log = console.log;
const web3 = new Web3(
  new Web3.providers.HttpProvider(
    "https://rinkeby.infura.io/v3/ede17f663d23451fa7b9b7af6c614346"
  )
);

router.use("/:address/register", async (req, res) => {
  const wallet = new Wallet({
    address: req.params.address,
    EFL_balance: await getTokenBalance(
      "0x14Cd97748dCd3dB4B2DcAaBB9FF2132701C14339",
      req.params.address,
      web3
    ),
    ETH_balance: await web3.eth
      .getBalance(req.params.address)
      .then(web3.utils.fromWei)
      .then(parseFloat),
  });
  if (wallet.EFL_balance >= 10) {
    wallet.USDT_balance = await getTokenBalance(
      "0x3b00ef435fa4fcff5c209a37d1f3dcff37c705ad",
      req.params.address,
      web3
    );
    wallet.LINK_balance = await getTokenBalance(
      "0x01BE23585060835E02B77ef475b0Cc51aA1e0709",
      req.params.address,
      web3
    );
  }
  try {
    const deleted = await Wallet.deleteOne({ address: req.params.address });
    const savedWallet = await wallet.save();
    res.send(savedWallet);
    log("adding " + req.params.address + " to db.");
  } catch (err) {
    log(err);
  }
});

router.get("/:address/balances", async (req, res) => {
  const wallet = await Wallet.findOne({ address: req.params.address });
  log(`getting ${req.params.address} balances`);
  res.send(wallet);
});

router.get("/:address", (req, res) => {
  res.send(req.params.address);
  log(req.params.address);
});

async function getTokenBalance(tokenAddress, walletAddress, web3) {
  let contract = new web3.eth.Contract(min_abi, tokenAddress);

  let balance = await contract.methods.balanceOf(walletAddress).call();
  if (tokenAddress == "0x14Cd97748dCd3dB4B2DcAaBB9FF2132701C14339") {
    return balance;
  }
  console.log(balance);
  const format = parseFloat(web3.utils.fromWei(balance));

  return format;
}
module.exports = router;
