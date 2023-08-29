import { providers } from 'ethers';
import { NativeNftSale__factory } from '../typechain';
import { normalizeAddress } from '../utils';

export async function enableAchievements(
  walletAddress: string,
  achievementsProxyContract: string // Address of `NativeProxy` should be passed here
  ) {
  const eth = (window as any).ethereum;
  const provider = new providers.Web3Provider(eth);
  const signer = provider.getSigner();

  const contr = NativeNftSale__factory.connect(
    achievementsProxyContract,
    signer
  );
  const tokenPrice = await contr.nftPrice();
  const gasPrice = await provider.getGasPrice();
  const tx = await contr.buyNft(
    normalizeAddress(walletAddress),
    0, // for achievement there is only one type of NFT mapping, so index now is always 0
    {
      gasPrice,
      gasLimit: 800000,
      value: tokenPrice.toString(),
    });

  let res = await tx.wait(1);
  return res;
}
