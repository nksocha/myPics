import {inject} from 'aurelia-framework';
import {DataServices} from './data-services';


@inject(DataServices)
export class Mypics {

    constructor(data) {
        this.data = data;
        this.MYPICS_SERVICE = 'mypics';
       this.mypicsArray = [];
}
async getUserMypics(id){
    let response = await this.data.get(this.MYPICS_SERVICE + "/user/" + id);
    if(!response.error && !response.message){
        this.mypicsArray = response;
    }
}


async save(mypic){
        if(mypic){
            if(!mypic._id){
                let response = await this.data.post(mypic, this.MYPICS_SERVICE);
                if(!response.error){
                    this.mypicsArray.push(response);
                }
                return response;
            } else {
                let response = await this.data.put(mypic, this.MYPICS_SERVICE + "/" + mypic._id);
                if(!response.error){
                    // this.updateArray(response);
                }
                return response;
            }
        }
}
async uploadFile(files, userId, mypicId){
            let formData = new FormData();
            files.forEach((item, index) => {
                formData.append("file" + index, item);
            });
        
        let response = await this.data.uploadFiles(formData, this.MYPICS_SERVICE + "/upload/" + userId + "/" + mypicId);
        return response;
    }
    

    async deleteMypic(id){
		let response = await this.data.delete(this.MYPICS_SERVICE + "/" + id);
		if(!response.error){
			for(let i = 0; i < this.mypicsArray.length; i++){
				if(this.mypicsArray[i]._id === id){
					this.mypicsArray.splice(i,1);
				}
			}
		}
	}
}