import { Injectable } from '@angular/core';
import { StorageService } from '../storage.service'
import { Motivation } from '../motivation.interface'
@Injectable({
  providedIn: 'root'
})
export class SettingsService {
	public darkmode:boolean;
	public nukedata:boolean;

	constructor() {
		this.darkmode = false;
		this.nukedata = false;

	}
	switch_darkmode() {
		this.darkmode = !this.darkmode;
		console.log(this.darkmode);
	}
	switch_nukedata(){
		this.nukedata = !this.nukedata;
		console.log(this.nukedata)();
		if (nukedata == true){
			StorageService.clearStorage();
			this.nukedata = !this.nukedata;
		}
	}
}
