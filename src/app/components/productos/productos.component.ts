import { Component, OnInit } from '@angular/core';
import productosData from '../../../data/productos.json';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';
import { CategoriasComponent } from '../categorias/categorias.component';
import { ContactoComponent } from '../contacto/contacto.component';
import { FooterComponent } from '../footer/footer.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-productos',
  standalone: true,
  imports: [RouterOutlet,
    NavbarComponent,
    CategoriasComponent,
    ContactoComponent,
    FooterComponent,
    CommonModule
  ],
  templateUrl: './productos.component.html',
  styleUrl: './productos.component.scss'
})
export class ProductosComponent implements OnInit {
  descuento: number = 0;
  productos: any[] = [];
  productosFiltrados: any[] = [];

  constructor(private route: ActivatedRoute){}

  ngOnInit(): void {
    // mapeamos productos 
    this.productos = productosData.map(producto => ({
      ...producto,
      precio: producto.precio.replace(/\./g, '').replace(',', '.'),
      descuento : Math.floor(Math.random() * (40 - 5 + 1)) + 5
    }));
    this.route.queryParams.subscribe(params => {
      const termino = params['busqueda'];
      if (termino) {
        this.filtrarProductos(termino);
      } else {
        // Manejar el caso en que no hay término de búsqueda
        this.productosFiltrados = this.productos;
      }
    });
  }
  filtrarProductos(termino: string): void {
    this.productosFiltrados = this.productos.filter(producto =>
      (producto.descripcion && producto.descripcion.toLowerCase().includes(termino.toLowerCase())) ||
      (producto.categoria && producto.categoria.toLowerCase().includes(termino.toLowerCase()))
    );
  }
}
