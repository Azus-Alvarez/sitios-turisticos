import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SiteImageComponent } from './siteimage.component';

const routes: Routes = [
   {
      path: '',
      component: SiteImageComponent
   }
];

@NgModule({
   imports: [RouterModule.forChild(routes)],
   exports: [RouterModule]
})
export class SiteImageRoutingModule {}
