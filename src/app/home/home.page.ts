import { Component,  OnInit } from '@angular/core';
import {MenuController} from '@ionic/angular';
import { StorageService } from '../storage.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{
	motivations: any; //Used to grab the motivations
	constructor(public menuCtrl: MenuController, public getStore: StorageService) {
		this.motivations = getStore.getAllStoredMotivations();
	}
	toggleMenu(){
		this.menuCtrl.toggle();
	}
	ngOnInit() {this.showTime();}
	showTime(){
			var date = new Date();
			var h = date.getHours(); // 0 - 23
			var m = date.getMinutes(); // 0 - 59
			var session = "AM";
			var hs;
			var ms;

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
			document.getElementById("MyClockDisplay").innerText = time;
			document.getElementById("MyClockDisplay").textContent = time;
			
			setInterval(this.showTime, 1000);
			
		}

}
