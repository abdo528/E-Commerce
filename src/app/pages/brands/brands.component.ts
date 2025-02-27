import { Component, inject, OnInit } from '@angular/core';
import { BrandService } from '../../core/services/brand/brand.service';
import { Ibrand } from '../../shared/interfaces/ibrand';

@Component({
  selector: 'app-brands',
  imports: [],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.scss'
})
export class BrandsComponent implements OnInit {
  showBrand: Ibrand[] = [] as Ibrand[]
  private readonly brandService = inject(BrandService)
  ngOnInit(): void {
    this.getAllBrand()
  }
  getAllBrand(): void {
    this.brandService.getAllBrands().subscribe({
      next: res => this.showBrand = res.data
    })
  }
}
