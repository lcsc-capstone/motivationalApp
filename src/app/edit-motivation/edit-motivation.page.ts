import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';

import { NativeRingtones } from '@ionic-native/native-ringtones/ngx';
import { LocalNotifications, ELocalNotificationTriggerUnit, ILocalNotificationActionType, ILocalNotification } from '@ionic-native/local-notifications/ngx';
import { Motivation } from '../motivation.interface';
import { Router } from '@angular/router';
import { StorageService } from '../storage.service';
import { ActivatedRoute } from '@angular/router';
import { Platform } from '@ionic/angular';


@Component({
  selector: 'app-edit-motivation',
  templateUrl: './edit-motivation.page.html',
  styleUrls: ['./edit-motivation.page.scss'],
})


export class EditMotivationPage implements OnInit {
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
	currentMot: any;
	sound: string;
	indefToggle: boolean;
	firstDate: string;
	stopDate: any;
	constructor(private storage: StorageService, private ringtones: NativeRingtones, public route: ActivatedRoute, public router: Router,private localNotifications: LocalNotifications,private plt: Platform) {

		this.motivation = {
			motivation_id: 0,
			name: '',
			remind: '',
			firstDate: '',
			indefToggle: false,
			stopDate: '',
			sound: '',
		}


		
		this.plt.ready().then(() => {
			this.localNotifications.on('trigger').subscribe(res => {
				//this.showAlert(res.title, res.text);
			});
			this.localNotifications.on('cancel');
		});
		/*this.storage.getAllStoredMotivations().then(data => {
			let id = this.route.snapshot.paramMap.get("id");
			var temp = parseInt(id,10);
			this.currentMot = this.storage.findMotivation(temp);
			this.name = this.currentMot.name;
			//this.currentMot = this.storage.findMotivation(temp);
			//this.name = this.currentMot.name;
			console.log(this.currentMot);
		});*/
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

	ionViewWillEnter(){
		this.storage.getAllStoredMotivations().then(data => {
			let id = this.route.snapshot.paramMap.get("id");
			var currentid = parseInt(id,10);
			this.currentMot = data;
			this.currentMot = this.findMotivation(this.currentMot,currentid);
			//console.log(this.currentMot);
			this.name = this.currentMot.name;
			this.remind = this.currentMot.remind;
			this.firstDate = this.currentMot.firstDate;
			this.indefToggle = this.currentMot.indefToggle;
			this.stopDate= this.currentMot.stopDate;
			this.sound = this.currentMot.sound;
			console.log(typeof this.currentMot);

			
		});
	}
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

	EditMotivation(){
		/*this.storage.getAllStoredMotivations().then(data => {

		});*/
			this.currentMot.name = this.name;
			this.currentMot.remind = this.remind;
			console.log(this.firstDate);
			this.currentMot.firstDate = this.firstDate;
			
			this.currentMot.indefToggle = this.enableAlarm;
			if(this.currentMot.indefToggle == true)
				this.currentMot.stopDate = '';
			else
				this.currentMot.stopDate = this.stopDate;
			this.currentMot.sound = ''; //till we get sound working, temp value of nothing. (Matt)
			console.log(this.currentMot);
			this.storage.editMotivation(this.currentMot);
			this.localNotifications.cancel(this.currentMot.motivation_id);
			this.localNotifications.schedule({			
						id: this.currentMot.motivation_id,
						title: this.name + " Alert!",
						text: this.name + ' has been Triggered! Time to do your thing!',
						trigger: {at: new Date(this.currentMot.firstDate)},
						led: 'FF0000',
						sound: this.sound,
						foreground: true
					});
			this.router.navigate(['/detail']);

	}

	findMotivation(data,currentid){
		if(data){
				for(var i = 0; i < data.length; i++){
					if( currentid == data[i].motivation_id){
						return data[i];
					}
				}
			}
	}
	/*addMotivation(){
		var temp = Math.floor(Math.random() * 100000000000000000000);
		this.motivation.motivation_id = temp;
		this.motivation.name = this.name;
		this.motivation.remind = this.remind;
		this.motivation.firstDate = this.firstRemind;
		this.motivation.indefToggle = this.alarmValue;
		this.motivation.stopDate = this.lastRemind;
		this.motivation.sound = ''; //till we get sound working, temp value of nothing. (Matt)

		this.storage.addMotivation(this.motivation);

		this.name = "";
		this.selected = null;
		this.remind = "";
		this.firstRemind = '';
		this.alarmValue = true;
		this.lastRemind = '';
	}*/
	}
