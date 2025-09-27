import { Component } from '@angular/core';
import { ProductsComponent } from '@shared/pages/products/products.component';

@Component({
  selector: 'app-favorites',
  imports: [ProductsComponent],
  templateUrl: './favorites.component.html',
  styleUrl: './favorites.component.scss'
})
export class FavoritesComponent {

}
