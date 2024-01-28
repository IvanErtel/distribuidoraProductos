import { Routes } from '@angular/router';
import { ProductosComponent } from './components/productos/productos.component';
import { HomeComponent } from './pages/home/home.component';

export const routes: Routes = [
    {
        path: '', 
        component: HomeComponent
    },
    {
        path: 'productos', 
        component: ProductosComponent
    },
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
