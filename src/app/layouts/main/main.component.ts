import { Component, HostListener } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from "../navbar/navbar.component";
import { FooterComponent } from "../footer/footer.component";

@Component({
  selector: 'app-main',
  imports: [RouterOutlet, NavbarComponent, FooterComponent],
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent {
  showBtn: boolean = false
  constructor() { }
  scrollTop(): void {
    scrollTo(0, 0)
  }
  @HostListener('window:scroll')
  topScroll(): void {
    if (document.documentElement.scrollTop > 500) {
      this.showBtn = true
    } else {
      this.showBtn = false
    }
  }
}
