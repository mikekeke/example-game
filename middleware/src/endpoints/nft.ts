import { BigNumber, providers } from 'ethers';
import { NativeNftSale__factory } from '../typechain';
export async function getSigner() {
  const eth = (window as any).ethereum;
  console.log("mw: eth", eth);
  const provider = new providers.Web3Provider(eth);
  console.log("mw: provider", provider);
  const signer = provider.getSigner();
  console.log("mw: signer", signer);
  
  const contr = NativeNftSale__factory.connect(
    "9ac22615B3A888f9EB5D2B26746AccF1E3dd28B2",
    signer
    );
    
    const addr = await contr.nftAddress();
    console.log("mw: nft address", addr);


  // let tx = await contr.updatePrice(4);
  // console.log(ts)
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