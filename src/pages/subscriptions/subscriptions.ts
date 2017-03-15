import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {Subscriptions} from "../../providers/subscriptions";
import {ISubscription} from "../../interfaces/subscription.interface";

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
				private subscriptionService: Subscriptions) {
		this.subscriptions = this.subscriptionService.dummySubscriptions();
	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad SubscriptionsPage');
	}

	public colorForMicroservice(subscription: ISubscription): string {
		return 'connector-' + subscription.connectorId;
	}

	public iconForMicroservice(subscription: ISubscription): string {
		switch (subscription.connectorId) {
			case 'weather':
				return 'rainy';
			case 'bands':
				return 'musical-notes';
			case 'tv':
				return 'desktop';
		}

		return subscription.connectorId;
	}
}
