import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Motivation } from '../motivation.interface';
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
	constructor(private storage: StorageService) { 
		//this.items = new Array();
		this.storage.getAllStoredMotivations().then(data =>{
			this.items = data;
			console.log(this.items[0].name);
		})
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
