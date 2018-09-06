import { Component, OnInit } from '@angular/core';
import { ListItem } from '../../../models/list-item';
import { ListItemsService } from '../../../services/list-items/list-items.service';
import { ProductsService } from '../../../services/products/products.service';

@Component({
  selector: 'fl-my-list',
  templateUrl: './my-list.component.html',
  styleUrls: ['./my-list.component.scss']
})
export class MyListComponent implements OnInit {
  items: ListItem[] ;
  suggestions: ListItem[]= [];
  selected: ListItem[] = [];
  categories = [];
  search;
  active: boolean = false;
  limit: number = 3;
  categorized:boolean = false;
  constructor(
    private listItemsService:ListItemsService,
    private productsService:ProductsService
  ) {}

  ngOnInit() {
    this.getItems();
    this.loadLocal();
  }

  private loadLocal() {
    this.listItemsService.getLocalList().subscribe(
      (res) => { 
        this.selected = res;
        this.selected.forEach(element => {
          this.getProduct(element)
          this.updateCategory(element)
        });
      }
    )
  }

  getItems(){
    this.listItemsService.getListItems().subscribe(
      res => this.items = res
    )
  }

  onBlur() {
    // this.active = false;
  }
  onFocus() {
    if (!this.active) this.active = true;
    
    if (this.search == '' || this.search == null) {
      return this.loadSuggestions();
    }
  }

  onChange() {
    this.suggestions = this.items.filter(i => {
      if (this.selected && this.isInList(this.selected,i)) return false;
      return i.name.toLowerCase().match(this.search.toLowerCase());
    });
  }

  showMore() {
    this.limit += 3;
  }

  inputItem() {
    // if empty return
    if(!this.search) return;

    // check if in selected or suggetsions
    const check = this.selected.filter(i => i.name.toLowerCase() == this.search.toLowerCase());
    const addedItem = this.suggestions.filter( i => i.name.toLowerCase() == this.search.toLowerCase())[0];

    // if in any reload suggestions and return
    if(check.length || (addedItem && this.isInList(this.selected,addedItem))) {
      this.loadSuggestions();
      this.search = null;
      return;
    }

    // if item in suggestions, add it and reload suggestions
    if(addedItem) {
      this.addItem(addedItem);
      this.loadSuggestions();
      return;
    }

    // else its new Item, create object for it
    const newItem = this.createItem();
    // add it to selected
    this.addItem(newItem);
    this.loadSuggestions();
    
    return;
  }

  private createItem():ListItem {
    return {
      id: this.items.length,
      name: this.search,
      status:false,
      category: 'Custom',
    }    
  }

  /**
   * Add the new item to the selected list
   * reset search and suggestions
   * @param item new item
   */
  addItem(item:ListItem) {
    if(this.selected.length == 0 || !this.isInList(this.selected,item)) {
      this.selected.push(item);
      this.selected = [...this.selected]
    } 
    
    this.search = null;
    this.suggestions = [];
    this.loadSuggestions();
    this.storeList();
    this.getProduct(item)
    this.updateCategory(item);
  }

  /**
   * if item category not in the categories list, Add it
   * @param item item to check
   */
  private updateCategory(item: ListItem) {
    const cat = this.categories.find(i => i == item.category);
    if (!cat)
      this.categories.push(item.category);
    
  }

  /**
   * On deleting item from list, remove it from selected
   * @param index item index
   */
  removeItem(index) {
    this.selected.splice(index,1);
    this.loadSuggestions();
    this.storeList();
  }

  /**
   * Store the list in local storage
   */
  private storeList() {
    this.listItemsService.setLocalList(this.selected);
  }

  /**
   * On change of check, update item status
   *
   * @param value true or false checked
   * @param index item index
   */
  toggleCheckbox(value,index) {
    this.selected[index].status = value;
    this.storeList();
  }

  /**
   * If item is in list, return true
   * it compares using name
   * @param list haystack
   * @param item needle
   */
  isInList(list:ListItem[], item):boolean{
    let x = list.filter((i) => {
      return i.name.toLowerCase() == item.name.toLowerCase();
    });
    return (x.length)? true:false
  }

  /**
   * set items in sugestions
   * if selected has items, remove them from the sugesstions
   */
  private loadSuggestions() {
    this.suggestions = [];
    this.suggestions = this.items;
    if (this.selected.length)
      this.suggestions = this.suggestions.filter(i => !this.isInList(this.selected, i));
    return;
  }

  private getProduct(item){
    this.productsService.getProducts(item.name,1).subscribe(
      res => {
        this.setPrice(res, item);
      }
    )
  }

  /**
   * if res got price, add it to item
   * if it doesn't set a random price
   * @param res result from API
   * @param item The item to be priced
   */
  private setPrice(res: any, item: any) {
    if (res.products[0]) {
      const product = res.products[0];
      item.price = product.prices.price;
    } else {
      item.price = Math.round(Math.random()*500)/100
    }
  }
}
