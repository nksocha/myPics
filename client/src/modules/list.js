import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {Mypics} from '../resources/data/mypics';
import { AuthService } from 'aurelia-auth';

@inject(Router, Mypics, AuthService)
export class MypicGalleries {
  constructor(router, mypic, auth) {
    this.mypic = mypic;
    this.router = router;
    this.auth = auth;
    this.galleries = JSON.parse(sessionStorage.getItem('galleries'));
    this.editMypic2 = JSON.parse(sessionStorage.getItem('mypic'));
    this.user = JSON.parse(sessionStorage.getItem('user'));
    this.showMypics = true;
  }

  async saveMypic() {
    if (this.mypicsObj) {
      let response = await this.mypic.save(this.mypicsObj);
      if (response.error) {
        alert('There was an error uploading the Photo');
      } else {
        var mypicId = response._id;
        // var galleriesId = response.galleriesId;
        if (this.filesToUpload && this.filesToUpload.length) {
          await this.mypic.uploadFile(this.filesToUpload, this.galleries._id,  mypicId);
          this.filesToUpload = [];
        }
      }
    }

    this.showMypics = true;
  }

  createMypic() {
    this.mypicsObj = {
      mypic: '',
      description: '',
      userId: this.user._id,
      galleryId: this.galleries._id
    };
    this.showMypics = false;
  }

  async activate() {
    await this.mypic.getUserMypic(this.galleries._id);
  }
  changeFiles() {
    this.filesToUpload = new Array();
    this.filesToUpload.push(this.files[0]);
  }
  removeFile(index) {
    this.filesToUpload.splice(index, 1);
  }

  deleteMypic(mypic) {
      this.mypic.deleteMypic(mypic._id);
  }

  editMypic2(mypic) {
    this.mypicObj2 = mypic;
    this.showMypics = false;
  }

  async saveEditedMypic() {
    if (this.mypicObj2) {
      let response = await this.mypic.saveEdited(this.mypicObj2);
      if (response.error) {
        alert('There was an error updating the photo details');
      } else {
              }
    }
    this.showMypics = true;
  }
  back() {
    this.router.navigate('galleries');
  }

  back2() {
    this.showMypics = true;
  }
}
