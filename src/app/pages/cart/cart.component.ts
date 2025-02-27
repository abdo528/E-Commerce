import { Icart } from './../../shared/interfaces/icart';
import { CartService } from './../../core/services/cart/cart.service';
import { Component, inject, OnInit } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cart',
  imports: [CurrencyPipe, RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit {
  cartDetails: Icart = {} as Icart
  private readonly cartService = inject(CartService)
  ngOnInit(): void {
    this.getCart()
  }
  getCart(): void {
    this.cartService.getLogedToCart().subscribe({
      next: (res) => {
        this.cartDetails = res.data
      }
    })
  }
  removeItem(id: string): void {
    this.cartService.removeSpecificCart(id).subscribe({
      next: (res) => {
        this.cartDetails = res.data
      }
    })
  }
  quantity(id: string, current: number): void {
    this.cartService.updateSpecificCart(id, current).subscribe({
      next: (res) => {
        this.cartDetails = res.data
      }
    })
  }
  clearItems(): void {
    this.cartService.clearUserCart().subscribe({
      next: (res) => {
        this.cartDetails = {} as Icart
        this.cartService.cartItemCount.next(res.numOfCartItems)
      }
    })
  }
}
