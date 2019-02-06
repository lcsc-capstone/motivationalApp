import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-new-motivation',
  templateUrl: './new-motivation.page.html',
  styleUrls: ['./new-motivation.page.scss'],
})
export class NewMotivationPage implements OnInit {
	enableAlarm: boolean;
	now: any;
	constructor() { 
		this.enableAlarm = false;
		this.now = new Date();
		this.now = this.now.toString();
	}

	ngOnInit() {}
	stopDateToggle(){ 
		this.enableAlarm = !this.enableAlarm;
	}
	getNow(){
		return this.now.getDate;	
	}
/*	setDefaults(){
		var e = document.getElementById("defaults");
		switch(e.value){
			case "water":
				break;
			case "clean":
				break;
			case "dishes":
				break;
			case "workout":
				break;
			case "meeting":
				break;
			case "med":
				break;
			case "remind":
				break;
			case "food":
				break;
			case "zzz":
				break;
		}
				
		}*/
	}
