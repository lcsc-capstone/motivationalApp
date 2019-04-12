import{Storage} from '@ionic/storage';
import{Motivation} from './motivation.interface';
import{Injectable} from '@angular/core';

const STORAGE_KEY = "StoredMotivations";

@Injectable({
	providedIn: 'root'
})

export class StorageService {

	constructor(public storage: Storage) {}

	getAllStoredMotivations(){
		console.log(this.storage.get(STORAGE_KEY));
		return this.storage.get(STORAGE_KEY);
	}

	addMotivation( motivation: Motivation ){
		return this.getAllStoredMotivations().then(data => {
			if(data){
				data.push(motivation);
				return this.storage.set(STORAGE_KEY, data);
			}else{
				return this.storage.set(STORAGE_KEY, [motivation]);
			}
		});
	}


	removeMotivation( motivation: Motivation){
		return this.getAllStoredMotivations().then(data => {
			if(data){
				let index = data.indexOf(motivation);
				data.splice(index,1);
				return this.storage.set(STORAGE_KEY, data);
			}
		});
	}

	findMotivation( motivid: Number ){
		return this.getAllStoredMotivations().then(data => {
			if(data){
				for(var i = 0; i < data.length; i++){
					if(motivid = data[i].motivation_id)
					return data[i];
				}
			}
		});
	}

	clearStorage(){
		return this.storage.clear();
	}

}
