import { inject } from 'aurelia-framework';
import { DataServices } from './data-services';
@inject(DataServices)
export class Mypics {
    constructor(data) {
        this.data = data;
        this.MYPIC_SERVICE = 'mypics';
        this.GALLERIES_SERVICE = 'galleries';
        this.mypicsArray = [];
    }

    async save(mypic) {
        if (mypic) {
            if (!mypic._id) {
                let response = await this.data.post(mypic, this.MYPIC_SERVICE);
                if (!response.error) {
                    this.mypicsArray.push(response);
                }
                return response;
            } else {
                let response = await this.data.put(mypic, this.GALLERIES_SERVICE + "/" + this.MYPIC_SERVICE + "/" + mypic._id);
                if (!response.error) {
                    // this.updateArray(response);
                }
                return response;
            }
        }
    }

    async uploadFile(files, galleriesId, mypicId) {
        let formData = new FormData();
        files.forEach((item, index) => {
            formData.append("file" + index, item);
        });
        let response = await this.data.uploadFiles(formData, this.MYPIC_SERVICE + "/upload/" + galleriesId + "/" + mypicId);
        return response;
    }

    async getUserMypic(galleriesId) {
        let response = await this.data.get(this.MYPIC_SERVICE + "/gallery/" + galleriesId);
        if (!response.error && !response.message) {
            this.mypicsArray = response;
        }
    }

    async deleteMypic(id) {
        let response = await this.data.delete(this.MYPIC_SERVICE  + "/" + id);
        if (!response.error) {
            for (let i = 0; i < this.mypicsArray.length; i++) {
                if (this.mypicsArray[i]._id === id) {
                    this.mypicsArray.splice(i, 1);
                }
            }
        }
    }

    async saveEdited(mypic) {
        if (mypic) {
            let response = await this.data.put(mypic, this.GALLERIES_SERVICE + "/" + this.MYPIC_SERVICE + "/" + mypic._id);
            if (!response.error) {
                // this.updateArray(response);
            }
            return response;
        }
    }
}