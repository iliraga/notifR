import {Component, ViewChild} from '@angular/core';
import {Nav, Platform} from 'ionic-angular';
import {StatusBar, Splashscreen} from 'ionic-native';

import {Page1} from '../pages/page1/page1';
import {Page2} from '../pages/page2/page2';
import {SubscriptionsPage} from "../pages/subscriptions/subscriptions";
import {AboutPage} from "../pages/about/about";

interface INavigationPage {
	title: string;
	component: Component;
	icon: string;
}


@Component({
	templateUrl: 'app.html'
})
export class MyApp {

	@ViewChild(Nav) nav: Nav;

	public rootPage: Component = SubscriptionsPage;
	public pages: Array<INavigationPage>;

	constructor(private platform: Platform) {
		this.initializeApp();

		// used for an example of ngFor and navigation
		this.pages = [
			{title: 'Home', component: this.rootPage, icon: 'home'},
			{title: 'Benachrichtigungen', component: Page2, icon: 'notifications'},
			{title: 'Meine Topics', component: Page1, icon: 'body'},
			{title: 'Über notifR', component: AboutPage, icon: 'information-circle'}
		];
	}

	/**
	 * Initializes application
	 */
	private initializeApp(): void {
	}

	/**
	 * Opens specified page
	 * @param page
	 */
	public openPage(page: INavigationPage): void {
		// Reset the content nav to have just this page
		// we wouldn't want the back button to show in this scenario
		this.nav.setRoot(page.component).then(() => console.info('Change page'));
	}
}
