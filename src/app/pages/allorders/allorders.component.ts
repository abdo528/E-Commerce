import { Component, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { OrdersService } from '../../core/services/orders/orders.service';
import { Iorder } from '../../shared/interfaces/iorder';
import { CurrencyPipe, DatePipe, isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-allorders',
  imports: [CurrencyPipe, DatePipe],
  templateUrl: './allorders.component.html',
  styleUrl: './allorders.component.scss'
})
export class AllordersComponent implements OnInit {
  showOrder: Iorder[] = [] as Iorder[]
  private readonly id = inject(PLATFORM_ID)
  private readonly ordersService = inject(OrdersService)
  ngOnInit(): void {
    this.userOrder()
  }
  userOrder(): void {
    if (isPlatformBrowser(this.id)) {
      const idUser = localStorage.getItem('userId') as string
      this.ordersService.getUserOrders(idUser).subscribe({
        next: res => this.showOrder = res
      })
    }
  }
}