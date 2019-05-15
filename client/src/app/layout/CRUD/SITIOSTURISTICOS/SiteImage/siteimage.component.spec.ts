import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SiteImageComponent } from './siteimage.component';

describe('SiteImageComponent', () => {
   let component: SiteImageComponent;
   let fixture: ComponentFixture<SiteImageComponent>;

   beforeEach(async(() => {
      TestBed.configureTestingModule({
         declarations: [SiteImageComponent]
      }).compileComponents();
   }));

   beforeEach(() => {
      fixture = TestBed.createComponent(SiteImageComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
   });

   it('should create', () => {
      expect(component).toBeTruthy();
   });
});