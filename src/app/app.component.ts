import {Component, ViewChild} from '@angular/core';
import {Nav, Platform} from 'ionic-angular';
import {StatusBar, Splashscreen} from 'ionic-native';

import {Page1} from '../pages/page1/page1';
import {Page2} from '../pages/page2/page2';
import {HomePage} from "../pages/home/home";
import {SubscriptionsPage} from "../pages/subscriptions/subscriptions";
import {NotificationService} from "../providers/notification-service";
import {Users} from "../providers/users";

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

	public rootPage: any = SubscriptionsPage;
	public pages: Array<INavigationPage>;

	constructor(private platform: Platform,
				private notifications: NotificationService,
				private users: Users) {
		this.initializeApp();

		// used for an example of ngFor and navigation
		this.pages = [
			{title: 'Home', component: this.rootPage, icon: 'home'},
			{title: 'Benachrichtigungen', component: Page2, icon: 'notifications'},
			{title: 'Meine Topics', component: Page1, icon: 'body'},
			{title: 'Über notifR', component: Page1, icon: 'information-circle'}
		];
	}

	/**
	 * Initializes application
	 */
	private initializeApp(): void {
		this.platform.ready().then(() => this.initializeUser());
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

	/**
	 * Initializes user
	 */
	private initializeUser(): void {
		this.notifications.fetchToken()
		.then((token: string) => this.createUser(token))
		.then(() => console.log('User was created'));
	}

	/**
	 * Creates user through service
	 * @param token
	 * @returns {any}
	 */
	private createUser(token: string): Promise<any> {
		if (!this.users.userRegistered) {
			return this.users.createUser(token);
		} else {
			return Promise.resolve(true);
		}
	}
}
