import { Injectable } from '@angular/core';
import { HttpService } from '../http/http.service'
@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(
    private http:HttpService,
  ) { }

  getProducts(type?, limit?, offset?){
    let params = {
      limit: limit||60,
      offset: 120,
      q: type||''
    };
    return this.http.get('products',params);
  }
}
