import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {IConnector} from "../../interfaces/connector.interface";

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

	constructor(private navCtrl: NavController, private navParams: NavParams) {
		this.connector = this.navParams.get('connector');
	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad ComposeSubscriptionPage');
	}

	public save(): void {
	}
}
