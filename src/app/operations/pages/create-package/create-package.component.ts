import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component } from '@angular/core';
import { ProductService, Product } from '@login/services/product.service';
import { PickListModule } from 'primeng/picklist';

@Component({
  selector: 'app-create-package',
  imports: [PickListModule, CommonModule],
  providers: [ProductService],
  templateUrl: './create-package.component.html',
  styleUrl: './create-package.component.scss'
})
export class CreatePackageComponent {
  sourceProducts!: Product[];

    targetProducts!: Product[];

    constructor(
      private carService: ProductService,
      private cdr: ChangeDetectorRef
    ) {}

    ngOnInit() {
        this.carService.getProductsSmall().then(products => {
            this.sourceProducts = products;
            this.cdr.markForCheck();
        });
        this.targetProducts = [];
    }
}
