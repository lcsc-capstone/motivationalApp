import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-new-motivation',
  templateUrl: './new-motivation.page.html',
  styleUrls: ['./new-motivation.page.scss'],
})


export class NewMotivationPage implements OnInit {
	now: any; //Get Current date
	nowNum: any; //Enabler for Current Date
	nowHour: any; //get Current date an Hour from now
	nowDay: any; //get Current date a day from now
	nowWeek: any; //get Current date a Week from now
	nowMonth: any //get Current date a Month from now
	selected: string; //Current Default Selected
	name: string; //Name of reminder
	remind: string; //How often to remind
	firstRemind: any; //first Date/time for Reminder
	enableAlarm: boolean; //Enables last Date
	alarmValue: boolean; //Value of Switch
	lastRemind: any; //last Date/time for Reminder
	constructor(private storage: Storage) { 
		this.alarmValue = true;
		this.enableAlarm = false;
		this.nowNum = new Date();
		this.nowHour = new Date((3600000 + Date.now()) - (this.nowNum.getTimezoneOffset() * 60000)); 
		this.nowDay = new Date(((3600000 * 24) + Date.now()) - (this.nowNum.getTimezoneOffset() * 60000)); 
		this.nowWeek = new Date((((3600000 * 24) * 7) + Date.now()) - (this.nowNum.getTimezoneOffset() * 60000));
		this.nowMonth =  new Date((((3600000 * 24) * this.getDaysinMonth()) + Date.now()) - (this.nowNum.getTimezoneOffset() * 60000));
		this.now = new Date(Date.now() - (this.nowNum.getTimezoneOffset() * 60000));
	}
	
	ngOnInit() {}
	stopDateToggle(){ 
		this.enableAlarm = !this.enableAlarm;
	}
	getNow(){
		var x = new Date(Date.now() - (this.nowNum.getTimezoneOffset() * 60000))
		return x.toISOString();	
	}
	setDefaults(){
		var e = this.selected;
		switch(e){
			case "water":				
				this.name = "Drink Water";
				this.remind = "hour";
				this.firstRemind = this.nowHour.toISOString();
				this.alarmValue = true;
				console.log(this.firstRemind);
				break;
			case "clean":
				this.name = "Clean House";
				this.remind = "week";
				this.firstRemind = this.nowWeek.toISOString();
				this.alarmValue = true;
				console.log(this.firstRemind);
				break;
			case "dishes":
				this.name = "Wash Dishes";
				this.remind = "day";
				this.firstRemind = this.nowDay.toISOString();
				this.alarmValue = true;
				console.log(this.firstRemind);
				break;
			case "workout":
				this.name = "Go to the Gym";
				this.remind = "day";
				this.firstRemind = this.nowDay.toISOString();
				this.alarmValue = true;
				console.log(this.firstRemind);
				break;
			case "meeting":
				this.name = "Meeting with Someone";
				this.remind = "month";
				this.firstRemind = this.nowMonth.toISOString();
				this.alarmValue = true;
				console.log(this.firstRemind);
				break;
			case "med":
				this.name = "Take Medication";
				this.remind = "day";
				this.firstRemind = this.nowDay.toISOString();
				this.alarmValue = true;
				console.log(this.firstRemind);
				break;
			case "remind":
				this.name = "Set Reminder";
				this.remind = "joke";
				this.firstRemind = this.nowHour.toISOString();
				this.alarmValue = true;
				console.log(this.firstRemind);
				break;
			case "food":
				this.name = "Eat Something"
				this.remind = "trihour";
				this.firstRemind = this.nowHour.toISOString();
				this.alarmValue = true;
				console.log(this.firstRemind);
				break;
			case "zzz":
				this.name = "Go to Sleep";
				this.remind = "day";
				this.firstRemind = this.nowDay.toISOString();
				this.alarmValue = true;
				console.log(this.firstRemind);
				break;
			case "hw":
				this.name = "Homework Assignment";
				this.remind = "day";
				this.firstRemind = this.nowDay.toISOString();
				this.alarmValue = false;
				this.lastRemind = this.nowMonth.toISOString();
				break;
		}
				
		}
	getDaysinMonth() {
		var today = new Date();
		var month = today.getMonth();
		return this.daysInMonth(month + 1, today.getFullYear());
	}

	daysInMonth(month,year) {
		return new Date(year, month, 0).getDate();
	}
	fillForm(){
		console.log(document.getElementById("name").value + ", " + document.getElementById("remind").value + ", " + document.getElementById("firstRemind").value + ", " + document.getElementById("alarmValue").checked + ", " + document.getElementById("lastRemind").value);
		//This may be unstable. If it breaks, it's not my fault. Blame someone else... (James)
		//Except it is James' fault, we just don't know why it works. (Matt)
		this.storage.set('name', document.getElementById("name").value)
		
		this.name = "";
		this.selected = null;
		this.remind = "";
		this.firstRemind = undefined;
		this.alarmValue = true;
		this.lastRemind = undefined;
		this.storage.get('name').then((val) => {
			console.log('motivation name is ', val);
		});
	}
	}
