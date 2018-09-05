import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../services/products/products.service';

@Component({
  selector: 'fl-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  constructor(
    private productsService:ProductsService
  ) { }

  ngOnInit() {
    this.getProducts();
  }

  getProducts(){
    this.productsService.getProducts().subscribe(
      (res) => {
        console.log(res);
        
      }
    )
  }

}
