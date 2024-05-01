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
  templateUrl: './productos.component.html',
  styleUrl: './productos.component.scss',
  imports: [RouterOutlet,
    NavbarComponent,
    CategoriasComponent,
    ContactoComponent,
    FooterComponent,
    CommonModule,
    ]
})
export class ProductosComponent implements OnInit {
  descuento: number = 0;
  productos: any[] = [];
  productosFiltrados: any[] = [];
  categorias: string[] = ['Bebidas', 'Almacen', 'Cigarrillos', 'Enlatados', 'Gaseosas', 'Importados'];
  categoriaSeleccionada: string = '';
  
  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    // mapeamos productos 
    this.productos = productosData.map(producto => ({
      ...producto,
      precio: producto.precio.replace(/\./g, '').replace(',', '.'),
      descuento: Math.floor(Math.random() * (40 - 5 + 1)) + 5
    }));
    this.route.queryParams.subscribe(params => {
      const termino = params['busqueda'];
      if (termino) {
        this.filtrarProductos(termino);
      } else {
        this.productosFiltrados = this.productos;
      }
    });
  }

  filtrarProductos(termino: string): void {
    this.productosFiltrados = this.productos.filter(producto => {
      // Verificar si la descripción contiene el término de búsqueda
      const descripcionMatch = producto.descripcion.toLowerCase().includes(termino.toLowerCase());
  
      // Verificar si alguna de las categorías contiene el término de búsqueda
      let categoriaMatch = false;
      if (Array.isArray(producto.categoria)) {
        // Si 'categoria' es un array, verifica cada elemento del array
        categoriaMatch = producto.categoria.some(( categoria: string) => categoria.toLowerCase().includes(termino.toLowerCase()));
      } else {
        // Si 'categoria' no es un array, realiza la verificación directamente
        categoriaMatch = producto.categoria.toLowerCase().includes(termino.toLowerCase());
      }
  
      return descripcionMatch || categoriaMatch;
    });
  }

  filtrarPorCategoria(categoria: string): void {
    this.categoriaSeleccionada = categoria;
    if (!categoria) {
      this.productosFiltrados = this.productos;
    } else {
      this.productosFiltrados = this.productos.filter(producto => 
        producto.categoria.includes(categoria)
      );
    }
  }

  mostrarDetallesProducto(codigoProducto: string): void {
    const producto = this.productos.find(p => p.codigo === codigoProducto);
    if (!producto) return;
    const modalImagen = document.getElementById('modalProductoImagen') as HTMLImageElement;
    const modalPrecio = document.getElementById('modalProductoPrecio') as HTMLElement;
    const modalDescripcion = document.getElementById('modalProductoDescripcion') as HTMLElement;
  
    modalImagen.src = producto.imagen;
    modalImagen.alt = producto.descripcion; // Usamos 'descripcion' ya que no hay un campo 'nombre'
    modalPrecio.textContent = `$${producto.precio}`;
    modalDescripcion.textContent = producto.descripcion;
  }
  
}
