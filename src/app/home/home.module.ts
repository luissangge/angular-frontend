import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { SharedModule } from '../shared/shared.module';
import { HomeRoutingModule } from './home-routing.module';
import { SidebardComponent } from './components/sidebard/sidebard.component';
import { HeaderComponent } from './components/header/header.component';
import { BreadcrumbsComponent } from './components/breadcrumbs/breadcrumbs.component';
import { HomeComponent } from './pages/home/home.component';
import { ProductsStoreComponent } from './pages/home/store/products-store/products-store.component';
import { FilterProductsStoragePipe } from './pipe/filter-products-storage.pipe';
import { NotImagePipe } from './pipe/not-image.pipe';

import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Ng5SliderModule } from 'ng5-slider';
import { ChooseMarketplacesComponent } from './pages/home/my-products/choose-marketplaces/choose-marketplaces.component';
import { PublishMyproductsComponent } from './pages/home/my-products/publish-myproducts/publish-myproducts.component';


@NgModule({
  declarations: [
    HomeComponent,
    SidebardComponent,
    HeaderComponent,
    BreadcrumbsComponent,
    ProductsStoreComponent,
    FilterProductsStoragePipe,
    NotImagePipe,
    ChooseMarketplacesComponent,
    PublishMyproductsComponent],

  exports: [HomeComponent,
    SidebardComponent,
    HeaderComponent,
    BreadcrumbsComponent,
    ProductsStoreComponent,
    ChooseMarketplacesComponent,
<<<<<<< HEAD
    PublishMyproductsComponent],
=======
    PublishMyproductsComponent,
    NotImagePipe],
>>>>>>> development
  imports: [
    SharedModule,
    HomeRoutingModule,
  ]
})
export class HomeModule { }
