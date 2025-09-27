import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ProductService } from '@login/services/product.service';
import { ProductsComponent } from '@shared/pages/products/products.component';

@Component({
  selector: 'app-shopping',
   imports: [CommonModule,ProductsComponent],
  templateUrl: './shopping.component.html',
  styleUrl: './shopping.component.scss',
   providers: [ProductService]
})
export class ShoppingComponent {
}
