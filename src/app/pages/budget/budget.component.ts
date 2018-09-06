import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../services/products/products.service';
import { ListItemsService } from '../../services/list-items/list-items.service';
import { ListItem } from '../../models/list-item';

@Component({
  selector: 'fl-budget',
  templateUrl: './budget.component.html',
  styleUrls: ['./budget.component.scss']
})
export class BudgetComponent implements OnInit {
  constructor(
    private productsService: ProductsService,
    private listItemsService: ListItemsService
  ) {}

  myList = [];
  ngOnInit() {
    this.loadList();    
  }

  private loadList() {
    this.listItemsService.getLocalList().subscribe(res => {
      this.myList = res;
      this.getPrices();
    });
  }
  getPrices() {
    this.myList.forEach(e => {
      let x = this.getProduct(e,e.name);
      console.log(x);
      
    });
    console.log(this.myList);
    
  }

  private getProduct(item,type){
    this.productsService.getProducts(type,1).subscribe(
      res => {
        if(res.products[0]) {
          const product = res.products[0]
          const images = product.images.list;
          item.price = product.prices.price;
          item.image = images[0]
          
        }
        // console.log(res.products[0].prices.price);
        console.log(res);
         
      }
    )
  }
}
