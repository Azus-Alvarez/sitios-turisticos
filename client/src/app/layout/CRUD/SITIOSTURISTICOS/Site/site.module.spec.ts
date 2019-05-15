import { SiteModule } from './site.module';

describe('SiteModule', () => {
   let blackPageModule: SiteModule;

   beforeEach(() => {
      blackPageModule = new SiteModule();   });

   it('should create an instance', () => {
      expect(blackPageModule).toBeTruthy();
   });
});