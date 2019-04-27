import{Storage} from '@ionic/storage';
import{Motivation} from './motivation.interface';
import{Injectable} from '@angular/core';
import { LocalNotifications, ELocalNotificationTriggerUnit, ILocalNotificationActionType, ILocalNotification } from '@ionic-native/local-notifications/ngx'; //For Motivations
import {Platform} from '@ionic/angular';

const STORAGE_KEY = "StoredMotivations";

@Injectable({
	providedIn: 'root'
})

export class StorageService {
	interval: any;
	constructor(public storage: Storage, private localNotifications: LocalNotifications, private plt: Platform) {
		/*this.plt.ready().then(() => {
			this.localNotifications.on('trigger').subscribe(res => {
				this.repeatMotivation();
			});
		}); 
		//Currently Broken
		*/
	}

	getAllStoredMotivations(){
		console.log(this.storage.get(STORAGE_KEY));
		console.log(Object.keys(this.storage.get(STORAGE_KEY)));
		return this.storage.get(STORAGE_KEY);
	}

	addMotivation( motivation: Motivation ){
		return this.getAllStoredMotivations().then(data => {
			if(data){
				data.push(motivation);
				return this.storage.set(STORAGE_KEY, data);
			}else{
				return this.storage.set(STORAGE_KEY, [motivation]);
			}
		});
	}


	removeMotivation( motivation: Motivation){
		return this.getAllStoredMotivations().then(data => {
			if(data){
				let index = data.indexOf(motivation);
				data.splice(index,1);
				return this.storage.set(STORAGE_KEY, data);
			}
		});
	}

	findMotivation( motivid: Number ){
		return this.getAllStoredMotivations().then(data => {
			if(data){
				for(var i = 0; i < data.length; i++){
					if(motivid == data[i].motivation_id){
						let m: Motivation = {
							name: data[i].name,
							motivation_id: data[i].motivation_id,
							remind: data[i].remind,
							firstDate: data[i].firstDate,
							indefToggle: data[i].indefToggle,
							stopDate: data[i].stopDate,
							sound: data[i].sound
						}
						return m;
					}
					/*if(motivid = data[i].motivation_id)
					return data[i];*/

				}
			}
		});
	}

