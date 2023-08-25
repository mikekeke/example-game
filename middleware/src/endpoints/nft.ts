import { BigNumber, providers } from 'ethers';
import { NativeNftSale__factory } from '../typechain';
import { normalizeAddress } from '../utils';
export async function enableAchievements(walletAddress: string) {
  const eth = (window as any).ethereum;
  console.log("mw: eth", eth);
  const provider = new providers.Web3Provider(eth);
  console.log("mw: provider", provider);
  const signer = provider.getSigner();
  console.log("mw: signer", signer);


  //todo: better way to put hardcoded hex
  const contr = NativeNftSale__factory.connect(
    "4F04B4A9964e45A9226564479448B4e4F0b33398",
    signer
  );

  const addr = await contr.nftAddress();
  console.log("mw: nft address", addr);


  const tokenPrice = await contr.nftPrice();
  const gasPrice = await provider.getGasPrice();


  const tx = await contr.buyNft(
    normalizeAddress(walletAddress),
    0, {
    gasPrice,
    gasLimit: 800000,
    value: tokenPrice.toString(),
  });


  let res = await tx.wait(1);
  console.log("mw: res", res);

  return res;
}