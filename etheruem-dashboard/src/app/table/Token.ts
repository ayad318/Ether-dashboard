export interface Token {
  address: string;
  name: string;
  src_img: string;
  balance: number;
  price: number;
}

export const TOKENS: Token[] = [
  {
    address: '',
    name: 'ETH',
    src_img: 'https://s2.coinmarketcap.com/static/img/coins/64x64/1027.png',
    balance: 0,
    price: 0,
  },
  {
    address: '0x01BE23585060835E02B77ef475b0Cc51aA1e0709',
    name: 'LINK',
    src_img: 'https://s2.coinmarketcap.com/static/img/coins/64x64/1975.png',
    balance: 0,
    price: 0,
  },
  {
    address: '0x3b00ef435fa4fcff5c209a37d1f3dcff37c705ad',
    name: 'USDT',
    src_img: 'https://s2.coinmarketcap.com/static/img/coins/64x64/825.png',
    balance: 0,
    price: 0,
  },
];
