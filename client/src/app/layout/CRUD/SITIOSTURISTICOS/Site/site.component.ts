import { Component, OnInit } from '@angular/core';
import { ToastrManager } from 'ng6-toastr-notifications';
import { saveAs } from 'file-saver/FileSaver';
import { SiteService } from './../../../../services/CRUD/SITIOSTURISTICOS/site.service';
import { Site } from './../../../../models/SITIOSTURISTICOS/Site';
import { SiteImageService } from './../../../../services/CRUD/SITIOSTURISTICOS/siteimage.service';
import { SiteImage } from './../../../../models/SITIOSTURISTICOS/SiteImage';


@Component({
   selector: 'app-site',
   templateUrl: './site.component.html',
   styleUrls: ['./site.component.scss']
})
export class SiteComponent implements OnInit {
   sites: Site[] = [];
   siteSelected: Site = new Site();

   currentPage = 1;
   lastPage = 1;
   showDialog = false;
   recordsByPage = 5;
   site_images: SiteImage[] = [];
   constructor(
               private toastr: ToastrManager,
               private site_imageDataService: SiteImageService,
               private siteDataService: SiteService) {}

   ngOnInit() {
      this.goToPage(1);
      this.getSiteImage();
   }

   selectSite(site: Site) {
      this.siteSelected = site;
   }

   getSiteImage() {
      this.site_images = [];
      this.site_imageDataService.get().then( r => {
         this.site_images = r as SiteImage[];
      }).catch( e => console.log(e) );
   }

   goToPage(page: number) {
      if ( page < 1 || page > this.lastPage ) {
         this.toastr.errorToastr('La página solicitada no existe.', 'Error');
         return;
      }
      this.currentPage = page;
      this.getSites();
   }

   locationEvent(event) {
      this.siteSelected.location_latitude = event.coords.lat;
      this.siteSelected.location_longitude = event.coords.lng;
   }

   getSites() {
      this.sites = [];
      this.siteSelected = new Site();
      this.siteSelected.site_image_id = 0;
      this.siteDataService.get_paginate(this.recordsByPage, this.currentPage).then( r => {
         this.sites = r.data as Site[];
         this.lastPage = r.last_page;
      }).catch( e => console.log(e) );
   }

   newSite(content) {
      this.siteSelected = new Site();
      this.siteSelected.site_image_id = 0;
      this.showDialog = true;
   }

   editSite(content) {
      if (typeof this.siteSelected.id === 'undefined') {
         this.toastr.errorToastr('Debe seleccionar un registro.', 'Error');
         return;
      }
      this.showDialog = true;
   }

   deleteSite() {
      if (typeof this.siteSelected.id === 'undefined') {
         this.toastr.errorToastr('Debe seleccionar un registro.', 'Error');
         return;
      }
      this.siteDataService.delete(this.siteSelected.id).then( r => {
         this.toastr.successToastr('Registro Borrado satisfactoriamente.', 'Borrar');
         this.getSites();
      }).catch( e => console.log(e) );
   }

   backup() {
      this.siteDataService.getBackUp().then( r => {
         const backupData = r;
         const blob = new Blob([JSON.stringify(backupData)], { type: 'text/plain' });
         const fecha = new Date();
         saveAs(blob, fecha.toLocaleDateString() + '_Sites.json');
      }).catch( e => console.log(e) );
   }

   toCSV() {
      this.siteDataService.get().then( r => {
         const backupData = r as Site[];
         let output = 'id;name;description;location_latitude;location_longitude;site_image_id\n';
         backupData.forEach(element => {
            output += element.id; + element.name + ';' + element.description + ';' + element.location_latitude + ';' + element.location_longitude + ';' + element.site_image_id + '\n';
         });
         const blob = new Blob([output], { type: 'text/plain' });
         const fecha = new Date();
         saveAs(blob, fecha.toLocaleDateString() + '_Sites.csv');
      }).catch( e => console.log(e) );
   }

   decodeUploadFile(event) {
      const reader = new FileReader();
      if (event.target.files && event.target.files.length > 0) {
         const file = event.target.files[0];
         reader.readAsDataURL(file);
         reader.onload = () => {
            const fileBytes = reader.result.toString().split(',')[1];
            const newData = JSON.parse(decodeURIComponent(escape(atob(fileBytes)))) as any[];
            this.siteDataService.masiveLoad(newData).then( r => {
               this.goToPage(this.currentPage);
            }).catch( e => console.log(e) );
         };
      }
   }

   saveDialogResult() {
      if (typeof this.siteSelected.id === 'undefined') {
         this.siteDataService.post(this.siteSelected).then( r => {
            this.toastr.successToastr('Datos guardados satisfactoriamente.', 'Nuevo');
            this.getSites();
         }).catch( e => console.log(e) );
      } else {
         this.siteDataService.put(this.siteSelected).then( r => {
            this.toastr.successToastr('Registro actualizado satisfactoriamente.', 'Actualizar');
            this.getSites();
         }).catch( e => console.log(e) );
      }
   }

   cancelDialogResult() {
      this.showDialog = false;      this.goToPage(this.currentPage);
   }
}