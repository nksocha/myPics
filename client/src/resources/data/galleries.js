import {inject} from 'aurelia-framework';
import {DataServices} from './data-services';


@inject(DataServices)
export class Galleries {

    constructor(data) {
        this.data = data;
        this.GALLERIES_SERVICE = 'galleries';
       this.galleriesArray = [];
}
async getUserGalleries(id){
    let response = await this.data.get(this.GALLERIES_SERVICE + "/user/" + id);
    if(!response.error && !response.message){
        this.GalleriesArray = response;
    }
}


async save(galleries){
        if(galleries){
            if(!galleries._id){
                let response = await this.data.post(galleries, this.GALLERIES_SERVICE);
                if(!response.error){
                    this.galleriesArray.push(response);
                }
                return response;
            } else {
                let response = await this.data.put(galleries, this.GALLERIES_SERVICE + "/" + galleries._id);
                if(!response.error){
                    // this.updateArray(response);
                }
                return response;
            }
        }
}
async uploadFile(files, userId, galleriesId){
            let formData = new FormData();
            files.forEach((item, index) => {
                formData.append("file" + index, item);
            });
        
        let response = await this.data.uploadFiles(formData, this.GALLERIES_SERVICE + "/upload/" + userId + "/" + GalleriesId);
        return response;
    }
    

    async deleteGalleries(id){
		let response = await this.data.delete(this.GALLERIES_SERVICE + "/" + id);
		if(!response.error){
			for(let i = 0; i < this.galleriesArray.length; i++){
				if(this.galleriesArray[i]._id === id){
					this.galleriesArray.splice(i,1);
				}
			}
		}
	}
}