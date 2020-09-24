import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Marketplace } from 'src/app/models/marketplace.model';
import { MarketplaceService } from '../../../../services/marketplace.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-marketplaces',
  templateUrl: './list-marketplaces.component.html',
  styleUrls: ['./list-marketplaces.component.css']
})
export class ListMarketplacesComponent implements OnInit {

  marketplaces: Marketplace[] = [];

  // Modal
  public headerCreateModal = 'Crear marketplace';
  public headerUpdateModal = 'Actualizar marketplace';
  public nameMarketplace = '';
  public idMarketplace = '';
  public register = true;

  selectedMarketplace: Marketplace = new Marketplace();


  constructor(public marketplaceService: MarketplaceService) { }

  ngOnInit(): void {
    this.getMarketplaces();

  }

  getMarketplaces(): void {
    this.marketplaceService.getMarketplaces().subscribe(resp => {
      this.marketplaces = resp;
    }, error => console.log('Error:', error));
  }


  createModal(): void {
    this.register = true;
    this.selectedMarketplace = new Marketplace();
  }

  updateModal(marketplace: Marketplace): void {
    this.selectedMarketplace = marketplace;
    this.register = false;
  }

  createOrUpdateMarketplace(): void {


    if (this.selectedMarketplace.id) {
      console.log('update')
      this.marketplaceService.updateProduct(this.selectedMarketplace).subscribe(resp => {
        this.getMarketplaces();
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: `Marketplace ${resp.name} ha sido actualizado`,
          showConfirmButton: false,
          timer: 2000,
          showClass: {
            popup: 'animated--fade-in'
          },
          hideClass: {
            popup: 'animate__animated animate__fadeOutUp'
          }
        })
      }, error => {
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          title: `Marketplace no ha sido actualizado`,
          showConfirmButton: false,
          timer: 2000
        })
      })
    } else {
      this.marketplaceService.saveProduct(this.selectedMarketplace).subscribe(resp => {
        this.getMarketplaces();
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: `Marketplace ${resp.name} ha sido creado`,
          showConfirmButton: false,
          timer: 2000
        })
      }, error => {
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          title: `Marketplace no ha sido creado`,
          showConfirmButton: false,
          timer: 2000
        })
      })
    }
  }

  deleteMarketplace(marketplace: Marketplace): void {


    Swal.fire({
      title: 'Está seguro?',
      text: "Usted no podrá revertir esto!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Aceptar!'
    }).then((result) => {
      if (result.isConfirmed) {

        console.log('delete')
        this.marketplaceService.deleteProduct(marketplace.id).subscribe(resp => {
          console.log(resp)
          this.getMarketplaces();
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: `Marketplace ${marketplace.name} ha sido eliminado`,
            showConfirmButton: false,
            timer: 2000
          })
        }, error => {
          Swal.fire({
            position: 'top-end',
            icon: 'error',
            title: `Marketplace no ha sido actualizado`,
            showConfirmButton: false,
            timer: 2000
          })
        })
      }
    })



  }


}