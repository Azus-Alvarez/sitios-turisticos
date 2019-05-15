import { Component, OnInit } from '@angular/core';
import { ToastrManager } from 'ng6-toastr-notifications';
import { saveAs } from 'file-saver/FileSaver';
import { CommentService } from './../../../../services/CRUD/SITIOSTURISTICOS/comment.service';
import { Comment } from './../../../../models/SITIOSTURISTICOS/Comment';
import { UserService } from './../../../../services/profile/user.service';
import { User } from './../../../../models/profile/User';

import { SiteService } from './../../../../services/CRUD/SITIOSTURISTICOS/site.service';
import { Site } from './../../../../models/SITIOSTURISTICOS/Site';


@Component({
   selector: 'app-comment',
   templateUrl: './comment.component.html',
   styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit {
   comments: Comment[] = [];
   commentSelected: Comment = new Comment();

   currentPage = 1;
   lastPage = 1;
   showDialog = false;
   recordsByPage = 5;
   users: User[] = [];
   sites: Site[] = [];
   constructor(
               private toastr: ToastrManager,
               private userDataService: UserService,
               private siteDataService: SiteService,
               private commentDataService: CommentService) {}

   ngOnInit() {
      this.goToPage(1);
      this.getUser();
      this.getSite();
   }

   selectComment(comment: Comment) {
      this.commentSelected = comment;
   }

   getUser() {
      this.users = [];
      this.userDataService.get().then( r => {
         this.users = r as User[];
      }).catch( e => console.log(e) );
   }

   getSite() {
      this.sites = [];
      this.siteDataService.get().then( r => {
         this.sites = r as Site[];
      }).catch( e => console.log(e) );
   }

   goToPage(page: number) {
      if ( page < 1 || page > this.lastPage ) {
         this.toastr.errorToastr('La página solicitada no existe.', 'Error');
         return;
      }
      this.currentPage = page;
      this.getComments();
   }

   getComments() {
      this.comments = [];
      this.commentSelected = new Comment();
      this.commentSelected.user_id = 0;
      this.commentSelected.site_id = 0;
      this.commentDataService.get_paginate(this.recordsByPage, this.currentPage).then( r => {
         this.comments = r.data as Comment[];
         this.lastPage = r.last_page;
      }).catch( e => console.log(e) );
   }

   newComment(content) {
      this.commentSelected = new Comment();
      this.commentSelected.user_id = 0;
      this.commentSelected.site_id = 0;
      this.showDialog = true;
   }

   editComment(content) {
      if (typeof this.commentSelected.id === 'undefined') {
         this.toastr.errorToastr('Debe seleccionar un registro.', 'Error');
         return;
      }
      this.showDialog = true;
   }

   deleteComment() {
      if (typeof this.commentSelected.id === 'undefined') {
         this.toastr.errorToastr('Debe seleccionar un registro.', 'Error');
         return;
      }
      this.commentDataService.delete(this.commentSelected.id).then( r => {
         this.toastr.successToastr('Registro Borrado satisfactoriamente.', 'Borrar');
         this.getComments();
      }).catch( e => console.log(e) );
   }

   backup() {
      this.commentDataService.getBackUp().then( r => {
         const backupData = r;
         const blob = new Blob([JSON.stringify(backupData)], { type: 'text/plain' });
         const fecha = new Date();
         saveAs(blob, fecha.toLocaleDateString() + '_Comments.json');
      }).catch( e => console.log(e) );
   }

   toCSV() {
      this.commentDataService.get().then( r => {
         const backupData = r as Comment[];
         let output = 'id;content;moment;calification;approval;user_id;site_id\n';
         backupData.forEach(element => {
            output += element.id; + element.content + ';' + element.moment + ';' + element.calification + ';' + element.approval + ';' + element.user_id + ';' + element.site_id + '\n';
         });
         const blob = new Blob([output], { type: 'text/plain' });
         const fecha = new Date();
         saveAs(blob, fecha.toLocaleDateString() + '_Comments.csv');
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
            this.commentDataService.masiveLoad(newData).then( r => {
               this.goToPage(this.currentPage);
            }).catch( e => console.log(e) );
         };
      }
   }

   saveDialogResult() {
      if (typeof this.commentSelected.id === 'undefined') {
         this.commentDataService.post(this.commentSelected).then( r => {
            this.toastr.successToastr('Datos guardados satisfactoriamente.', 'Nuevo');
            this.getComments();
         }).catch( e => console.log(e) );
      } else {
         this.commentDataService.put(this.commentSelected).then( r => {
            this.toastr.successToastr('Registro actualizado satisfactoriamente.', 'Actualizar');
            this.getComments();
         }).catch( e => console.log(e) );
      }
   }

   cancelDialogResult() {
      this.showDialog = false;      this.goToPage(this.currentPage);
   }
}