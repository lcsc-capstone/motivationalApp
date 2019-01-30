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
		url: '/newMotivation',
		icon: 'flash'
	},
	{
		title: 'Detailed View',
		icon: 'checkmark-circle-outline'
	},
    {
      title: 'Calendar View',
      url: '/list',
      icon: 'calendar'
    },
	{
		title: 'Settings',
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
