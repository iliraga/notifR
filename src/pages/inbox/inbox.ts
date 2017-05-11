import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {INotification} from "../../interfaces/notification.interface";
import {Notifications} from "../../providers/notifications";
import {ConnectorRenderingHelper} from "../../providers/connector-rendering-helper";

/*
 Generated class for the Inbox page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
	selector: 'page-inbox',
	templateUrl: 'inbox.html',
	providers: [Notifications]
})
export class InboxPage {
	public notifications: Array<INotification> = [];

	constructor(public navCtrl: NavController,
				private notificationService: Notifications,
				private connectorRendering: ConnectorRenderingHelper) {
	}

	public colorForMicroservice(notification: INotification): string {
		return this.connectorRendering.color(notification.connectorId);
	}

	public iconForMicroservice(notification: INotification): string {
		return this.connectorRendering.icon(notification.connectorId);
	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad InboxPage');
	}
}
