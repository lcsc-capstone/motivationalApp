import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-new-motivation',
  templateUrl: './new-motivation.page.html',
  styleUrls: ['./new-motivation.page.scss'],
})
export class NewMotivationPage implements OnInit {
	now: any; //Get Current date as String
	nowNum: any; //Get Current date
	selected: string; //Current Default Selected
	name: string; //Name of reminder
	remind: string; //How often to remind
	firstRemind: any; //first Date/time for Reminder
	dateHolder: any; //A holder of Dates
	enableAlarm: boolean; //Enables last Date
	constructor() { 
		this.enableAlarm = false;
		this.now = new Date();
		this.nowNum = new Date(3600000);
		this.now = this.now.toString();
	}

	ngOnInit() {}
	stopDateToggle(){ 
		this.enableAlarm = !this.enableAlarm;
	}
	getNow(){
		return this.now.getDate;	
	}
	setDefaults(){
		var e = this.selected;
		console.log(e);
		switch(e){
			case "water":
				this.dateHolder = new Date(this.nowNum.getFullYear(), this.nowNum.getMonth()+1,
				this.nowNum.getDate(), this.nowNum.getHours(), this.nowNum.getMinutes(), this.nowNum.getSeconds(),
				this.nowNum.getMilliseconds());
				
				this.name = "Drink Water";
				this.remind = "hour";
				this.firstRemind = this.nowNum.toISOString();
				console.log(this.firstRemind);
				break;
			case "clean":
				this.name = "Clean House"
				break;
			case "dishes":
				this.name = "Wash Dishes"
				break;
			case "workout":
				this.name = "Go to the Gym"
				break;
			case "meeting":
				this.name = "Meeting with Someone"
				break;
			case "med":
				this.name = "Take Medication"
				break;
			case "remind":
				this.name = "Set Reminder"
				break;
			case "food":
				this.name = "Eat Something"
				break;
			case "zzz":
				this.name = "Go to Sleep"
				break;
		}
				
		}
	}
