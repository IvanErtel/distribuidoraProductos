import { Routes } from '@angular/router';
import { ProductosComponent } from './components/productos/productos.component';
import { HomeComponent } from './pages/home/home.component';

export const routes: Routes = [
    {
        path: 'home', 
        component: HomeComponent
    },
    {
        path: 'productos', 
        loadChildren: () => import('./components/productos/productos.module').then(m => m.ProductosModule)
    },
    { path: '', component: ProductosComponent },
    {
        path: '', 
        redirectTo: '/home',
        pathMatch: 'full'
    },
    {
        path: '**', 
        redirectTo: '/home'
    },
];
