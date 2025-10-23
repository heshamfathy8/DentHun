import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { GalleriaModule } from 'primeng/galleria';
import { CarouselModule } from 'primeng/carousel';
import { ImageModule } from 'primeng/image';
import { PhotoService } from '@shared/services/photo.service';
import { DoctorService } from '@operations/services/doctor.service';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-product-details',
  imports: [CommonModule, ButtonModule, GalleriaModule, TagModule ,CarouselModule ,ImageModule],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss'
})
export class ProductDetailsComponent {
     private readonly doctorService = inject(DoctorService)
     private readonly route = inject(ActivatedRoute)
      private readonly messageService = inject(MessageService)
     product
     id
    images
    galleriaResponsiveOptions: any[] = [
        {
            breakpoint: '1024px',
            numVisible: 5
        },
        {
            breakpoint: '960px',
            numVisible: 4
        },
        {
            breakpoint: '768px',
            numVisible: 3
        },
        {
            breakpoint: '560px',
            numVisible: 1
        }
    ];
 constructor(
    ) {
        this.route.params.subscribe(data => this.id = data['id'] )
    }

    ngOnInit() {
       this.getData()
    }
    getData(){
        this.doctorService.getProduct(this.id).subscribe(res => 
            this.product = res['data']
        )
    }
    markAsFavorite(product){
        product.favorite ? this.removeFromFavorite(product) : this.addToFavorite(product)    
    }  
    addToFavorite(product){
        this.doctorService.markAsFavorite(product.id).subscribe((res) => {
      product.favorite = true
    this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Product added to favorites',
          life: 3000
    });
  });
}  
    removeFromFavorite(product){
        this.doctorService.removeFromCart(product.id).subscribe((res) => {
      product.favorite = false
    this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Product removed from favorites',
          life: 3000
    });
  });
}  
addToCard(product){
  let data = {
    product_id: product.id,
}
this.doctorService.addToCard(data).subscribe((res) => {
     product.is_added = true
    this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Product added to Card',
          life: 3000
    });
    this.doctorService.$cartNum.update(val => val + 1)
    localStorage.setItem('CartNum',this.doctorService.$cartNum().toString())
  });
}  
}
