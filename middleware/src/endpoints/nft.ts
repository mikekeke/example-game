import { BigNumber, providers } from 'ethers';
import { NativeNftSale__factory } from '../typechain';
export async function testNftEndpoint() {
  const eth = (window as any).ethereum;
  console.log("mw: eth", eth);
  const provider = new providers.Web3Provider(eth);
  console.log("mw: provider", provider);
  const signer = provider.getSigner();
  console.log("mw: signer", signer);

  //todo: get from env?
  const contr = NativeNftSale__factory.connect(
    "e8C2c3494aee4F0699eEB18c5789f4863CdCDA46",
    signer
  );

  const addr = await contr.nftAddress();
  console.log("mw: nft address", addr);


  const tokenPrice = await contr.nftPrice();
  const gasPrice = await provider.getGasPrice();


  const tx = await contr.buyNft(
    "CF578a945dc50aa74fAe976D4197F0d6D0A1d41D",
    0, {
    gasPrice,
    gasLimit: 800000,
    value: tokenPrice.toString(),
  });


  let res = await tx.wait(1);
  console.log("mw: res", res);

  return res;
}