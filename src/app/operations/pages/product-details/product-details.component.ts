import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { GalleriaModule } from 'primeng/galleria';
import { CarouselModule } from 'primeng/carousel';
import { ImageModule } from 'primeng/image';
import { PhotoService } from '@shared/services/photo.service';

@Component({
  selector: 'app-product-details',
  imports: [CommonModule, ButtonModule, GalleriaModule, TagModule ,CarouselModule ,ImageModule],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss'
})
export class ProductDetailsComponent {
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
        private photoService: PhotoService
    ) {}

    ngOnInit() {
      
        this.photoService.getImages().then((images) => {
            this.images = images.slice(0,1);
        });
    }
}
