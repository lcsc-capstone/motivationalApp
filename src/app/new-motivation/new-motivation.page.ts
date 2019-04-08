import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';
import { NativeRingtones } from '@ionic-native/native-ringtones/ngx';

import { Motivation } from '../motivation.interface';
import { StorageService } from '../storage.service';


@Component({
  selector: 'app-new-motivation',
  templateUrl: './new-motivation.page.html',
  styleUrls: ['./new-motivation.page.scss'],
})


export class NewMotivationPage implements OnInit {
	public motivation: Motivation;
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
	ringtonesList: any;
	sound: string;
	constructor(private storage: StorageService, private ringtones: NativeRingtones, private localNotifications: LocalNotifications) { 
		this.motivation = {
			motivation_id: 0,
			name: '',
			remind: '',
			firstDate: '',
			indefToggle: false,
			stopDate: '',
			sound: '',
		}
		this.alarmValue = true;
		this.enableAlarm = false;
		this.nowNum = new Date();
		this.nowHour = new Date((3600000 + Date.now()) - (this.nowNum.getTimezoneOffset() * 60000));
		this.nowDay = new Date(((3600000 * 24) + Date.now()) - (this.nowNum.getTimezoneOffset() * 60000));
		this.nowWeek = new Date((((3600000 * 24) * 7) + Date.now()) - (this.nowNum.getTimezoneOffset() * 60000));
		this.nowMonth =  new Date((((3600000 * 24) * this.getDaysinMonth()) + Date.now()) - (this.nowNum.getTimezoneOffset() * 60000));
		this.now = new Date(Date.now() - (this.nowNum.getTimezoneOffset() * 60000));
		this.ringtones.getRingtone()
			.then(data=> {
					this.ringtonesList = data; 
					console.log(this.ringtonesList);
				}
			).catch(res=> {
				console.log(res);
			}
			) 
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
				break;
			case "clean":
				this.name = "Clean House";
				this.remind = "week";
				this.firstRemind = this.nowWeek.toISOString();
				this.alarmValue = true;
				break;
			case "dishes":
				this.name = "Wash Dishes";
				this.remind = "day";
				this.firstRemind = this.nowDay.toISOString();
				this.alarmValue = true;
				break;
			case "workout":
				this.name = "Go to the Gym";
				this.remind = "day";
				this.firstRemind = this.nowDay.toISOString();
				this.alarmValue = true;
				break;
			case "meeting":
				this.name = "Meeting with Someone";
				this.remind = "month";
				this.firstRemind = this.nowMonth.toISOString();
				this.alarmValue = true;
				break;
			case "med":
				this.name = "Take Medication";
				this.remind = "day";
				this.firstRemind = this.nowDay.toISOString();
				this.alarmValue = true;
				break;
			case "remind":
				this.name = "Set Reminder";
				this.remind = "joke";
				this.firstRemind = this.nowHour.toISOString();
				this.alarmValue = true;
				break;
			case "food":
				this.name = "Eat Something"
				this.remind = "trihour";
				this.firstRemind = this.nowHour.toISOString();
				this.alarmValue = true;
				break;
			case "zzz":
				this.name = "Go to Sleep";
				this.remind = "day";
				this.firstRemind = this.nowDay.toISOString();
				this.alarmValue = true;
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
	addMotivation(){
		var temp = Math.floor(Math.random() * 100000000000000000000);
		this.localNotifications.schedule({
			id: temp,
			text: this.name + ' has been Triggered! Time to do your thing!',
			trigger: {at: new Date(this.firstRemind)},
			led: 'FF0000',
			sound: this.sound
		});

		this.motivation.motivation_id = temp;
		this.motivation.name = this.name;
		this.motivation.remind = this.remind;
		this.motivation.firstDate = this.firstRemind;
		this.motivation.indefToggle = this.alarmValue;
		this.motivation.stopDate = this.lastRemind;
		this.motivation.sound = this.sound;

		this.storage.addMotivation(this.motivation);

		//Instability Fixed! (James)
		/*this.storage.set('name', this.name).then(()=> {
			this.storage.get('name').then((val) => {
				console.log('Name Set ', val);
			});
		});
		this.storage.set('remind', this.remind).then(()=> {
			this.storage.get('remind').then((val) => {
				console.log('Remind Set ', val);
			});
		});
		this.storage.set('firstRemind', this.firstRemind).then(()=> {
			this.storage.get('firstRemind').then((val) => {
				console.log('firstRemind Set ', val);
			});
		});
		this.storage.set('alarmValue', this.alarmValue).then(()=> {
			this.storage.get('alarmValue').then((val) => {
				console.log('alarmValue Set ', val);
			});
		});
		this.storage.set('lastRemind', this.lastRemind).then(()=> {
			this.storage.get('lastRemind').then((val) => {
				console.log('lastRemind Set ', val);
			});
		});(Commented out due to rewriting for storage. (Matt)*/
		this.name = "";
		this.selected = null;
		this.remind = "";
		this.firstRemind = '';
		this.alarmValue = true;
		this.lastRemind = '';
	}
	}
