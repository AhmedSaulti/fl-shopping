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
    
    return;
  }

  private createItem():Item {
    return {
      id: this.items.length,
      name: this.search,
      status:false
    }    
  }

  /**
   * Add the new item to the selected list
   * reset search and suggestions
   * @param item new item
   */
  addItem(item:Item) {
    if(!this.selected || !this.isInList(this.selected,item)) {
      this.selected.push(item);
    }
    this.search = null;
    this.suggestions = [];
    this.loadSuggestions();
  }

  /**
   * If item is in list, return true
   * it compares using name
   * @param list haystack
   * @param item needle
   */
  isInList(list:Item[], item){
    return list.map((i) => {
      return i.name.toLowerCase() == item.name.toLowerCase();
    })[0];
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
}
