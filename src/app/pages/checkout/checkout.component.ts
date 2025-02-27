import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { OrdersService } from '../../core/services/orders/orders.service';
import { CartService } from '../../core/services/cart/cart.service';

@Component({
  selector: 'app-checkout',
  imports: [ReactiveFormsModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss'
})
export class CheckoutComponent implements OnInit {
  cartId: string = ''
  private readonly formBuilder = inject(FormBuilder)
  private readonly activatedRouter = inject(ActivatedRoute)
  private readonly ordersService = inject(OrdersService)
  private readonly cartService = inject(CartService)
  private readonly router = inject(Router)
  checkOutForm!: FormGroup
  ngOnInit(): void {
    this.formInit()
    this.getCartId()
  }
  formInit(): void {
    this.checkOutForm = this.formBuilder.group({
      deatils: [null, [Validators.required]],
      phone: [null, [Validators.required, Validators.pattern(`01[0125][0-9]{8}`)]],
      city: [null, [Validators.required]],
    })
  }
  getCartId(): void {
    this.activatedRouter.paramMap.subscribe({
      next: (param) => {
        this.cartId = param.get('id')!
      }
    })
  }
  onlinePay(): void {
    this.ordersService.checkoutSession(this.cartId, this.checkOutForm.value).subscribe({
      next: (res) => {
        if (res.status === 'success') {
          open(res.session.url, '_self')
          open(res.success_url, '_self')
        }
      }
    })
  }
  cachPay(): void {
    this.ordersService.cashOrder(this.cartId, this.checkOutForm.value).subscribe({
      next: (res) => {
        if (res.status === 'success') {
          this.router.navigate(['/allorders'])
          this.cartService.cartItemCount.next(res.numOfCartItems)
        }
      }
    })
  }
}