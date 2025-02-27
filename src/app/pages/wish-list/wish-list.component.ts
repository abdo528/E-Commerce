import { WishListService } from './../../core/services/wishList/wish-list.service';
import { Component, inject, OnInit, Renderer2 } from '@angular/core';
import { Iwish } from '../../shared/interfaces/iwish';
import { CurrencyPipe } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { CartService } from '../../core/services/cart/cart.service';

@Component({
  selector: 'app-wish-list',
  imports: [CurrencyPipe],
  templateUrl: './wish-list.component.html',
  styleUrl: './wish-list.component.scss'
})
export class WishListComponent implements OnInit {
  showWish: Iwish[] = [] as Iwish[]
  private readonly wishListService = inject(WishListService)
  private readonly cartService = inject(CartService)
  private readonly toastrService = inject(ToastrService)
  private readonly renderer2 = inject(Renderer2)
  ngOnInit(): void {
    this.getWishList()
  }
  getWishList(): void {
    this.wishListService.getLoggedUserToWishList().subscribe({
      next: res => {
        if (res.status == 'success') {
          this.showWish = res.data
        }
      }
    })
  }
  removeWishList(id: string): void {
    this.wishListService.removeProductFromWishList(id).subscribe({
      next: res => {
        if (res.status == 'success') {
          this.toastrService.success(res.message, 'Fresh Cart')
          this.getWishList()
        }
      }
    })
  }
  addToCart(id: string, e: Event): void {
    this.cartService.addProductToCart(id).subscribe({
      next: (res) => {
        if (res.status === 'success') {
          this.toastrService.success(res.message, 'Fresh Cart')
          this.cartService.cartItemCount.next(res.numOfCartItems)
          this.renderer2.addClass(e.target, 'text-green-600')
          this.renderer2.addClass(e.target, 'text-green-600')
        }
      }
    })
  }
}
