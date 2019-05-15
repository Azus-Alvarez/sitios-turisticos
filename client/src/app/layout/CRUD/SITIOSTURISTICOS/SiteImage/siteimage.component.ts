import { Component, OnInit } from '@angular/core';
import { ToastrManager } from 'ng6-toastr-notifications';
import { saveAs } from 'file-saver/FileSaver';
import { SiteImageService } from './../../../../services/CRUD/SITIOSTURISTICOS/siteimage.service';
import { SiteImage } from './../../../../models/SITIOSTURISTICOS/SiteImage';

@Component({
   selector: 'app-siteimage',
   templateUrl: './siteimage.component.html',
   styleUrls: ['./siteimage.component.scss']
})
export class SiteImageComponent implements OnInit {
   site_images: SiteImage[] = [];
   site_imageSelected: SiteImage = new SiteImage();

   currentPage = 1;
   lastPage = 1;
   showDialog = false;
   recordsByPage = 5;
   constructor(
               private toastr: ToastrManager,
               private site_imageDataService: SiteImageService) {}

   ngOnInit() {
      this.goToPage(1);
   }

   CodeFileSiteImage(event) {
      const reader = new FileReader();
      if (event.target.files && event.target.files.length > 0) {
         const file = event.target.files[0];
         reader.readAsDataURL(file);
         reader.onload = () => {
            this.site_imageSelected.site_image_file_name = file.name;
            this.site_imageSelected.site_image_file_type = file.type;
            this.site_imageSelected.site_image_file = reader.result.toString().split(',')[1];
         };
      }
   }

   selectSiteImage(site_image: SiteImage) {
      this.site_imageSelected = site_image;
   }

   goToPage(page: number) {
      if ( page < 1 || page > this.lastPage ) {
         this.toastr.errorToastr('La página solicitada no existe.', 'Error');
         return;
      }
      this.currentPage = page;
      this.getSiteImages();
   }

   getSiteImages() {
      this.site_images = [];
      this.site_imageSelected = new SiteImage();
      this.site_imageDataService.get_paginate(this.recordsByPage, this.currentPage).then( r => {
         this.site_images = r.data as SiteImage[];
         this.lastPage = r.last_page;
      }).catch( e => console.log(e) );
   }

   newSiteImage(content) {
      this.site_imageSelected = new SiteImage();
      this.showDialog = true;
   }

   editSiteImage(content) {
      if (typeof this.site_imageSelected.id === 'undefined') {
         this.toastr.errorToastr('Debe seleccionar un registro.', 'Error');
         return;
      }
      this.showDialog = true;
   }

   deleteSiteImage() {
      if (typeof this.site_imageSelected.id === 'undefined') {
         this.toastr.errorToastr('Debe seleccionar un registro.', 'Error');
         return;
      }
      this.site_imageDataService.delete(this.site_imageSelected.id).then( r => {
         this.toastr.successToastr('Registro Borrado satisfactoriamente.', 'Borrar');
         this.getSiteImages();
      }).catch( e => console.log(e) );
   }

   backup() {
      this.site_imageDataService.getBackUp().then( r => {
         const backupData = r;
         const blob = new Blob([JSON.stringify(backupData)], { type: 'text/plain' });
         const fecha = new Date();
         saveAs(blob, fecha.toLocaleDateString() + '_SiteImages.json');
      }).catch( e => console.log(e) );
   }

   toCSV() {
      this.site_imageDataService.get().then( r => {
         const backupData = r as SiteImage[];
         let output = 'id;site_image_file_type;site_image_file_name;site_image_file\n';
         backupData.forEach(element => {
            output += element.id; + element.site_image_file_type + ';' + element.site_image_file_name + ';' + element.site_image_file + '\n';
         });
         const blob = new Blob([output], { type: 'text/plain' });
         const fecha = new Date();
         saveAs(blob, fecha.toLocaleDateString() + '_SiteImages.csv');
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
            this.site_imageDataService.masiveLoad(newData).then( r => {
               this.goToPage(this.currentPage);
            }).catch( e => console.log(e) );
         };
      }
   }

   downloadFile(file: string, type: string, name: string) {
      const byteCharacters = atob(file);
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
         byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      const blob = new Blob([byteArray], { type: type});
      saveAs(blob, name);
   }

   saveDialogResult() {
      if (typeof this.site_imageSelected.id === 'undefined') {
         this.site_imageDataService.post(this.site_imageSelected).then( r => {
            this.toastr.successToastr('Datos guardados satisfactoriamente.', 'Nuevo');
            this.getSiteImages();
         }).catch( e => console.log(e) );
      } else {
         this.site_imageDataService.put(this.site_imageSelected).then( r => {
            this.toastr.successToastr('Registro actualizado satisfactoriamente.', 'Actualizar');
            this.getSiteImages();
         }).catch( e => console.log(e) );
      }
   }

   cancelDialogResult() {
      this.showDialog = false;      this.goToPage(this.currentPage);
   }
}