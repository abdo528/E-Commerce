import { Routes } from '@angular/router';
import { NotfoundComponent } from './pages/notfound/notfound.component';
import { MainComponent } from './layouts/main/main.component';
import { AuthComponent } from './layouts/auth/auth.component';
import { authGuard } from './core/guards/auth/auth.guard';
import { logedGuard } from './core/guards/loged/loged.guard';

export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    {
        path: '', component: AuthComponent, canActivate: [logedGuard], children: [
            { path: 'login', loadComponent: () => import('./pages/login/login.component').then((c) => c.LoginComponent), title: 'login' },
            { path: 'forget', loadComponent: () => import('./pages/forget/forget.component').then((c) => c.ForgetComponent), title: 'forget' },
            { path: 'register', loadComponent: () => import('./pages/register/register.component').then((c) => c.RegisterComponent), title: 'register' },
        ]
    },
    {
        path: '', component: MainComponent, canActivate: [authGuard], children: [
            { path: 'home', loadComponent: () => import('./pages/home/home.component').then((c) => c.HomeComponent), title: 'home' },
            { path: 'cart', loadComponent: () => import('./pages/cart/cart.component').then((c) => c.CartComponent), title: 'cart' },
            { path: 'allorders', loadComponent: () => import('./pages/allorders/allorders.component').then((c) => c.AllordersComponent), title: 'allorders' },
            { path: 'wishList', loadComponent: () => import('./pages/wish-list//wish-list.component').then((c) => c.WishListComponent), title: 'WishList' },
            { path: 'categories', loadComponent: () => import('./pages/categories/categories.component').then((c) => c.CategoriesComponent), title: 'categories' },
            { path: 'brands', loadComponent: () => import('./pages/brands/brands.component').then((c) => c.BrandsComponent), title: 'brands' },
            { path: 'details/:id', loadComponent: () => import('./pages/details/details.component').then((c) => c.DetailsComponent), title: 'detailss' },
            { path: 'checkout/:id', loadComponent: () => import('./pages/checkout/checkout.component').then((c) => c.CheckoutComponent), title: 'checkout' },
        ]
    }, { path: '**', component: NotfoundComponent, title: 'not found' }
];
