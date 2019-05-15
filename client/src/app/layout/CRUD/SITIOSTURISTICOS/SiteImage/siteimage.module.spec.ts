import { SiteImageModule } from './siteimage.module';

describe('SiteImageModule', () => {
   let blackPageModule: SiteImageModule;

   beforeEach(() => {
      blackPageModule = new SiteImageModule();   });

   it('should create an instance', () => {
      expect(blackPageModule).toBeTruthy();
   });
});