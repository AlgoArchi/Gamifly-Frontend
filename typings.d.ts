/// <reference types="next-images" />

type KeysMatching<T, V> = {
  [K in keyof T]-?: T[K] extends V ? K : never;
}[keyof T];

declare interface Window {
  gamiflyConfig: any;
  ethereum: any;
  web3: any;
  createjs: any;
  imgUrl: any;
  walletConnectProvider: any;
}
