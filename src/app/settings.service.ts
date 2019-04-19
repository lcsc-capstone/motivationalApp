import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';
import { Motivation } from './motivation.interface';
@Injectable({
  providedIn: 'root'
})
export class SettingsService {
	public darkmode:boolean;
	public nukedata:boolean;

	constructor(private storage: StorageService) {
		this.darkmode = false;
		this.nukedata = false;

	}
	//This switches the app to dark mode. James' front page is gonna make this a bitch.
	switch_darkmode() {
		this.darkmode = !this.darkmode;
		console.log(this.darkmode);
	}
	//This deletes storage. If it's broke, it is Matt's fault.
	switch_nukedata(){
		this.nukedata = !this.nukedata;
		console.log(this.nukedata);
		if (this.nukedata == true){
			this.storage.clearStorage();
			this.nukedata = !this.nukedata;
		}
	}
}
