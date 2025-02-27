import { Component, inject, OnInit, Renderer2 } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../core/services/products/products.service';
import { Iproducts } from '../../shared/interfaces/iproducts';
import { CurrencyPipe } from '@angular/common';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { CartService } from '../../core/services/cart/cart.service';
import { ToastrService } from 'ngx-toastr';
import { WishListService } from '../../core/services/wishList/wish-list.service';

@Component({
  selector: 'app-details',
  imports: [CurrencyPipe, CarouselModule],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})
export class DetailsComponent implements OnInit {
  idProduct!: string
  details: Iproducts = {} as Iproducts
  private readonly _ActivatedRoute = inject(ActivatedRoute)
  private readonly _ProductsService = inject(ProductsService)
  private readonly cartService = inject(CartService)
  private readonly wishListService = inject(WishListService)
  private readonly toastrService = inject(ToastrService)
  private readonly renderer2 = inject(Renderer2)
  ngOnInit(): void {
    this.getId()
    this.getDetails()
  }
  getId(): void {
    this._ActivatedRoute.paramMap.subscribe({
      next: (par) => {
        this.idProduct = par.get('id')!
      }
    })
  }
  getDetails(): void {
    this._ProductsService.getSpecificProducts(this.idProduct).subscribe({
      next: (res) => {
        this.details = res.data
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
  addWishList(id: string, e: Event): void {
    this.wishListService.addProductToWishList(id).subscribe({
      next: res => {
        if (res.status == 'success') {
          this.toastrService.success(res.message, 'Fresh Cart')
          this.renderer2.addClass(e.target, 'text-red-600')
          this.renderer2.addClass(e.target, 'text-red-600')
        }
      }
    })
  }
  customSlider: OwlOptions = {
    autoplay: true,
    autoplaySpeed: 2000,
    autoplayHoverPause: true,
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      200: {
        items: 3
      },
      400: {
        items: 7
      }
    },
    nav: false
  }
}
