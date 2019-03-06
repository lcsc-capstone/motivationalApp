import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.page.html',
  styleUrls: ['./calendar.page.scss'],
})
export class CalendarPage implements OnInit {
	days: any;
	LastWeekDay: any;
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
		this.WeekDay = new Date(this.CurrentYear,this.CurrentMonth,1).getDay();
		this.days = new Array();
		this.getPreviousDaysOfMonth();
		this.getDaysOfMonth();
		this.getPreviousDaysOfNextMonth();
		this.MonthCheck();
		console.log(this.days);
	}
  	ngOnInit() {
  	}
  	//potential functions for cleaner looking code? Eventually?
  	getPreviousDaysOfMonth(){
  		for(var i = this.daysInLastMonth-(this.WeekDay-1); i <= this.daysInLastMonth; i++){ //Obtains the last few days of last month to keep the calendar balanced
			this.days.push(i);
		}
  	}
  	getDaysOfMonth(){
  	for(var i = 1; i <= this.daysInThisMonth; i++){ //Populates the calendar with all the current days of the month
  			this.days.push(i);
  		}
  	}

  getPreviousDaysOfNextMonth(){
  	for(var i = this.daysInThisMonth-(this.WeekDay-1); i <= this.daysInThisMonth; i++){ //Obtains the last few days of next month to keep calendar balanced
			this.days.push(i);
		}
  }
  MonthCheck(){
  	for(var i = 31; i < this.days.length; i++){
				this.days.pop();
		}
  }
}
