import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
})
export class DetailPage implements OnInit {
	items: any = [];
	header: any = new Array(10);
	expansion = true;
	constructor() { 
		this.header = ["1","2","3","4","5","6","7","8","9","10","11"];
		this.items = ["test","other test"]
	}
  	ngOnInit() {
  	}
}
