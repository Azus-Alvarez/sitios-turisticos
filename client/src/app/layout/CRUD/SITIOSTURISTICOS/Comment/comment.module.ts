import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommentRoutingModule } from './comment-routing.module';
import { CommentComponent } from './comment.component';
import { CommentService } from './../../../../services/CRUD/SITIOSTURISTICOS/comment.service';
import { environment } from 'src/environments/environment';
import { UserService } from './../../../../services/profile/user.service';
import { SiteService } from './../../../../services/CRUD/SITIOSTURISTICOS/site.service';
import { CKEditorModule } from 'ngx-ckeditor';

@NgModule({
   imports: [CommonModule,
             CommentRoutingModule,
             CKEditorModule,
             FormsModule],
   declarations: [CommentComponent],
   providers: [
               UserService,
               SiteService,
               CommentService
               ]
})
export class CommentModule {}