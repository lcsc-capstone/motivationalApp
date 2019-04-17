import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../settings.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.page.html',
  styleUrls: ['./setting.page.scss'],
})
export class SettingPage implements OnInit {

    constructor(public settings:SettingsService, public alertController: AlertController) {
	  
    }
	switchdarkmode() {
		this.settings.switch_darkmode();
	}
	switchnukedata(){
		this.settings.switch_nukedata();
	}
	
	async presentAlertMultipleButtons() {
		const alert = await this.alertController.create({
			header: 'Deleting Motivations',
			subHeader: 'This will delete all data',
			message: 'Are you sure?',
			buttons: ['Cancel',{
				text: 'Yes',
				cssClass: 'red',
				handler: () =>{
					this.switchnukedata();
				}
			}]
		});
	    await alert.present();
	}
	ngOnInit(){}

}