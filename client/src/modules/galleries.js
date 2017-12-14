import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {Galleries} from '../resources/data/galleries';
import { AuthService } from 'aurelia-auth';

@inject(Router, Galleries, AuthService)
export class GalleriesList {
  constructor(router, galleries, auth) {
    this.galleries = galleries;
    this.router = router;
    this.auth = auth;
    this.user = JSON.parse(sessionStorage.getItem('user'));
    this.title = "These are you galleries!";
    this.showGalleries = true;
      }

  logout() {
    sessionStorage.removeItem('user');
    this.auth.logout();
    this.router.navigate('home');
  }

  createGalleries() {
    this.galleriesObj = {
      galleries: '',
      description: '',
      userId: this.user._id,
    };
    this.showGalleries = false;
  }
 
  async saveGalleries() {
    if (this.galleriesObj) {
      let response = await this.galleries.save(this.galleriesObj);
      if (response.error) {
        alert('There was an error creating the Galleries');
      } else {
              }
    }
    this.showGalleries = true;
  }
  async activate() {
    await this.galleries.getUserGalleries(this.user._id);
  }
  editGalleries(galleries) {
    this.galleriesObj = galleries;
    this.showGalleries = false;
    
  }
  deleteGalleries(galleries) {
    this.galleries.deleteGalleries(galleries._id);
  }

  back() {
    this.showGalleries = true;
  }
  showGalleriesOrAdd(galleries) {  
    sessionStorage.setItem("galleries", JSON.stringify(galleries));
      this.router.navigate('list');   
    };
 
}

