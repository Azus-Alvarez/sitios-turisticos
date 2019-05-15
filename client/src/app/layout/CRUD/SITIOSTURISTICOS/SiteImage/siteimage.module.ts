import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SiteImageRoutingModule } from './siteimage-routing.module';
import { SiteImageComponent } from './siteimage.component';
import { SiteImageService } from './../../../../services/CRUD/SITIOSTURISTICOS/siteimage.service';
import { environment } from 'src/environments/environment';

@NgModule({
   imports: [CommonModule,
             SiteImageRoutingModule,
             FormsModule],
   declarations: [SiteImageComponent],
   providers: [
               SiteImageService
               ]
})
export class SiteImageModule {}