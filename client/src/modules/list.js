import {inject} from 'aurelia-framework';
//import {Router} from 'aurelia-router';
import {AuthService} from 'aurelia-auth';
import {Mypics} from '../resources/data/mypics';


@inject(Mypics, AuthService)
export class List {
  constructor(mypics, auth) {
	this.mypics = mypics;
         this.message = 'My Pics List';
         this.auth = auth;
         this.loginError = '';
         this.user = JSON.parse(sessionStorage.getItem('user'));
         this.showList = true;
		 
		 
      
  }
  async activate(){
		await this.mypics.getUserMypics(this.user._id);
	}

  createMypic(){	
		this.mypicObj = {
			mypic: "",
			description: "",
			userId: this.user._id,			
		}
		this.showList = false;		
  	}

    editMypic(mypic){
		this.mypicObj = mypic;
		this. showList = false;
	}
	
  
  async saveMypic(){
		if(this.mypicObj){		
			let response = await this.mypics.save(this.mypicObj);
			if(response.error){
				alert("There was an error posting the pic");
			} else {
				var mypicId = response._id;
	                if(this.filesToUpload && this.filesToUpload.length){
	                    await this.mypics.uploadFile(this.filesToUpload, this.user._id, mypicId);
	                    this.filesToUpload = [];
	                }											
			}
			this.showList = true;
		}
	}

    deleteMypic(mypic){
		this.mypics.deleteMypic(mypic._id);
	}
		
	changeFiles(){
		    this.filesToUpload = new Array(); 
		    this.filesToUpload.push(this.files[0]);
	}
	removeFile(index){
	    this.filesToUpload.splice(index,1);
	}
					

  logout(){
    sessionStorage.removeItem('user');
    this.auth.logout();
}

}

