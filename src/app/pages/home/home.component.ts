import { CartService } from './../../core/services/cart/cart.service';
import { SearchPipe } from './../../shared/pipes/search/search.pipe';
import { CategoriesService } from '../../core/services/categories/categories.service';
import { Iproducts } from '../../shared/interfaces/iproducts';
import { ProductsService } from '../../core/services/products/products.service';
import { Component, inject, OnInit, Renderer2 } from '@angular/core';
import { Icategories } from '../../shared/interfaces/icategories';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { CurrencyPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { WishListService } from '../../core/services/wishList/wish-list.service';
import { stringify } from 'querystring';

@Component({
  selector: 'app-home',
  imports: [FormsModule, RouterLink, CarouselModule, CurrencyPipe, SearchPipe,],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  searchValue: string = ''
  private readonly productsService = inject(ProductsService)
  private readonly categoriesService = inject(CategoriesService)
  private readonly cartService = inject(CartService)
  private readonly wishListService = inject(WishListService)
  private readonly toastrService = inject(ToastrService)
  private readonly renderer2 = inject(Renderer2)
  showProducts: Iproducts[] = [] as Iproducts[]
  showCategories: Icategories[] = [] as Icategories[]
  ngOnInit(): void {
    this.allProducts()
    this.allCategories()
  }
  allProducts(): void {
    this.productsService.getAllProducts().subscribe({
      next: (res) => {
        this.showProducts = res.data
      }
    })
  }
  allCategories(): void {
    this.categoriesService.getAllCategories().subscribe({
      next: (res) => {
        this.showCategories = res.data
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
  addWishList(id: string, event: Event): void {
    this.wishListService.addProductToWishList(id).subscribe({
      next: res => {
        console.log(res);
        if (res.status == 'success') {
          this.toastrService.success(res.message, 'Fresh Cart')
          const e = event.target as HTMLElement
          this.renderer2.addClass(e, 'text-red-600')
        }
      }
    })
  }
  customMainSlider: OwlOptions = {
    rtl: true,
    autoplay: true,
    autoplaySpeed: 2000,
    autoplayHoverPause: true,
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 1
      },
      740: {
        items: 1
      },
      940: {
        items: 1
      }
    },
  }
  customSlider: OwlOptions = {
    rtl: true,
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
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 4
      }
    },
    nav: false
  }
}
