import { Component, OnInit } from '@angular/core';
import { MenuItems } from './menu-items';
import { ContractService } from '../contract.service';
import { TableComponent } from '../table/table.component';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
})
export class NavBarComponent implements OnInit {
  menu = MenuItems;

  nav_menu: string = 'nav-menu';
  nav_icon: string = 'menu';

  constructor(private contractService: ContractService) {}

  ngOnInit(): void {}

  async connect(): Promise<void> {
    if (!this.contractService.isConnected()) {
      await this.contractService.connectAccount();
      await this.contractService.saveWallet(this.contractService.getAccount());
    }
  }

  disconnect(): void {
    if (this.contractService.isConnected()) this.contractService.disconnect();
  }
  handleclick(): void {
    this.nav_menu =
      this.nav_menu == 'nav-menu active' ? 'nav-menu' : 'nav-menu active';
    this.nav_icon = this.nav_icon == 'menu' ? 'close' : 'menu';
  }
  getAccount() {
    return this.contractService.getAccount();
  }
  //check if connected
  isConnected(): boolean {
    return this.contractService.isConnected();
  }
}
