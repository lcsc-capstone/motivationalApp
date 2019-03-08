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

}
