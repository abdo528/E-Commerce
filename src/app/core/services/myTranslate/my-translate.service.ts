import { isPlatformBrowser } from '@angular/common';
import { inject, Inject, Injectable, PLATFORM_ID, RendererFactory2 } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class MyTranslateService {
  private readonly render2 = inject(RendererFactory2).createRenderer(null, null)
  constructor(private _TranslateService: TranslateService, @Inject(PLATFORM_ID) private id: object) {
    if (isPlatformBrowser(this.id)) {
      this._TranslateService.setDefaultLang('EN')
      const savedLang = localStorage.getItem('language')
      if (savedLang) {
        this._TranslateService.use(savedLang!)
      }
    }
    this.changeDirection()
  }
  changeDirection(): void {
    if (localStorage.getItem('language') === 'EN') {
      this.render2.setAttribute(document.documentElement, 'dir', 'ltr')
      this.render2.setAttribute(document.documentElement, 'language', 'EN')
    } else if (localStorage.getItem('language') === 'AR') {
      this.render2.setAttribute(document.documentElement, 'language', 'AR')
      this.render2.setAttribute(document.documentElement, 'dir', 'rtl')
    }
  }
  changeLangTranslate(lang: string): void {
    localStorage.setItem('language', lang)
    this._TranslateService.use(lang)
    this.changeDirection()
  }
}
