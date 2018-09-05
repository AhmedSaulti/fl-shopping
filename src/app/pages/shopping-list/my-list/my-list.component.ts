import { Component, OnInit } from '@angular/core';
export interface Item {
  id: Number;
  name: String;
  status: Boolean;
}
@Component({
  selector: 'fl-my-list',
  templateUrl: './my-list.component.html',
  styleUrls: ['./my-list.component.scss']
})
export class MyListComponent implements OnInit {
  items: Item[] = [
    { id: 1, name: 'Milk', status: false  },
    { id: 2, name: 'Eggs', status: false },
    { id: 3, name: 'Potato', status: false },
    { id: 4, name: 'Tomato', status: false },
    { id: 5, name: 'Cheese', status: false },
    { id: 6, name: 'Burger', status: false },
    { id: 7, name: 'Chicken', status: false },
    { id: 8, name: 'Fish', status: false },
    { id: 9, name: 'Juice', status: false }
  ];
  suggestions: Item[]= [];
  selected: Item[] = [{ id: 9, name: 'Juice', status: false }];
  search;
  active: boolean = false;
  limit: number = 3;
  constructor() {}

  ngOnInit() {
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
    if(!this.search) return;
    const addedItem = this.suggestions.filter( i => i.name.toLowerCase() == this.search.toLowerCase());
    if(addedItem.length) {
      if( this.isInList(this.selected,addedItem[0])) {
        this.refreshList();
        this.search = null
        return ;
      }
      this.addItem(addedItem[0]);
      this.refreshList();
      return;
    }
    const newItem:Item = {
      id: this.items.length,
      name: this.search,
      status:false
    }
    const check = this.selected.filter( i => i.name.toLowerCase() == this.search.toLowerCase());

    this.refreshList();
    if(check.length) return this.search = null;
    this.addItem(newItem);
    return;
  }

 

  addItem(item:Item) {
    if(!this.selected || !this.isInList(this.selected,item)) {
      this.selected.push(item);
    }
    this.search = null;
    this.suggestions = [];
    this.refreshList();
  }
  isInList(list:Item[], item){
    let x = list.map((i) => {
      return i.name.toLowerCase() == item.name.toLowerCase();
    })[0];
    console.log(x);
    return x
    
  }

  private refreshList() {
    this.suggestions = [];
    this.loadSuggestions();
  }
  private loadSuggestions() {
    this.suggestions = this.items;
    if (this.selected.length)
      this.suggestions = this.suggestions.filter(i => !this.isInList(this.selected, i));
    return;
  }
}
