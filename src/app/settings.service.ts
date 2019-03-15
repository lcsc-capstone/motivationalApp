import { Injectable } from '@angular/core';

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
		console.log(this.nukedata);
	}
}
