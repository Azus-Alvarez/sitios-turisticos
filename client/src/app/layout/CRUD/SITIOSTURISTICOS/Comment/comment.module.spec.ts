import { CommentModule } from './comment.module';

describe('CommentModule', () => {
   let blackPageModule: CommentModule;

   beforeEach(() => {
      blackPageModule = new CommentModule();   });

   it('should create an instance', () => {
      expect(blackPageModule).toBeTruthy();
   });
});