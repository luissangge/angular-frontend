import { NgModule } from '@angular/core';


import { SharedModule } from '../shared/shared.module';
import { HomeRoutingModule } from './home-routing.module';



//Components
import { SidebardComponent } from './components/sidebard/sidebard.component';
import { HeaderComponent } from './components/header/header.component';
import { BreadcrumbsComponent } from './components/breadcrumbs/breadcrumbs.component';
import { HomeComponent } from './pages/home/home.component';
import { ProductsStoreComponent } from './pages/home/store/products-store/products-store.component';
import { ChooseMarketplacesComponent } from './pages/home/my-products/choose-marketplaces/choose-marketplaces.component';
import { PublishMyproductsComponent } from './pages/home/my-products/publish-myproducts/publish-myproducts.component';
import { ListMarketplacesComponent } from './pages/home/marketplaces/list-marketplaces/list-marketplaces.component';


import { NotImagePipe } from './pipes/not-image.pipe';
import {MatDialogModule} from '@angular/material/dialog';

import { PopupAddcommoninfoComponent } from './components/modals/popup-addcommoninfo/popup-addcommoninfo.component';
import { EditProductsComponent } from './pages/home/my-products/edit-products/edit-products.component';
import { UsersComponent } from './pages/home/users/users.component';
import { NotImageProfilePipe } from './pipes/not-image-profile.pipe';
import { FilterProductsStoragePipe } from './pipes/filter-products-storage.pipe';



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
    PublishMyproductsComponent,
    ListMarketplacesComponent,
    PopupAddcommoninfoComponent,
    EditProductsComponent,
    UsersComponent,
    NotImageProfilePipe],

  exports: [HomeComponent,
    SidebardComponent,
    HeaderComponent,
    BreadcrumbsComponent,
    ProductsStoreComponent,
    ChooseMarketplacesComponent,
    PublishMyproductsComponent,
    ListMarketplacesComponent,
    PopupAddcommoninfoComponent,
    UsersComponent,
    NotImagePipe,
    NotImageProfilePipe,
    EditProductsComponent,
    NotImagePipe],
  imports: [
    SharedModule,
    HomeRoutingModule,
    MatDialogModule
  ]
})
export class HomeModule { }
