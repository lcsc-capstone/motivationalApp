import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../settings.service';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.page.html',
  styleUrls: ['./setting.page.scss'],
})
export class SettingPage implements OnInit {

    constructor(public settings:SettingsService) {
	  
    }
	switchdarkmode() {
		this.settings.switch_darkmode();
	}
  ngOnInit() {
  }

}