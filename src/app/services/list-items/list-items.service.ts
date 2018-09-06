import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { ListItem } from '../../models/list-item';

@Injectable({
  providedIn: 'root'
})
export class ListItemsService {
  private items = [
    { id: 1, name: 'Milk', category: 'Dairy Products', status: false },
    { id: 2, name: 'Eggs', category: 'Spready', status: false },
    { id: 3, name: 'Potato', category: 'Vegetables & Fruits', status: false },
    { id: 4, name: 'Tomato', category: 'Vegetables & Fruits', status: false },
    { id: 5, name: 'Cheese', category: 'Dairy Products', status: false },
    { id: 6, name: 'Burger', category: 'Meat', status: false },
    { id: 7, name: 'Chicken', category: 'Meat', status: false },
    { id: 8, name: 'Fish', category: 'Meat', status: false },
    { id: 9, name: 'Juice', category: 'Drinks', status: false }
  ];
  constructor() {}

  getListItems() {
    return of(this.items);
  }

  getLocalList() {
    let local = localStorage.getItem('myList');
    if (local) return of(JSON.parse(local));
    return of([]);
  }

  setLocalList(list:ListItem[]) {
    localStorage.setItem('myList', JSON.stringify(list));
  }
}
