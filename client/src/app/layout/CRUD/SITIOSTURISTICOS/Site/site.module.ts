import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SiteRoutingModule } from './site-routing.module';
import { SiteComponent } from './site.component';
import { SiteService } from './../../../../services/CRUD/SITIOSTURISTICOS/site.service';
import { environment } from 'src/environments/environment';
import { AgmCoreModule } from '@agm/core';
import { SiteImageService } from './../../../../services/CRUD/SITIOSTURISTICOS/siteimage.service';
import { CKEditorModule } from 'ngx-ckeditor';

@NgModule({
   imports: [CommonModule,
             SiteRoutingModule,
             CKEditorModule,
             AgmCoreModule.forRoot({apiKey: environment.gmapapiKey}),
             FormsModule],
   declarations: [SiteComponent],
   providers: [
               SiteImageService,
               SiteService
               ]
})
export class SiteModule {}