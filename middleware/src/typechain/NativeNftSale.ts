/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumber,
  BigNumberish,
  BytesLike,
  CallOverrides,
  ContractTransaction,
  Overrides,
  PayableOverrides,
  PopulatedTransaction,
  Signer,
  utils,
} from "ethers";
import type {
  FunctionFragment,
  Result,
  EventFragment,
} from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type {
  TypedEventFilter,
  TypedEvent,
  TypedListener,
  OnEvent,
} from "./common";

export interface NativeNftSaleInterface extends utils.Interface {
  functions: {
    "initialized()": FunctionFragment;
    "nftAddress()": FunctionFragment;
    "nftPrice()": FunctionFragment;
    "owner()": FunctionFragment;
    "renounceOwnership()": FunctionFragment;
    "transferOwnership(address)": FunctionFragment;
    "typeMapper()": FunctionFragment;
    "initialize(address,address,uint256)": FunctionFragment;
    "buyNft(address,uint8)": FunctionFragment;
    "updatePrice(uint256)": FunctionFragment;
    "withdraw(address)": FunctionFragment;
    "upgradeContract(address)": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
      | "initialized"
      | "initialized()"
      | "nftAddress"
      | "nftAddress()"
      | "nftPrice"
      | "nftPrice()"
      | "owner"
      | "owner()"
      | "renounceOwnership"
      | "renounceOwnership()"
      | "transferOwnership"
      | "transferOwnership(address)"
      | "typeMapper"
      | "typeMapper()"
      | "initialize"
      | "initialize(address,address,uint256)"
      | "buyNft"
      | "buyNft(address,uint8)"
      | "updatePrice"
      | "updatePrice(uint256)"
      | "withdraw"
      | "withdraw(address)"
      | "upgradeContract"
      | "upgradeContract(address)"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "initialized",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "initialized()",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "nftAddress",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "nftAddress()",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "nftPrice", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "nftPrice()",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "owner", values?: undefined): string;
  encodeFunctionData(functionFragment: "owner()", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "renounceOwnership",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "renounceOwnership()",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "transferOwnership",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "transferOwnership(address)",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "typeMapper",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "typeMapper()",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "initialize",
    values: [string, string, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "initialize(address,address,uint256)",
    values: [string, string, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "buyNft",
    values: [string, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "buyNft(address,uint8)",
    values: [string, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "updatePrice",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "updatePrice(uint256)",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(functionFragment: "withdraw", values: [string]): string;
  encodeFunctionData(
    functionFragment: "withdraw(address)",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "upgradeContract",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "upgradeContract(address)",
    values: [string]
  ): string;

  decodeFunctionResult(
    functionFragment: "initialized",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "initialized()",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "nftAddress", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "nftAddress()",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "nftPrice", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "nftPrice()", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "owner", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "owner()", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "renounceOwnership",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "renounceOwnership()",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "transferOwnership",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "transferOwnership(address)",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "typeMapper", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "typeMapper()",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "initialize", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "initialize(address,address,uint256)",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "buyNft", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "buyNft(address,uint8)",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "updatePrice",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "updatePrice(uint256)",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "withdraw", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "withdraw(address)",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "upgradeContract",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "upgradeContract(address)",
    data: BytesLike
  ): Result;

  events: {
    "BuyNFT(uint256,uint256,address,address)": EventFragment;
    "Initialized(address,address)": EventFragment;
    "OwnershipTransferred(address,address)": EventFragment;
    "UpdateNftProxy(address,address)": EventFragment;
    "UpdatePrice(uint256,uint256)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "BuyNFT"): EventFragment;
  getEvent(
    nameOrSignatureOrTopic: "BuyNFT(uint256,uint256,address,address)"
  ): EventFragment;
  getEvent(nameOrSignatureOrTopic: "Initialized"): EventFragment;
  getEvent(
    nameOrSignatureOrTopic: "Initialized(address,address)"
  ): EventFragment;
  getEvent(nameOrSignatureOrTopic: "OwnershipTransferred"): EventFragment;
  getEvent(
    nameOrSignatureOrTopic: "OwnershipTransferred(address,address)"
  ): EventFragment;
  getEvent(nameOrSignatureOrTopic: "UpdateNftProxy"): EventFragment;
  getEvent(
    nameOrSignatureOrTopic: "UpdateNftProxy(address,address)"
  ): EventFragment;
  getEvent(nameOrSignatureOrTopic: "UpdatePrice"): EventFragment;
  getEvent(
    nameOrSignatureOrTopic: "UpdatePrice(uint256,uint256)"
  ): EventFragment;
}

export interface BuyNFTEventObject {
  tokenId: BigNumber;
  PRICE: BigNumber;
  receiver: string;
  buyer: string;
}
export type BuyNFTEvent = TypedEvent<
  [BigNumber, BigNumber, string, string],
  BuyNFTEventObject
>;

export type BuyNFTEventFilter = TypedEventFilter<BuyNFTEvent>;

export interface InitializedEventObject {
  owner: string;
  nft: string;
}
export type InitializedEvent = TypedEvent<
  [string, string],
  InitializedEventObject
>;

export type InitializedEventFilter = TypedEventFilter<InitializedEvent>;

export interface OwnershipTransferredEventObject {
  previousOwner: string;
  newOwner: string;
}
export type OwnershipTransferredEvent = TypedEvent<
  [string, string],
  OwnershipTransferredEventObject
>;

export type OwnershipTransferredEventFilter =
  TypedEventFilter<OwnershipTransferredEvent>;

export interface UpdateNftProxyEventObject {
  oldProxy: string;
  newProxy: string;
}
export type UpdateNftProxyEvent = TypedEvent<
  [string, string],
  UpdateNftProxyEventObject
>;

export type UpdateNftProxyEventFilter = TypedEventFilter<UpdateNftProxyEvent>;

export interface UpdatePriceEventObject {
  oldPrice: BigNumber;
  newPrice: BigNumber;
}
export type UpdatePriceEvent = TypedEvent<
  [BigNumber, BigNumber],
  UpdatePriceEventObject
>;

export type UpdatePriceEventFilter = TypedEventFilter<UpdatePriceEvent>;

export interface NativeNftSale extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: NativeNftSaleInterface;

  queryFilter<TEvent extends TypedEvent>(
    event: TypedEventFilter<TEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TEvent>>;

  listeners<TEvent extends TypedEvent>(
    eventFilter?: TypedEventFilter<TEvent>
  ): Array<TypedListener<TEvent>>;
  listeners(eventName?: string): Array<Listener>;
  removeAllListeners<TEvent extends TypedEvent>(
    eventFilter: TypedEventFilter<TEvent>
  ): this;
  removeAllListeners(eventName?: string): this;
  off: OnEvent<this>;
  on: OnEvent<this>;
  once: OnEvent<this>;
  removeListener: OnEvent<this>;

  functions: {
    initialized(overrides?: CallOverrides): Promise<[boolean]>;

    "initialized()"(overrides?: CallOverrides): Promise<[boolean]>;

    nftAddress(overrides?: CallOverrides): Promise<[string]>;

    "nftAddress()"(overrides?: CallOverrides): Promise<[string]>;

    nftPrice(overrides?: CallOverrides): Promise<[BigNumber]>;

    "nftPrice()"(overrides?: CallOverrides): Promise<[BigNumber]>;

    /**
     * Returns the address of the current owner.
     */
    owner(overrides?: CallOverrides): Promise<[string]>;

    /**
     * Returns the address of the current owner.
     */
    "owner()"(overrides?: CallOverrides): Promise<[string]>;

    /**
     * Leaves the contract without owner. It will not be possible to call `onlyOwner` functions anymore. Can only be called by the current owner. NOTE: Renouncing ownership will leave the contract without an owner, thereby removing any functionality that is only available to the owner.
     */
    renounceOwnership(
      overrides?: Overrides & { from?: string }
    ): Promise<ContractTransaction>;

    /**
     * Leaves the contract without owner. It will not be possible to call `onlyOwner` functions anymore. Can only be called by the current owner. NOTE: Renouncing ownership will leave the contract without an owner, thereby removing any functionality that is only available to the owner.
     */
    "renounceOwnership()"(
      overrides?: Overrides & { from?: string }
    ): Promise<ContractTransaction>;

    /**
     * Transfers ownership of the contract to a new account (`newOwner`). Can only be called by the current owner.
     */
    transferOwnership(
      newOwner: string,
      overrides?: Overrides & { from?: string }
    ): Promise<ContractTransaction>;

    /**
     * Transfers ownership of the contract to a new account (`newOwner`). Can only be called by the current owner.
     */
    "transferOwnership(address)"(
      newOwner: string,
      overrides?: Overrides & { from?: string }
    ): Promise<ContractTransaction>;

    typeMapper(overrides?: CallOverrides): Promise<[string]>;

    "typeMapper()"(overrides?: CallOverrides): Promise<[string]>;

    initialize(
      owner: string,
      _nft: string,
      _price: BigNumberish,
      overrides?: Overrides & { from?: string }
    ): Promise<ContractTransaction>;

    "initialize(address,address,uint256)"(
      owner: string,
      _nft: string,
      _price: BigNumberish,
      overrides?: Overrides & { from?: string }
    ): Promise<ContractTransaction>;

    buyNft(
      receiverAddress: string,
      nftType: BigNumberish,
      overrides?: PayableOverrides & { from?: string }
    ): Promise<ContractTransaction>;

    "buyNft(address,uint8)"(
      receiverAddress: string,
      nftType: BigNumberish,
      overrides?: PayableOverrides & { from?: string }
    ): Promise<ContractTransaction>;

    updatePrice(
      _nftPrice: BigNumberish,
      overrides?: Overrides & { from?: string }
    ): Promise<ContractTransaction>;

    "updatePrice(uint256)"(
      _nftPrice: BigNumberish,
      overrides?: Overrides & { from?: string }
    ): Promise<ContractTransaction>;

    withdraw(
      _account: string,
      overrides?: Overrides & { from?: string }
    ): Promise<ContractTransaction>;

    "withdraw(address)"(
      _account: string,
      overrides?: Overrides & { from?: string }
    ): Promise<ContractTransaction>;

    upgradeContract(
      _newContract: string,
      overrides?: Overrides & { from?: string }
    ): Promise<ContractTransaction>;

    "upgradeContract(address)"(
      _newContract: string,
      overrides?: Overrides & { from?: string }
    ): Promise<ContractTransaction>;
  };

  initialized(overrides?: CallOverrides): Promise<boolean>;

  "initialized()"(overrides?: CallOverrides): Promise<boolean>;

  nftAddress(overrides?: CallOverrides): Promise<string>;

  "nftAddress()"(overrides?: CallOverrides): Promise<string>;

  nftPrice(overrides?: CallOverrides): Promise<BigNumber>;

  "nftPrice()"(overrides?: CallOverrides): Promise<BigNumber>;

  /**
   * Returns the address of the current owner.
   */
  owner(overrides?: CallOverrides): Promise<string>;

  /**
   * Returns the address of the current owner.
   */
  "owner()"(overrides?: CallOverrides): Promise<string>;

  /**
   * Leaves the contract without owner. It will not be possible to call `onlyOwner` functions anymore. Can only be called by the current owner. NOTE: Renouncing ownership will leave the contract without an owner, thereby removing any functionality that is only available to the owner.
   */
  renounceOwnership(
    overrides?: Overrides & { from?: string }
  ): Promise<ContractTransaction>;

  /**
   * Leaves the contract without owner. It will not be possible to call `onlyOwner` functions anymore. Can only be called by the current owner. NOTE: Renouncing ownership will leave the contract without an owner, thereby removing any functionality that is only available to the owner.
   */
  "renounceOwnership()"(
    overrides?: Overrides & { from?: string }
  ): Promise<ContractTransaction>;

  /**
   * Transfers ownership of the contract to a new account (`newOwner`). Can only be called by the current owner.
   */
  transferOwnership(
    newOwner: string,
    overrides?: Overrides & { from?: string }
  ): Promise<ContractTransaction>;

  /**
   * Transfers ownership of the contract to a new account (`newOwner`). Can only be called by the current owner.
   */
  "transferOwnership(address)"(
    newOwner: string,
    overrides?: Overrides & { from?: string }
  ): Promise<ContractTransaction>;

  typeMapper(overrides?: CallOverrides): Promise<string>;

  "typeMapper()"(overrides?: CallOverrides): Promise<string>;

  initialize(
    owner: string,
    _nft: string,
    _price: BigNumberish,
    overrides?: Overrides & { from?: string }
  ): Promise<ContractTransaction>;

  "initialize(address,address,uint256)"(
    owner: string,
    _nft: string,
    _price: BigNumberish,
    overrides?: Overrides & { from?: string }
  ): Promise<ContractTransaction>;

  buyNft(
    receiverAddress: string,
    nftType: BigNumberish,
    overrides?: PayableOverrides & { from?: string }
  ): Promise<ContractTransaction>;

  "buyNft(address,uint8)"(
    receiverAddress: string,
    nftType: BigNumberish,
    overrides?: PayableOverrides & { from?: string }
  ): Promise<ContractTransaction>;

  updatePrice(
    _nftPrice: BigNumberish,
    overrides?: Overrides & { from?: string }
  ): Promise<ContractTransaction>;

  "updatePrice(uint256)"(
    _nftPrice: BigNumberish,
    overrides?: Overrides & { from?: string }
  ): Promise<ContractTransaction>;

  withdraw(
    _account: string,
    overrides?: Overrides & { from?: string }
  ): Promise<ContractTransaction>;

  "withdraw(address)"(
    _account: string,
    overrides?: Overrides & { from?: string }
  ): Promise<ContractTransaction>;

  upgradeContract(
    _newContract: string,
    overrides?: Overrides & { from?: string }
  ): Promise<ContractTransaction>;

  "upgradeContract(address)"(
    _newContract: string,
    overrides?: Overrides & { from?: string }
  ): Promise<ContractTransaction>;

  callStatic: {
    initialized(overrides?: CallOverrides): Promise<boolean>;

    "initialized()"(overrides?: CallOverrides): Promise<boolean>;

    nftAddress(overrides?: CallOverrides): Promise<string>;

    "nftAddress()"(overrides?: CallOverrides): Promise<string>;

    nftPrice(overrides?: CallOverrides): Promise<BigNumber>;

    "nftPrice()"(overrides?: CallOverrides): Promise<BigNumber>;

    /**
     * Returns the address of the current owner.
     */
    owner(overrides?: CallOverrides): Promise<string>;

    /**
     * Returns the address of the current owner.
     */
    "owner()"(overrides?: CallOverrides): Promise<string>;

    /**
     * Leaves the contract without owner. It will not be possible to call `onlyOwner` functions anymore. Can only be called by the current owner. NOTE: Renouncing ownership will leave the contract without an owner, thereby removing any functionality that is only available to the owner.
     */
    renounceOwnership(overrides?: CallOverrides): Promise<void>;

    /**
     * Leaves the contract without owner. It will not be possible to call `onlyOwner` functions anymore. Can only be called by the current owner. NOTE: Renouncing ownership will leave the contract without an owner, thereby removing any functionality that is only available to the owner.
     */
    "renounceOwnership()"(overrides?: CallOverrides): Promise<void>;

    /**
     * Transfers ownership of the contract to a new account (`newOwner`). Can only be called by the current owner.
     */
    transferOwnership(
      newOwner: string,
      overrides?: CallOverrides
    ): Promise<void>;

    /**
     * Transfers ownership of the contract to a new account (`newOwner`). Can only be called by the current owner.
     */
    "transferOwnership(address)"(
      newOwner: string,
      overrides?: CallOverrides
    ): Promise<void>;

    typeMapper(overrides?: CallOverrides): Promise<string>;

    "typeMapper()"(overrides?: CallOverrides): Promise<string>;

    initialize(
      owner: string,
      _nft: string,
      _price: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    "initialize(address,address,uint256)"(
      owner: string,
      _nft: string,
      _price: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    buyNft(
      receiverAddress: string,
      nftType: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    "buyNft(address,uint8)"(
      receiverAddress: string,
      nftType: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    updatePrice(
      _nftPrice: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    "updatePrice(uint256)"(
      _nftPrice: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    withdraw(_account: string, overrides?: CallOverrides): Promise<void>;

    "withdraw(address)"(
      _account: string,
      overrides?: CallOverrides
    ): Promise<void>;

    upgradeContract(
      _newContract: string,
      overrides?: CallOverrides
    ): Promise<void>;

    "upgradeContract(address)"(
      _newContract: string,
      overrides?: CallOverrides
    ): Promise<void>;
  };

  filters: {
    "BuyNFT(uint256,uint256,address,address)"(
      tokenId?: BigNumberish | null,
      PRICE?: BigNumberish | null,
      receiver?: string | null,
      buyer?: null
    ): BuyNFTEventFilter;
    BuyNFT(
      tokenId?: BigNumberish | null,
      PRICE?: BigNumberish | null,
      receiver?: string | null,
      buyer?: null
    ): BuyNFTEventFilter;

    "Initialized(address,address)"(
      owner?: string | null,
      nft?: string | null
    ): InitializedEventFilter;
    Initialized(
      owner?: string | null,
      nft?: string | null
    ): InitializedEventFilter;

    "OwnershipTransferred(address,address)"(
      previousOwner?: string | null,
      newOwner?: string | null
    ): OwnershipTransferredEventFilter;
    OwnershipTransferred(
      previousOwner?: string | null,
      newOwner?: string | null
    ): OwnershipTransferredEventFilter;

    "UpdateNftProxy(address,address)"(
      oldProxy?: string | null,
      newProxy?: string | null
    ): UpdateNftProxyEventFilter;
    UpdateNftProxy(
      oldProxy?: string | null,
      newProxy?: string | null
    ): UpdateNftProxyEventFilter;

    "UpdatePrice(uint256,uint256)"(
      oldPrice?: BigNumberish | null,
      newPrice?: BigNumberish | null
    ): UpdatePriceEventFilter;
    UpdatePrice(
      oldPrice?: BigNumberish | null,
      newPrice?: BigNumberish | null
    ): UpdatePriceEventFilter;
  };

  estimateGas: {
    initialized(overrides?: CallOverrides): Promise<BigNumber>;

    "initialized()"(overrides?: CallOverrides): Promise<BigNumber>;

    nftAddress(overrides?: CallOverrides): Promise<BigNumber>;

    "nftAddress()"(overrides?: CallOverrides): Promise<BigNumber>;

    nftPrice(overrides?: CallOverrides): Promise<BigNumber>;

    "nftPrice()"(overrides?: CallOverrides): Promise<BigNumber>;

    /**
     * Returns the address of the current owner.
     */
    owner(overrides?: CallOverrides): Promise<BigNumber>;

    /**
     * Returns the address of the current owner.
     */
    "owner()"(overrides?: CallOverrides): Promise<BigNumber>;

    /**
     * Leaves the contract without owner. It will not be possible to call `onlyOwner` functions anymore. Can only be called by the current owner. NOTE: Renouncing ownership will leave the contract without an owner, thereby removing any functionality that is only available to the owner.
     */
    renounceOwnership(
      overrides?: Overrides & { from?: string }
    ): Promise<BigNumber>;

    /**
     * Leaves the contract without owner. It will not be possible to call `onlyOwner` functions anymore. Can only be called by the current owner. NOTE: Renouncing ownership will leave the contract without an owner, thereby removing any functionality that is only available to the owner.
     */
    "renounceOwnership()"(
      overrides?: Overrides & { from?: string }
    ): Promise<BigNumber>;

    /**
     * Transfers ownership of the contract to a new account (`newOwner`). Can only be called by the current owner.
     */
    transferOwnership(
      newOwner: string,
      overrides?: Overrides & { from?: string }
    ): Promise<BigNumber>;

    /**
     * Transfers ownership of the contract to a new account (`newOwner`). Can only be called by the current owner.
     */
    "transferOwnership(address)"(
      newOwner: string,
      overrides?: Overrides & { from?: string }
    ): Promise<BigNumber>;

    typeMapper(overrides?: CallOverrides): Promise<BigNumber>;

    "typeMapper()"(overrides?: CallOverrides): Promise<BigNumber>;

    initialize(
      owner: string,
      _nft: string,
      _price: BigNumberish,
      overrides?: Overrides & { from?: string }
    ): Promise<BigNumber>;

    "initialize(address,address,uint256)"(
      owner: string,
      _nft: string,
      _price: BigNumberish,
      overrides?: Overrides & { from?: string }
    ): Promise<BigNumber>;

    buyNft(
      receiverAddress: string,
      nftType: BigNumberish,
      overrides?: PayableOverrides & { from?: string }
    ): Promise<BigNumber>;

    "buyNft(address,uint8)"(
      receiverAddress: string,
      nftType: BigNumberish,
      overrides?: PayableOverrides & { from?: string }
    ): Promise<BigNumber>;

    updatePrice(
      _nftPrice: BigNumberish,
      overrides?: Overrides & { from?: string }
    ): Promise<BigNumber>;

    "updatePrice(uint256)"(
      _nftPrice: BigNumberish,
      overrides?: Overrides & { from?: string }
    ): Promise<BigNumber>;

    withdraw(
      _account: string,
      overrides?: Overrides & { from?: string }
    ): Promise<BigNumber>;

    "withdraw(address)"(
      _account: string,
      overrides?: Overrides & { from?: string }
    ): Promise<BigNumber>;

    upgradeContract(
      _newContract: string,
      overrides?: Overrides & { from?: string }
    ): Promise<BigNumber>;

    "upgradeContract(address)"(
      _newContract: string,
      overrides?: Overrides & { from?: string }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    initialized(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    "initialized()"(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    nftAddress(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    "nftAddress()"(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    nftPrice(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    "nftPrice()"(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    /**
     * Returns the address of the current owner.
     */
    owner(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    /**
     * Returns the address of the current owner.
     */
    "owner()"(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    /**
     * Leaves the contract without owner. It will not be possible to call `onlyOwner` functions anymore. Can only be called by the current owner. NOTE: Renouncing ownership will leave the contract without an owner, thereby removing any functionality that is only available to the owner.
     */
    renounceOwnership(
      overrides?: Overrides & { from?: string }
    ): Promise<PopulatedTransaction>;

    /**
     * Leaves the contract without owner. It will not be possible to call `onlyOwner` functions anymore. Can only be called by the current owner. NOTE: Renouncing ownership will leave the contract without an owner, thereby removing any functionality that is only available to the owner.
     */
    "renounceOwnership()"(
      overrides?: Overrides & { from?: string }
    ): Promise<PopulatedTransaction>;

    /**
     * Transfers ownership of the contract to a new account (`newOwner`). Can only be called by the current owner.
     */
    transferOwnership(
      newOwner: string,
      overrides?: Overrides & { from?: string }
    ): Promise<PopulatedTransaction>;

    /**
     * Transfers ownership of the contract to a new account (`newOwner`). Can only be called by the current owner.
     */
    "transferOwnership(address)"(
      newOwner: string,
      overrides?: Overrides & { from?: string }
    ): Promise<PopulatedTransaction>;

    typeMapper(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    "typeMapper()"(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    initialize(
      owner: string,
      _nft: string,
      _price: BigNumberish,
      overrides?: Overrides & { from?: string }
    ): Promise<PopulatedTransaction>;

    "initialize(address,address,uint256)"(
      owner: string,
      _nft: string,
      _price: BigNumberish,
      overrides?: Overrides & { from?: string }
    ): Promise<PopulatedTransaction>;

    buyNft(
      receiverAddress: string,
      nftType: BigNumberish,
      overrides?: PayableOverrides & { from?: string }
    ): Promise<PopulatedTransaction>;

    "buyNft(address,uint8)"(
      receiverAddress: string,
      nftType: BigNumberish,
      overrides?: PayableOverrides & { from?: string }
    ): Promise<PopulatedTransaction>;

    updatePrice(
      _nftPrice: BigNumberish,
      overrides?: Overrides & { from?: string }
    ): Promise<PopulatedTransaction>;

    "updatePrice(uint256)"(
      _nftPrice: BigNumberish,
      overrides?: Overrides & { from?: string }
    ): Promise<PopulatedTransaction>;

    withdraw(
      _account: string,
      overrides?: Overrides & { from?: string }
    ): Promise<PopulatedTransaction>;

    "withdraw(address)"(
      _account: string,
      overrides?: Overrides & { from?: string }
    ): Promise<PopulatedTransaction>;

    upgradeContract(
      _newContract: string,
      overrides?: Overrides & { from?: string }
    ): Promise<PopulatedTransaction>;

    "upgradeContract(address)"(
      _newContract: string,
      overrides?: Overrides & { from?: string }
    ): Promise<PopulatedTransaction>;
  };
}
