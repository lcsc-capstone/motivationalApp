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
        return this.storage.get(STORAGE_KEY);
    }
}