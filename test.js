const { ethers, utils } = require("ethers");
require("dotenv").config();

const provider = new ethers.providers.JsonRpcProvider(
  process.env.GOERLI_RPC_URL
);
const wallet1 = new ethers.Wallet(process.env.WALLET_PRIVATE_KEY1, provider);
const wallet2 = new ethers.Wallet(process.env.WALLET_PRIVATE_KEY2, provider);

const marketplaceAddress = "0xaDa82fA35072D601E991CE7e3a1b96eC92e16DAc";
const marketplaceAbi =
  require("./artifacts/contracts/Marketplace.sol/Marketplace.json").abi;
const nftAddress = "0x5c0981Bd7BAD040DC473f08e5ad16CC7677CC115";
const nftAbi = require("./artifacts/contracts/NFT.sol/NFT.json").abi;

const marketplaceContract = new ethers.Contract(
  marketplaceAddress,
  marketplaceAbi,
  provider
);
const nftContract = new ethers.Contract(nftAddress, nftAbi, provider);

const mintToken = async (tokenURI) => {
  console.log("Start Mint Token...");
  const txn = await nftContract.populateTransaction.mintToken(tokenURI);
  console.log(txn);
  const txnRes = await wallet2.sendTransaction(txn);
  console.log(txnRes);
  const txnReceipt = await txnRes.wait();
  console.log(txnReceipt);
  console.log("End Mint Token...");
};

(async () => {
  // await mintToken(
  //   "https://gateway.pinata.cloud/ipfs/QmbfGfcwzYGwtQL4cxUt6HbspmGWTbxYhciTTpVxxwpWVW"
  // );
  // let res = await marketplaceContract.createMarketSale(nftAddress, 1);
  // console.log(res);
  // let res = await marketplaceContract.fetchAvailableMarketItems();
  // const price = res[0].price;
  // const txn = await marketplaceContract.populateTransaction.createMarketSale(
  //   nftAddress,
  //   1
  // );
  // const txnRes = await wallet2.sendTransaction(txn);
  // console.log(txnRes);
  // const receipt = await txnRes.wait();
  // console.log(receipt);
  let res = await marketplaceContract.fetchAvailableMarketItemsCustom(0, 8);
  console.log(res);
  // const res = await nftContract.getTokensOwnedByMe({ from: wallet1.address });
  // console.log(res[0].toNumber());
})();

/*
https://gateway.pinata.cloud/ipfs/QmP8wuS8EnCHxcDijXBCT8mjL3kXBmyF7wfvgbZA3g3nWV
https://gateway.pinata.cloud/ipfs/QmbfGfcwzYGwtQL4cxUt6HbspmGWTbxYhciTTpVxxwpWVW
*/
