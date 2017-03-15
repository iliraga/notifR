import {Component, ViewChild} from '@angular/core';
import {Nav, Platform} from 'ionic-angular';
import {StatusBar, Splashscreen} from 'ionic-native';

import {Page1} from '../pages/page1/page1';
import {Page2} from '../pages/page2/page2';
import {HomePage} from "../pages/home/home";
import {SubscriptionsPage} from "../pages/subscriptions/subscriptions";


@Component({
	templateUrl: 'app.html'
})
export class MyApp {
	@ViewChild(Nav) nav: Nav;

	public rootPage: any = SubscriptionsPage;
	public pages: Array<{title: string, component: any, icon: string}>;

	constructor(public platform: Platform) {
		this.initializeApp();

		// used for an example of ngFor and navigation
		this.pages = [
			{title: 'Home', component: this.rootPage, icon: 'home'},
			{title: 'Benachrichtigungen', component: Page2, icon: 'notifications'},
			{title: 'Meine Topics', component: Page1, icon: 'body'},
			{title: 'Über notifR', component: Page1, icon: 'information-circle'}
		];

	}

	private initializeApp(): void {
		this.platform.ready().then(() => {
		});
	}

	public openPage(page): void {
		// Reset the content nav to have just this page
		// we wouldn't want the back button to show in this scenario
		this.nav.setRoot(page.component);
	}
}
