import { Injectable } from '@angular/core';
import Web3 from 'web3';
import Web3Modal from 'web3modal';
import WalletConnectProvider from '@walletconnect/web3-provider';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class ContractService {
  private connected = false;

  private web3js: any;
  private provider: any;
  private accounts: any;
  web3Modal;

  constructor(private httpClient: HttpClient) {
    const providerOptions = {
      walletconnect: {
        package: WalletConnectProvider, // required
        options: {
          infuraId: '2ca1b4ad410e41e786a5e0deac222ed3', // required
        },
      },
    };

    this.web3Modal = new Web3Modal({
      network: 'rinkeby', // optional
      cacheProvider: true, // optional
      providerOptions, // required
      // theme: {
      //   background: 'rgb(39, 49, 56)',
      //   main: 'rgb(199, 199, 199)',
      //   secondary: 'rgb(136, 136, 136)',
      //   border: 'rgba(195, 195, 195, 0.14)',
      //   hover: 'rgb(16, 26, 32)',
      // },
    });
  }
  isConnected() {
    return this.connected;
  }
  async connectAccount() {
    this.web3Modal.clearCachedProvider();
    this.provider = await this.web3Modal.connect(); // set provider
    this.web3js = new Web3(this.provider); // create web3 instance
    this.accounts = await this.web3js.eth.getAccounts();

    this.connected = true;

    // console.log(this.accounts);
    // console.log(await this.getAllMetaData());
    return this.provider;
  }

  async disconnect() {
    this.web3Modal.clearCachedProvider();
    this.connected = false;
  }
  getAccount(): string {
    return this.accounts[0];
  }
  getProvider(): any {
    return this.provider;
  }

  async saveWallet(address: String) {
    return this.httpClient.get<any>(
      'http://localhost:3000/' + address + '/register'
    );
  }
  async getData(address: String) {
    return this.httpClient.get<any>(
      'http://localhost:3000/' + address + '/balances'
    );
  }
}
