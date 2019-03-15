import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
})
export class DetailPage implements OnInit {
	
	items: any; //The items array initiziler 
	shownGroup = null; //Controlls the hidden / shown values for the div in html
	constructor() { 
		this.items = [
		{ header: "This is a test", panel: "You are a test"},
		{ header: "This is another test", panel: "You are great :)"},
		];
		
	}
  	ngOnInit() {
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
}
