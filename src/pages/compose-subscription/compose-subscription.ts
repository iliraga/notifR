import {Component} from '@angular/core';
import {Loading, LoadingController, NavController, NavParams} from 'ionic-angular';
import {IConnector} from "../../interfaces/connector.interface";
import {ISubscription} from "../../interfaces/subscription.interface";
import {Subscriptions} from "../../providers/subscriptions";
import {Observable} from "rxjs/Observable";

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

	/**
	 * @param navCtrl
	 * @param navParams
	 * @param subscriptionService
	 * @param loadingController
	 */
	constructor(private navCtrl: NavController,
				private navParams: NavParams,
				private subscriptionService: Subscriptions,
				private loadingController: LoadingController) {
		this.connector = this.navParams.get('connector');
		this.subscription = this.subscriptionService.forConnector(this.connector.id);
	}

	public ionViewDidLoad(): void {
		console.log('ionViewDidLoad ComposeSubscriptionPage');
	}

	/**
	 * Save
	 */
	public save(): void {
		let controller: Loading = this.loadingController.create({
			content: 'Speichere...'
		});

		controller.present()
		.then(() => this.subscriptionService.save(this.subscription))
		.then(() => controller.dismiss())
		.then(() => this.navCtrl.popToRoot());
	}
}
