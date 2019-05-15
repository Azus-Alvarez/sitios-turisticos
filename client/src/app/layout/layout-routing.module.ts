import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout.component';

const routes: Routes = [
   {
      path: '',
      component: LayoutComponent,
      children: [
         {
            path: '',
            redirectTo: 'main'
         },
         {
            path: 'main',
            loadChildren: './main/main.module#MainModule'
         },
         {
            path: 'profile',
            loadChildren: './profile/profile.module#ProfileModule'
         },

         //SITIOSTURISTICOS

         {
            path: 'site_image',
            loadChildren: './CRUD/SITIOSTURISTICOS/SiteImage/siteimage.module#SiteImageModule'
         },
         {
            path: 'site',
            loadChildren: './CRUD/SITIOSTURISTICOS/Site/site.module#SiteModule'
         },
         {
            path: 'comment',
            loadChildren: './CRUD/SITIOSTURISTICOS/Comment/comment.module#CommentModule'
         },
         {
            path: 'blank',
            loadChildren: './blank-page/blank-page.module#BlankPageModule'
         },
         {
            path: 'not-found',
            loadChildren: './not-found/not-found.module#NotFoundModule'
         },
         {
            path: '**',
            redirectTo: 'not-found'
         }
      ]
   }
];

@NgModule({
   imports: [RouterModule.forChild(routes)],
   exports: [RouterModule]
})
export class LayoutRoutingModule {}