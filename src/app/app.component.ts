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
<<<<<<< HEAD
    {
      title: 'Home',
      url: '/home',
      icon: 'home'
    },
=======
	{
	        title: 'Home',
	        url: '/home',
	        icon: 'home'
	},
>>>>>>> DetailPage
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
<<<<<<< HEAD
    {
      title: 'Calendar View',
      url: '/calerdar',
      icon: 'calendar'
    },
=======
    	{
      		title: 'Calendar',
      		url: '/calendar',
      		icon: 'calendar'
    	},
>>>>>>> DetailPage
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
