import {Component} from '@angular/core';
import {NavController, NavParams, Platform} from 'ionic-angular';
import {Subscriptions} from "../../providers/subscriptions";
import {ConnectorRenderingHelper} from "../../providers/connector-rendering-helper";
import {ISubscription} from "../../interfaces/subscription.interface";
import {ConnectorSelectionPage} from "../connector-selection/connector-selection";
import {Users} from "../../providers/users";
import {NotificationService} from "../../providers/notification-service";

/*
 Generated class for the Subscriptions page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
	selector: 'page-subscriptions',
	templateUrl: 'subscriptions.html'
})
export class SubscriptionsPage {
	public subscriptions: Array<ISubscription> = [];

	constructor(private navCtrl: NavController,
				private platform: Platform,
				private notifications: NotificationService,
				private users: Users,
				private subscriptionService: Subscriptions,
				private connectorRendering: ConnectorRenderingHelper) {
		this.platform.ready().then(() => this.initializeUser());
	}

	private ionViewDidLoad(): void {
		console.log('ionViewDidLoad SubscriptionsPage');

		if (this.users.participantId !== null) this.loadSubscriptions();
	}

	public composeSubscription(): void {
		this.navCtrl.push(ConnectorSelectionPage, {});
	}

	public colorForMicroservice(subscription: ISubscription): string {
		return this.connectorRendering.color(subscription.connectorId);
	}

	public iconForMicroservice(subscription: ISubscription): string {
		return this.connectorRendering.icon(subscription.connectorId);
	}

	/**
	 * Initializes user
	 */
	private initializeUser(): void {
		this.notifications.fetchToken()
		.then((token: string) => this.createUser(token))
		.then(() => this.loadSubscriptions());
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

	/**
	 * Load subscriptions through service
	 */
	private loadSubscriptions(): void {
		this.subscriptionService.mine().then((subscriptions: Array<ISubscription>) => this.subscriptions = subscriptions);
	}
}
