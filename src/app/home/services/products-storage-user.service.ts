import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { SelectedProducResponse } from '../../models/selected.products.response';
import { MarketplaceDetails } from '../../models/marketplace.details';
import { PageProductMeliStorage } from '../../models/page.myproduct.custom.model';
import { EditableProductModel } from '../../models/editable.product.model';
import { Image } from 'src/app/models/image.model';


@Injectable({
  providedIn: 'root'
})
export class ProductsStorageUserService {

  URI = environment.URI_ROOT;
  URI_PRODUCTS_ACTIONS = '/products/api'; 
  URI_UPLOAD_ACTIONS = '/upload/api';  
  pageProductsMeli: PageProductMeliStorage;
  list: any[];

  constructor(private http: HttpClient) { 
    this.pageProductsMeli = new PageProductMeliStorage();
    this.list = [];
  }

  storeMyProducts(idProfile: number, marketplace: Number, products: any[]): Observable<SelectedProducResponse>{    
    let string_profile = idProfile.toString();
    let encodeProfile = btoa(string_profile);
    
    const params = `${this.URI}${this.URI_PRODUCTS_ACTIONS}/select-myproducts/${encodeProfile}?marketplace=${marketplace}
    &products=${products}`;

    return this.http.get<SelectedProducResponse>(params);     
  }

  getDetailsMarketplaces(idProfile: number): Observable<MarketplaceDetails[]>{     
    let string_profile = idProfile.toString();
    let encodeProfile = btoa(string_profile);

    const params = `${this.URI}${this.URI_PRODUCTS_ACTIONS}/marketplaces-details/${encodeProfile}`;
    return this.http.get<MarketplaceDetails[]>(params);   
  }

  getPageMyCustomProducts(idProfile: number, page: number, size: number, sku: string, nameProduct: string,
    state: number, familyId: number, minPrice: number, maxPrice: number): Observable<PageProductMeliStorage> {
    
      let string_profile = idProfile.toString();
      let encodeProfile = btoa(string_profile);

    const uri = `${this.URI}${this.URI_PRODUCTS_ACTIONS}/items-meli-filters/${page}/${size}/${encodeProfile}
    ?sku=${sku}&nameProduct=${nameProduct}&state=${state}&familyId=${familyId}
    &minPrice=${minPrice}&maxPrice=${maxPrice}`;
  
    return this.http.get<PageProductMeliStorage>(uri).pipe(map((resp: any) => {     
      this.pageProductsMeli.itemsMeliGrid = resp.itemsMeliGridList;
      this.pageProductsMeli.totalElements = resp.totalElements;      
      this.pageProductsMeli.size = resp.size;
      this.pageProductsMeli.totalPages = resp.totalPages;
      this.pageProductsMeli.last = resp.last;
      this.pageProductsMeli.first = resp.first;
      this.pageProductsMeli.sort = resp.sort;
      this.pageProductsMeli.totalProducts = resp.totalProducts;
      return this.pageProductsMeli;
    }));
  }

  getCustomProduct(id: number): Observable<EditableProductModel>{
    const params = `${this.URI}${this.URI_PRODUCTS_ACTIONS}/product-info/${id}`;
    return this.http.get<EditableProductModel>(params);
  }

  updateCustomProduct(product: EditableProductModel, imageToDelete: number[]): Observable<EditableProductModel>{
    const params = `${this.URI}${this.URI_PRODUCTS_ACTIONS}/edit-product-info/?imagesToDelete=${imageToDelete}`;
    return this.http.put<EditableProductModel>(params, product);
  }

  uploadImage(formData: FormData): Observable<any>{
    const params = `${this.URI}${this.URI_UPLOAD_ACTIONS}/file/upload-file`;
    return this.http.post<any>(params, formData);
  }

  async uploadImageSyn(fileList: any[]): Promise<any>{
    const params = `${this.URI}${this.URI_UPLOAD_ACTIONS}/file/upload-file`;
    let resultList: any[] = [];

    for(let i=0; i<fileList.length; i++){
      let formData: FormData = new FormData(); 
      formData.append('image', fileList[i], fileList[i].name);
      let result = await this.http.post<any>(params, formData).toPromise();
      resultList.push(result); 
    }
    return resultList;
  }
 
  deleteImages(imageToDelete: string[]): Observable<any>{
    let finalImageList = [];
    imageToDelete.forEach(element => {
      var position = element.lastIndexOf("/");
      finalImageList.push(element.substring(position+1));
 });
    const params = `${this.URI}${this.URI_UPLOAD_ACTIONS}/file-delete/${finalImageList}`;
    return this.http.delete<any>(params);
  }

  updateCommonInfo(idProfile: number, description: string, productIdList: string[], imageToAddList: string[]): Observable<any>{
    let string_profile = idProfile.toString();
    let encodeProfile = btoa(string_profile);
    let imageListToSend = [];

    imageToAddList.forEach(element =>{
      if(element.length !== 0){
        let ima = new Image();
        ima.photos = element;
        imageListToSend.push(ima);
      }
    })

    const params = `${this.URI}${this.URI_PRODUCTS_ACTIONS}/store-common-data/${encodeProfile}?description=${description}&skuList=${productIdList}`;
    return this.http.put<any>(params, imageListToSend);
  }
  
}
