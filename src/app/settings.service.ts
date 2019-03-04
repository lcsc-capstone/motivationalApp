import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
	public darkmode:boolean;

	constructor() {
		this.darkmode = false;

	}
	switch_darkmode() {
		this.darkmode = !this.darkmode;
		console.log(this.darkmode);
	}
}
