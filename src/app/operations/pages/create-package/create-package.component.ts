import { SupplierService } from '@operations/services/supplier.service';
import { CommonModule } from '@angular/common';
import { Component, ElementRef, inject, signal, ViewChild } from '@angular/core';
import { ProductService } from '@login/services/product.service';
import { PickListModule } from 'primeng/picklist';
import { CheckoutComponent } from "@shared/checkout/checkout.component";
import { fromEvent, map, debounceTime } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-create-package',
  imports: [PickListModule, CommonModule, CheckoutComponent],
  providers: [ProductService],
  templateUrl: './create-package.component.html',
  styleUrl: './create-package.component.scss'
})
export class CreatePackageComponent {

  @ViewChild('picklist', { read: ElementRef }) picklistRef!: ElementRef;

  private readonly supplierService = inject(SupplierService)

  sourceProducts = []

  targetProducts = [];

  allDroppedProducts = signal([])
  id
  page = 1
  maxPage
  lastSearch: any;
  filter: any = {}
  loading: any;
  Pinfo

  constructor(private route: ActivatedRoute) {
    this.route.queryParamMap.subscribe(params => {
      this.id = params.get('id');
     
    });
  }

  ngOnInit() {
    if (this.id) {
      this.getTargetData(this.id)
      this.getSourceData()
    }else{
      this.loadData({ page: 1 })
    }
  }

  loadData(filter) {
    this.supplierService.getProducts(filter).subscribe(res => {
      this.sourceProducts = res['data']
      console.log(this.sourceProducts);
      this.maxPage = res['meta'].last_page

    })

  }
  getTargetData(id){
    console.log('qqqqqqqq');
    
     this.supplierService.getTargetData(id).subscribe(res => {
      this.Pinfo = res['data']
      let arr =res['data'].products
      arr.forEach(item => {
        item.amount = signal(item.quantity)
      });
      this.allDroppedProducts.set([...arr])
      this.targetProducts = arr

    })
  }
  getSourceData(){
     this.supplierService.getSourceData(this.id).subscribe(res => {
      this.sourceProducts = res['data']
    })
  }
  onSearch(filter) {
    this.supplierService.getProducts(filter).subscribe(res => {
      let ids: any[] = this.allDroppedProducts().map(i => i.id)
      let arr = res['data'].filter(item => !ids.includes(item.id))
      this.sourceProducts = arr

      console.log(this.sourceProducts);
      this.maxPage = res['meta'].last_page
    })

  }
  ngAfterViewInit() {
    // ننتظر شوية لحد ما ال DOM يترندر بالكامل
    setTimeout(() => {

      this.observeSearchBox();

      const sourceList = this.picklistRef.nativeElement.querySelector('.p-listbox-list-container');
      console.log(sourceList);

      if (sourceList) {
        sourceList.addEventListener('scroll', (event) => this.onSourceScroll(event));
      }
    });
  }


  handleMoveToTarget(event: any) {
    console.log(event);
    event.items.forEach(item => {
      item.amount = signal(1)
    });
    console.log('hesham,,,');
    
    // أضف العناصر الجديدة بدون حذف القديم
    this.allDroppedProducts.update(arr => [...arr, ...event.items])

    console.log('All dropped products:', this.allDroppedProducts());
  }
  handleMoveToSource(event: any) {

    const movedIds = event.items.map(item => item.id);
    const arr = this.allDroppedProducts().filter(item => !movedIds.includes(item.id))

    this.allDroppedProducts.set(arr)
    console.log(this.allDroppedProducts());

  }
  onSourceScroll(e: any) {
    const element = e.target;
    const atBottom = element.scrollHeight - element.scrollTop === element.clientHeight;

    if (atBottom && this.page < this.maxPage) {
      this.page++
      this.filter.page = this.page
      this.loadData(this.filter);
    }
  }

  observeSearchBox() {
    const searchInput: HTMLInputElement | null =
      this.picklistRef.nativeElement.querySelector(
        '.p-picklist-source-list-container input'
      );

    if (searchInput) {
      fromEvent(searchInput, 'input')
        .pipe(
          map((e: any) => e.target.value.trim()),
          debounceTime(500)
        )
        .subscribe((value) => {
          this.filter.page = 1;
          this.lastSearch = value;
          this.filter.search = value
          searchInput.value = value; // keep text visible
          const picklist = this.picklistRef.nativeElement;
          const filterList = picklist.querySelector('.p-picklist-source-list');
          if (filterList) {
            // reset style or DOM changes from internal filtering
            filterList.querySelectorAll('.p-hidden-accessible').forEach((el: any) => (el.style.display = ''));
          }
          this.onSearch(this.filter);
        });
    } else {
      console.warn('⚠️ Could not find search input for PickList source');
    }

  }

}
