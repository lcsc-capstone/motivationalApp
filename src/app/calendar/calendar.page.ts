import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.page.html',
  styleUrls: ['./calendar.page.scss'],
})
export class CalendarPage implements OnInit {
	days: any;
	previous_Days: any;
	next_Days: any;
	daysInThisMonth: any;
	daysInLastMonth: any;
	daysInNextMonth: any;
	WeekDay: any;
	CurrentMonth: any;
	CurrentYear: any;
	CurrentDate: any;
	CalendarDate: any;
	Month: string[];
	constructor() { //setup of dates
		this.CalendarDate = new Date();
		this.CurrentMonth = this.CalendarDate.getMonth()+1;
		this.CurrentDate = this.CalendarDate.getDate();
		this.CurrentYear = this.CalendarDate.getFullYear();
		this.daysInThisMonth = new Date(this.CurrentYear,this.CurrentMonth,0).getDate();
		this.daysInLastMonth = new Date(this.CurrentYear,this.CurrentMonth-1,0).getDate();
		this.daysInNextMonth = new Date(this.CurrentYear,this.CurrentMonth+1,0).getDate();
		this.Month = ["January","February","March","April","May","June","July","August","September","October","November","December"];
		this.WeekDay = new Date(this.CalendarDate.getFullYear(),this.CalendarDate.getMonth(),1).getDay();
		this.days = new Array();
		this.previous_Days = new Array();
		this.next_Days = new Array();
		this.getPreviousDaysOfMonth();
		this.getDaysOfMonth();
		this.getPreviousDaysOfNextMonth();
		console.log(this.days);
	}
  	ngOnInit() {
  	}
  	getPreviousDaysOfMonth(){
  		var previous_Num_Days = new Date(this.CalendarDate.getFullYear(),this.CalendarDate.getMonth(),0).getDate();
  		for(var i = previous_Num_Days-(this.WeekDay-1); i <= this.daysInLastMonth; i++){ //Obtains the last few days of last month to keep the calendar balanced
			this.previous_Days.push(i);

		}
		console.log(this.previous_Days);
  	}
  	getDaysOfMonth(){
  	for(var i = 1; i <= this.daysInThisMonth; i++){ //Populates the calendar with all the current days of the month
  			this.days.push(i);
  		}
  	}
  getPreviousDaysOfNextMonth(){
  	var lastDayThisMonth = new Date(this.CalendarDate.getFullYear(), this.CalendarDate.getMonth()+1, 0).getDay();
  	console.log(lastDayThisMonth);
  	for (var i = 0; i < (6-lastDayThisMonth); i++) {
    	this.next_Days.push(i+1);
  }
	console.log(this.next_Days);
  }

}
