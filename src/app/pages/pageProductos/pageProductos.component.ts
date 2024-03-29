import { Component } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { CategoriasComponent } from '../../components/categorias/categorias.component';
import { ContactoComponent } from '../../components/contacto/contacto.component';
import { FooterComponent } from '../../components/footer/footer.component';

@Component({
    selector: 'app-productos',
    standalone: true,
    templateUrl: './pageProductos.component.html',
    styleUrl: './pageProductos.component.scss',
    imports: [ProductosComponent,
        NavbarComponent,
        CategoriasComponent,
        ContactoComponent,
        FooterComponent,]
})
export class ProductosComponent {

}
