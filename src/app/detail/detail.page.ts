import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Motivation } from '../motivation.interface';
import { Platform } from '@ionic/angular';
import { LocalNotifications, ELocalNotificationTriggerUnit, ILocalNotificationActionType, ILocalNotification } from '@ionic-native/local-notifications/ngx';
import { StorageService } from '../storage.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
})
export class DetailPage implements OnInit {
	test: any;
	items: any; //The items array initiziler 
	shownGroup = null; //Controlls the hidden / shown values for the div in html
	constructor(private storage: StorageService,public router: Router,private localNotifications: LocalNotifications,private plt: Platform) { 
		this.plt.ready().then(() => {
      this.localNotifications.on('cancel');
    });
	}
  	ngOnInit() {
  	}
    ionViewDidEnter(){
      this.storage.getAllStoredMotivations().then(data =>{
        this.items = data;
        this.DateConvert();
        console.log(this.items[0].firstDate);
        console.log(this.items);
      })
    }

	toggleGroup(group) {
      		if (this.isGroupShown(group)) {
          		this.shownGroup = null;
      		} else {
          		this.shownGroup = group;
      		}
  	};
	/*
		keeps track of whether or not a group is hidden
	*/
  	isGroupShown(group) {
      		return this.shownGroup == group;
  	};

  	DateConvert(){
  		for(var i = 0; i < this.items.length; i++){
    			var buffer, buffer2,last,final,part;
          if(this.items[i].firstDate){
    			var d = new Date(this.items[i].firstDate); //sets up the date value for parsing
          buffer = d.toDateString(); //converts the date to readable for the day, month, year
          buffer2 = d.toLocaleTimeString(); //Readable time format
          final = buffer + " " + buffer2; // adds the buffers set above to make it really readable
          last = final.lastIndexOf(":"); //get last position of seconds in the time
          part = final.substr(last+3,final.length); // obtain AM / PM of the string
          final = final.substr(0,last); // get rid of seconds in the time string
          this.items[i].firstDate = final + part; // Finally add AM/PM back to initial string.
        }
  		}
  	};

    goToEditPage(items){
        
    };
    removeMot(mot){
        this.localNotifications.cancel(mot.motivation_id);
        this.storage.removeMotivation(mot);
        for(var i = 0; i < this.items.length; i++){
          if(this.items[i].motivation_id == mot.motivation_id){
            this.items.splice(i,1);
          }
        }
      
    }
}
