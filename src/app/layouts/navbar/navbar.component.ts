import { Component, inject, input, InputSignal, Renderer2 } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../core/services/auth/auth.service';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { MyTranslateService } from '../../core/services/myTranslate/my-translate.service';
import { CartService } from '../../core/services/cart/cart.service';
import { AsyncPipe } from '@angular/common';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { ReactiveFormsModule } from '@angular/forms';
import { WishListService } from '../../core/services/wishList/wish-list.service';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive, TranslatePipe, AsyncPipe, SweetAlert2Module, ReactiveFormsModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  darkMode = false;
  shapeMode = false;
  isLogin: InputSignal<boolean | undefined> = input<boolean>()
  private readonly myTranslateService = inject(MyTranslateService)
  readonly cartService = inject(CartService)
  readonly wishListService = inject(WishListService)
  private readonly translateService = inject(TranslateService)
  private readonly renderer = inject(Renderer2)
  readonly authService = inject(AuthService)
  ngOnInit() {
    this.getWishList()
    this.darkMode = localStorage.getItem('darkMode') === 'true';
    this.applyTheme()
    this.cartCount()

  }
  getWishList(): void {
    this.wishListService.getLoggedUserToWishList().subscribe({
      next:
        res => {
          if (res.status == 'success') {
            //  res.count 
            //  res.data
          }
        }
    })
  }
  cartCount(): void {
    this.cartService.getLogedToCart().subscribe({
      next: res => {
        this.cartService.cartItemCount.next(res.numOfCartItems)
      }
    })
  }
  change(lang: string): void {
    this.myTranslateService.changeLangTranslate(lang)
  }
  currentLang(lang: string): boolean {
    return this.translateService.currentLang === lang
  }
  toggleDarkMode() {
    this.darkMode = !this.darkMode;
    localStorage.setItem('darkMode', this.darkMode.toString());
    this.applyTheme();
  }
  applyTheme() {
    if (this.darkMode) {
      this.renderer.addClass(document.body, 'dark');
    } else {
      this.renderer.removeClass(document.body, 'dark');
    }
  }

}
