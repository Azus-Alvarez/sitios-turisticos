import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './main.component';
import { environment } from 'src/environments/environment';
import { AgmCoreModule } from '@agm/core';

@NgModule({
    imports: [CommonModule,
        MainRoutingModule,
        AgmCoreModule.forRoot({apiKey: environment.gmapapiKey})
    ],
    declarations: [MainComponent]
})
export class MainModule {}
