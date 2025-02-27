import { Component, inject, OnInit } from '@angular/core';
import { CategoriesService } from '../../core/services/categories/categories.service';
import { Icategories } from '../../shared/interfaces/icategories';
import { SubCategoriesService } from '../../core/services/subCategories/sub-categories.service';
import { IsubCategorie } from '../../shared/interfaces/isub-categorie';

@Component({
  selector: 'app-categories',
  imports: [],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
export class CategoriesComponent implements OnInit {
  common: any
  showCaegories: Icategories[] = [] as Icategories[]
  showSubCaegories: IsubCategorie[] = [] as IsubCategorie[]
  private readonly categoriesService = inject(CategoriesService)
  private readonly subCategoriesService = inject(SubCategoriesService)
  ngOnInit(): void {
    this.getAllCategories()
  }
  getAllCategories(): void {
    this.categoriesService.getAllCategories().subscribe({
      next: res => this.showCaegories = res.data
    })
  }
  getSubCategories(id: string): void {
    this.subCategoriesService.getAllSubCategoriesOnCategories(id).subscribe({
      next: res => this.showSubCaegories = res.data
    })
  }
}