	clearStorage(){
		return this.storage.clear();
	}
	// Idea for code to get Recurring Motivations Working. Currently Broken (James)
	/*daysInMonth(month,year) {
		return new Date(year, month, 0).getDate();
	}
	
	repeatMotivation(){
		var newDate;
		this.getAllStoredMotivations().then(data => {
			for (var i = 0; i < data.length; i++){
				if(new Date(data[i].firstDate) <= Date.now()){
					//make variable for new time
					switch(data[i].remind){ //beginning of switch statement Errors:
					//[ng] ERROR in src/app/storage.service.ts(119,95): error TS1005: ';' expected.
					//[ng] src/app/storage.service.ts(122,7): error TS1068: Unexpected token. A constructor, method, accessor, or property was expected.
					//[ng] src/app/storage.service.ts(124,21): error TS1005: ',' expected.
					//[ng] src/app/storage.service.ts(124,31): error TS1005: ',' expected.
					//[ng] src/app/storage.service.ts(124,61): error TS1005: ';' expected.
					//[ng] src/app/storage.service.ts(128,7): error TS1128: Declaration or statement expected.
					//[ng] src/app/storage.service.ts(128,18): error TS1005: ';' expected.
					//[ng] src/app/storage.service.ts(131,7): error TS1128: Declaration or statement expected.
					//[ng] src/app/storage.service.ts(131,14): error TS1128: Declaration or statement expected.
					//[ng] src/app/storage.service.ts(133,6): error TS1128: Declaration or statement expected.
					//[ng] src/app/storage.service.ts(181,5): error TS1128: Declaration or statement expected.
					//[ng] src/app/storage.service.ts(182,4): error TS1128: Declaration or statement expected.
					//[ng] src/app/storage.service.ts(183,3): error TS1128: Declaration or statement expected.
					//[ng] src/app/storage.service.ts(184,2): error TS1128: Declaration or statement expected.
					//[ng] src/app/storage.service.ts(185,27): error TS1005: ',' expected.
					//[ng] src/app/storage.service.ts(185,40): error TS1005: ';' expected.
					//[ng] src/app/storage.service.ts(198,1): error TS1128: Declaration or statement expected.
						case "month":
							newDate = new Date((((3600000 * 24) * this.getDaysinMonth()) + Date.now()) - ((new Date()).getTimezoneOffset() * 60000));
							break;
						case "week":
							newDate = new Date((((3600000 * 24) * 7) + Date.now()) - ((new Date()).getTimezoneOffset() * 60000));
							break;
						case "day":
							newDate = new Date(((3600000 * 24) + Date.now()) - ((new Date()).getTimezoneOffset() * 60000));
							break;
						case "trihour":
							newDate = new Date(((3600000  * 3)+ Date.now()) - ((new Date()).getTimezoneOffset() * 60000));
							while(newDate.getHours >= 21 || newDate.getHours <= 6){ //21 and 6 should be replaced by more reasonable variables
								newDate = new Date(((3600000 * 3)  + newDate) - ((new Date()).getTimezoneOffset() * 60000));
							}
							break;
						case "bihour":
							newDate = new Date(((3600000 * 2) + Date.now()) - ((new Date()).getTimezoneOffset() * 60000));
							while(newDate.getHours >= 21 || newDate.getHours <= 6){ //21 and 6 should be replaced by more reasonable variables
								newDate = new Date((3600000 * 2) + newDate) - (new Date().getTimezoneOffset() * 60000));
							}
							break;
						case "hour":
							newDate = new Date((3600000 + Date.now()) - ((new Date()).getTimezoneOffset() * 60000));
							while(newDate.getHours >= 21 || newDate.getHours <= 6){ //21 and 6 should be replaced by more reasonable variables
								newDate = new Date((3600000 + newDate) - ((new Date()).getTimezoneOffset() * 60000));
							}
							break;
						case "joke":
							newDate = new Date((5000 + Date.now()) - ((new Date()).getTimezoneOffset() * 60000));
							break;
						default:
							break;
					} //end of switch statement 
				//Rewritten as a if/else statement; Seems to have the same result as the switch statement... Errors 
				//[ng] ERROR in src/app/storage.service.ts(167,93): error TS1005: ';' expected.
				//[ng] src/app/storage.service.ts(169,6): error TS1128: Declaration or statement expected.
				//[ng] src/app/storage.service.ts(191,5): error TS1128: Declaration or statement expected.
				//[ng] src/app/storage.service.ts(192,4): error TS1128: Declaration or statement expected.
				//[ng] src/app/storage.service.ts(193,3): error TS1128: Declaration or statement expected.
				//[ng] src/app/storage.service.ts(194,2): error TS1128: Declaration or statement expected.
				//[ng] src/app/storage.service.ts(195,27): error TS1005: ',' expected.
				//[ng] src/app/storage.service.ts(195,40): error TS1005: ';' expected.
				//[ng] src/app/storage.service.ts(208,1): error TS1128: Declaration or statement expected.
				if(data[i].remind == "month"){ 
					
					newDate = new Date((((3600000 * 24) * this.getDaysinMonth()) + Date.now()) - ((new Date()).getTimezoneOffset() * 60000));
				}else if(data[i].remind == "week"){
					newDate = new Date((((3600000 * 24) * 7) + Date.now()) - ((new Date()).getTimezoneOffset() * 60000));
				}else if(data[i].remind == "day"){
					newDate = new Date(((3600000 * 24) + Date.now()) - ((new Date()).getTimezoneOffset() * 60000));
				}else if(data[i].remind == "trihour"){
					newDate = new Date(((3600000  * 3)+ Date.now()) - ((new Date()).getTimezoneOffset() * 60000));
					while(newDate.getHours >= 21 || newDate.getHours <= 6){ //21 and 6 should be replaced by more reasonable variables
						newDate = new Date(((3600000 * 3)  + newDate) - ((new Date()).getTimezoneOffset() * 60000));
					}
				}else if(data[i].remind == "bihour"){
					newDate = new Date(((3600000 * 2) + Date.now()) - ((new Date()).getTimezoneOffset() * 60000));
					while(newDate.getHours >= 21 || newDate.getHours <= 6){ //21 and 6 should be replaced by more reasonable variables
						newDate = new Date((3600000 * 2) + newDate) - (new Date().getTimezoneOffset() * 60000));
					}
				}else if(data[i].remind == "hour"){
					newDate = new Date((3600000 + Date.now()) - ((new Date()).getTimezoneOffset() * 60000));
					while(newDate.getHours >= 21 || newDate.getHours <= 6){ //21 and 6 should be replaced by more reasonable variables
						newDate = new Date((3600000 + newDate) - ((new Date()).getTimezoneOffset() * 60000));
					}
				}else if(data[i].remind == "joke"){
					newDate = new Date((5000 + Date.now()) - ((new Date()).getTimezoneOffset() * 60000));
				} //End of if/else statement
				//set data[i].firstDate to new variable(Needs to be the toISOString)
				data[i].firstDate = newDate.toISOString();
				this.storage.set(STORAGE_KEY,data);
				//Delete Notification for current motivation, then make new Notification with new time
				this.localNotifications.cancel(data[i].motivationid);
				this.localNotifications.schedule({			
						id: data[i].motivationid,
						title: data[i].name + " Alert!",
						text: data[i].name + ' has been Triggered! Time to do your thing!',
						trigger: {at: newDate},
						led: 'FF0000',
						sound: data[i].sound,
						foreground: true
					});
				}
			}
		}
	}*/
	editMotivation(motivation: Motivation){
			this.getAllStoredMotivations().then(data => {
				for(var i = 0; i < data.length; i++){
					if(motivation.motivation_id == data[i].motivation_id){
						data[i] = motivation;
						this.storage.set(STORAGE_KEY,data);
						break;
					}
				}
			console.log(data);
		});
	}

}
