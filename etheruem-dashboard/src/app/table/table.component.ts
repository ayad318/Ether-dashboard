import { Component, OnInit } from '@angular/core';
import { Token, TOKENS } from './Token';
import { HttpClient } from '@angular/common/http';
import { ContractService } from '../contract.service';
@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
})
export class TableComponent implements OnInit {
  tokens: Token[] = TOKENS;
  user_address = '';
  efl_balance: number = -1;

  constructor(
    private httpClient: HttpClient,
    private service: ContractService
  ) {
    this.loadWallet();
  }

  isConnected() {
    return this.service.isConnected();
  }

  async loadWallet() {
    this.tokens = TOKENS;
    try {
      const provider = await this.service.connectAccount();
      const accounts = await provider.request({ method: 'eth_accounts' });
      this.user_address = accounts[0];

      // read data from API

      (await this.service.saveWallet(this.user_address)).subscribe(
        (res) => (this.efl_balance = res.EFL_balance)
      );

      (await this.service.getData(this.user_address)).subscribe(
        (res) => (this.tokens[0].balance = res.ETH_balance)
      );

      (await this.service.getData(this.user_address)).subscribe(
        (res) => (this.tokens[1].balance = res.LINK_balance)
      );
      (await this.service.getData(this.user_address)).subscribe(
        (res) => (this.tokens[2].balance = res.USDT_balance)
      );

      //get link price from api
      this.httpClient
        .get<any>('https://api.pro.coinbase.com/products/LINK-USD/ticker')
        .subscribe((response) => (this.tokens[1].price = response.price));

      //get usdt price from api
      this.httpClient
        .get<any>('https://api.pro.coinbase.com/products/USDT-USD/ticker')
        .subscribe((response) => (this.tokens[2].price = response.price));

      //get etheruem price from api
      this.httpClient
        .get<any>('https://api.pro.coinbase.com/products/ETH-USD/ticker')
        .subscribe((response) => (this.tokens[0].price = response.price));
    } catch (e) {
      console.log(e);
    }
  }

  ngOnInit(): void {
    this.loadWallet();
  }
}
