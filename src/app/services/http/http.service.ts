import { Injectable } from '@angular/core';
import { Global } from "../global";
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { RequestOptionsArgs, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';


const httpOptions = {
  headers: new HttpHeaders({
     'Content-Type': 'application/json',
     'Accept': 'application/json',
    }),
  withCredentials:false,
};
// {headers: headers, withCredentials:false, observe:'response'}

@Injectable()
export class HttpService {

  constructor(
    private http:HttpClient,
  ) { }
  
  /**
   * getting token from Backend services module
   * @return http text token response
   */
  // setToken(): Observable<string> {
  //   return this.http.get(`${Global.backEndUrl}oauth/token`, httpOptions).map(res => {
  //     localStorage.setItem("appToken", res.text())
  //     return res.text();
  //   });
  // }
  /**
   * building up the full url path for each resource and / or params
   * @param resource the entity resource param. ex: system/'connect', user/'login'
   * @return full request path after adding the entity type and resource param
   */
  fullRequestURL(resource: string | number): string {
    return Global.restUrl + resource;
  }
  /**
   * basic http get request with headers.
   * @param resource the entity resource param. ex: system/'connect', user/'login'
   * @return http json response
   */
  get(resource?: string | number, params?: {}): Observable<any> {
    if (params) {
      resource += this.getArgs(params);
    }
    return this.http.get(this.fullRequestURL(resource), httpOptions);
  }

  /**
   * basic http post request with headers.
   * @param resource the entity resource param. ex: system/'connect', user/'login'
   * @param body the contenct of the request
   * @return http json response
   */
  post(body: any = {}, resource?: string | number, params?: {}): Observable<any> {
    if (params) {
      resource += this.getArgs(params);
    }
    return this.http.post(this.fullRequestURL(resource), body, httpOptions,);
  }

  /**
   * basic http put request with headers.
   * @param resource the entity resource param. ex: system/'connect', user/'login'
   * @param body the contenct of the request
   * @return http json response
   */
  put(body: any = {}, resource?: string | number): Observable<any> {
    return this.http.put(this.fullRequestURL(resource), body, httpOptions);
  }

  /**
   * basic http delete request with headers.
   * @param resource the entity resource param. ex: system/'connect', user/'login'
   * @return http json response
   */
  delete(resource?: string | number,params: any = {}): Observable<any> {
    if (params) {
      resource += this.getArgs(params);
    }
    return this.http.delete(this.fullRequestURL(resource), httpOptions);
  }

  /**
   * Serializin arguments as a string
   * @param options object of Backend parametars to serialize
   * @return string of parameters
   */
  getArgs(options: any): string {
    if (!options) {
      return '';
    }
    var args = '?';
    Object.keys(options).forEach((key, index) => {
      args += this.optionToString(key, options[key]);
    });
    return args;
  }

  /**
   * Check if variable is array of objects
   * @param value array to check
   */
  private isArray(value) {
    return Object.prototype.toString.call(value) === '[object Array]';
  }

  /**
   * serializing eatch option
   * @param key option key
   * @param value option value
   * @return single option serilization
   */
  optionToString(key: string, value: any): string {
    if (!value) {
      return '';
    }
    var str = '';
    if (value instanceof Array) {
      value.forEach((element, index) => {
        str += `${key}[${index}]=${element}&`;
      });
    } else if (value instanceof Object) {
      Object.keys(value).forEach((element, index) => {
        if (value instanceof Object) {
          str += this.serializeObject(value[element], `${key}[${element}]`);
        } else {
          str += `${key}[${element}]=${value[element]}&`;
        }
      });
    } else {
      str += `${key}=${value}&`;
    }
    return str;
  }

  /**
   * serializing the object keys
   * @param obj object to serialize
   */
  private serializeObject(obj: any, parentSerialized: string): string {
    var str = '';
    Object.keys(obj).forEach((key, index) => {
      const value = obj[key];
      if (value instanceof Object) {
        str += `${this.serializeObject(value, `${parentSerialized}[${key}]`)}`;
      } else {
        str += `${parentSerialized}[${key}]=${value}&`;
      }
    });
    return str;
  }

  /**
   * Get appToken if exists
   * if not exist generate it
   */
  private getSavedVariable() {
    if (!localStorage.getItem('appToken')) {
      // this.setToken();
    }
    return localStorage.getItem('appToken');
  }
}