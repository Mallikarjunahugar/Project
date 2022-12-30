import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../common/product';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/operators';
import { ProductCategory } from '../common/product-category';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private baseUrl = 'http://localhost:8080/api/products';
  private categoryUrl = 'http://localhost:8080/api/product-category';

  constructor(private httpClient: HttpClient) { }

  getProduct(theProductId: number) :Observable<Product>{
const productUrl = `${this.baseUrl}/${theProductId}`;
return this.httpClient.get<Product>(productUrl);
  }
  getProductListPaginate(thePage:number,
                          thePageSize:number,
                          _theCategoryId:number): Observable<GetResponseProducts> {
    const searchUrl =`${this.baseUrl}/search/findByCategoryId?id=${_theCategoryId}`
    + `&page=${thePage}&size=${thePageSize}`;
    
    return this.httpClient.get<GetResponseProducts>(searchUrl);
  }

  getProductList(_theCategoryId:number): Observable<Product[]> {
    const searchUrl =`${this.baseUrl}/search/findByCategoryId?id=${_theCategoryId}`;
    
    return this.getProducts(searchUrl);
  }
  private getProducts(searchUrl: string): Observable<Product[]> {
    return this.httpClient.get<GetResponseProducts>(searchUrl).pipe(
      map(response => response._embedded.products)
    );
  }

  searchProducts(thekeyword: string): Observable<Product[]> {
    const searchUrl =`${this.baseUrl}/search/findByNameContaining?name=${thekeyword}`;
    return this.getProducts(searchUrl); 
  }
  searchProductsPaginate(thePage:number,
                        thePageSize:number,
                         thekeyword:string): Observable<GetResponseProducts> {

                          //search based on keyword
const searchUrl =`${this.baseUrl}/search/findByNameContaining?name=${thekeyword}`
                + `&page=${thePage}&size=${thePageSize}`;

return this.httpClient.get<GetResponseProducts>(searchUrl);
}



  getProductCategories():Observable<ProductCategory[]> {
    return this.httpClient.get<GetResponseProductCategory>(this.categoryUrl).pipe(
      map(response => response._embedded.productCategory)
    );
  }
}

interface GetResponseProducts {
  _embedded: {
    products: Product[];
  },
  page:{
    size:number,
    totalElements:number,
    totalPages:number,
    number:number
  }
}

interface GetResponseProductCategory {
  _embedded: {
    productCategory: ProductCategory[];
  }  
}