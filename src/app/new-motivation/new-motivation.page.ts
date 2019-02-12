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
}
