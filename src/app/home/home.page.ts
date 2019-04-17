import { Component,  OnInit } from '@angular/core';
import {MenuController, LoadingController} from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StorageService } from '../storage.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{
	motivations: any; //Used to grab the motivations
	active: boolean; //Used to change Background
	backgroundPic: String;
	interval: any;
	isLoading: boolean;
	constructor(public menuCtrl: MenuController, public getStore: StorageService, public loadingCtr: LoadingController, public splashScreen: SplashScreen) {
		this.motivations = getStore.getAllStoredMotivations();
	}
	toggleMenu(){
		this.menuCtrl.toggle();
	}
	
	ngOnInit() {} //Clock seems to keep running after being Clicked off of
	ionViewWillEnter(){
		this.presentLoader();
		this.showTime(); 
		this.dismissLoader();
		}
	showTime(){
			this.active = true;
			this.backgroundPic = "./assets/Sunset.png";
			var date = new Date();
			var h = date.getHours(); // 0 - 23
			var m = date.getMinutes(); // 0 - 59
			var session = "AM";
			var hs;
			var ms;
			if ((h >= 20)||(h <= 8)){
				this.active = false; 
				this.backgroundPic = "./assets/Night.png";
			}

			if(h >= 12){
				if(h != 12){
					h = h - 12;
				}
				session = "PM";
			}
			if(h == 0){
				h = 12;
			}
			hs = h.toString();
			if(m < 10){ 
				ms = "0" + m.toString();
			} else {
				ms = m.toString();
			}			
			var time = hs + ":" + ms + " " + session;
			document.getElementById("MyClockDisplay").textContent = time;
			this.interval = setInterval(this.showTime, 1000);
		}
	showTimeMil(){
		this.active = true;
		this.backgroundPic = "./assets/Sunset.png";
		var date = new Date();
		var h = date.getHours(); // 0 - 23
		var m = date.getMinutes(); // 0 - 59
		var hs;
		var ms;
		hs = h.toString();
		if(m < 10){ 
			ms = "0" + m.toString();
		} else {
			ms = m.toString();
		}			
		var time = hs + ":" + ms;
		//document.getElementById("MyClockDisplay").innerText = time; Seems to cause Errors
		document.getElementById("MyClockDisplay").textContent = time;
		if ((h >= 20)||(h <= 8)){
			this.active = false; 
			this.backgroundPic = "./assets/Night.png";
		}
		this.interval = setInterval(this.showTime, 1000);
			
	}
	ionViewWillLeave(){
		clearInterval(this.interval);
	}
	getBackground(){
			if (this.active == false){ //"this.active == false" is the way it's Supposed to go, if it is ever "this.active != false", it for testing purposes ONLY!
				return "Night";
			} else {
				return "Day";
			}
	}
	getActive(){
		return this.active; //Should return this.active, !this.active is for testing
	}
	async presentLoader(){
		this.isLoading = true;
		return await this.loadingCtr.create({
			duration: 1500
		}).then(loader => {
			loader.present().then( ( ) => {
				if(!this.isLoading){
					loader.dismiss();
				}
			})
		})
		
	}
	async dismissLoader(){
		this.isLoading = false;
		return await this.loadingCtr.dismiss();
	}

}
