import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  public appPages = [
	{
	        title: 'Home',
	        url: '/home',
	        icon: 'home'
	},
	{
		title: 'Add New Motivation',
		url: '/new-motivation',
		icon: 'flash'
	},
	{
		title: 'Detailed View',
		url: '/detail',
		icon: 'checkmark-circle-outline'
	},
  {
     title: 'Calendar',
     url: '/calendar',
     icon: 'calendar'
  },
	{
		title: 'Settings',
		url: '/setting',
		icon: 'cog'
	}
    ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
}
