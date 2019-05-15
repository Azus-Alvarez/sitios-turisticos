export class Site {
   id: number;
   name: String;
   description: String;
   location_latitude: number;
   location_longitude: number;
   site_image_id: number;
   constructor() {
      this.location_latitude = 0;
      this.location_longitude = 0;
   }
}