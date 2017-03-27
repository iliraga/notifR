import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {IConnector} from "../../interfaces/connector.interface";
import {ISubscription} from "../../interfaces/subscription.interface";
import {Subscriptions} from "../../providers/subscriptions";

/*
 Generated class for the ComposeSubscription page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
	selector: 'page-compose-subscription',
	templateUrl: 'compose-subscription.html'
})
export class ComposeSubscriptionPage {
	public connector: IConnector = null;
	public subscription: ISubscription = null;

	constructor(private navCtrl: NavController,
				private navParams: NavParams,
				private subscriptionService: Subscriptions) {
		this.connector = this.navParams.get('connector');
		this.subscription = this.subscriptionService.forConnector(this.connector.id);
	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad ComposeSubscriptionPage');
	}

	public save(): void {
		this.subscriptionService.add(this.subscription);
		this.navCtrl.popToRoot();
	}
}
