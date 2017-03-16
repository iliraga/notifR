import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {Subscriptions} from "../../providers/subscriptions";
import {ConnectorRenderingHelper} from "../../providers/connector-rendering-helper";
import {ISubscription} from "../../interfaces/subscription.interface";
import {ConnectorSelectionPage} from "../connector-selection/connector-selection";

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
				private navParams: NavParams,
				private subscriptionService: Subscriptions,
				private connectorRendering: ConnectorRenderingHelper) {
		// fetch my subscriptions
		this.subscriptionService.mine().then((subscriptions: Array<ISubscription>) => {
			this.subscriptions = subscriptions;
		});
	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad SubscriptionsPage');
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
}
