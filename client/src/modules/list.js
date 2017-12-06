import {inject} from 'aurelia-framework';
//import {Router} from 'aurelia-router';
import {AuthService} from 'aurelia-auth';
import {mypics} from '../resources/data/mypics';


@inject(mypics, AuthService)
export class List {
  constructor(mypics, auth) {
	this.mypics = mypics;
         this.message = 'List';
         this.auth = auth;
         this.loginError = '';
         this.user = JSON.parse(sessionStorage.getItem('user'));
         this.showList = true;
		 
		 
      
  }
  async activate(){
		await this.mypics.getUsermypics(this.user._id);
	}

  createmypic(){	
		this.mypicObj = {
			mypic: "",
			description: "",
			dateDue: new Date(),
			userid: this.user._id,
			priority: this.priorities[0]
		}
		this.showList = false;		
  	}

    editmypic(mypic){
		this.mypicObj = mypic;
		this. showList = false;
	}
	
  
  async savemypic(){
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

    deletemypic(mypic){
		this.mypics.deletemypic(mypic._id);
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

