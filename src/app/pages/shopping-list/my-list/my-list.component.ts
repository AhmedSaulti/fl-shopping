import { Component, OnInit } from '@angular/core';
export interface Item {
  id: Number;
  name: String;
}
@Component({
  selector: 'fl-my-list',
  templateUrl: './my-list.component.html',
  styleUrls: ['./my-list.component.scss']
})
export class MyListComponent implements OnInit {
  items: Item[] = [
    { id: 1, name: 'Milk' },
    { id: 2, name: 'Eggs' },
    { id: 3, name: 'Potato' },
    { id: 4, name: 'Tomato' },
    { id: 5, name: 'Cheese' },
    { id: 6, name: 'Burger' },
    { id: 7, name: 'Chicken' },
    { id: 8, name: 'Fish' },
    { id: 9, name: 'Juice' }
  ];
  suggestions: Item[]= [];
  selected: Item[] = [];
  search;
  active: boolean = false;
  limit: number = 3;
  constructor() {}

  ngOnInit() {
    console.log(this.search);
  }
  onBlur() {
    // this.active = false;
  }
  onFocus() {
    if (!this.active) this.active = true;
    
    if (this.search == '' || this.search == null) {
      this.suggestions = this.items;
      if (this.selected.length)
        this.suggestions = this.suggestions.filter(i => !this.selected.includes(i));
      return;
    }
  }
  onChange() {
    this.suggestions = this.items.filter(i => {
      if (this.selected && this.selected.includes(i)) return false;

      return i.name.toLowerCase().match(this.search.toLowerCase());
    });
  }
  showMore() {
    this.limit += 3;
  }

  addItem(item:Item) {
    if(!this.selected || !this.selected.includes(item)) {
      this.selected.push(item);
    }
    this.search = null;
    this.suggestions = [];
    this.onFocus();
    // this.active = false;
    console.log(this.selected);
    
  }
}
