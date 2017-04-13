import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {ConnectorRenderingHelper} from "../../providers/connector-rendering-helper";
import {IConnector} from "../../interfaces/connector.interface";
import {ComposeSubscriptionPage} from "../compose-subscription/compose-subscription";

/*
 Generated class for the ConnectorSelection page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
	selector: 'page-connector-selection',
	templateUrl: 'connector-selection.html'
})
export class ConnectorSelectionPage {
	public connectors: Array<IConnector> = [];

	constructor(private navCtrl: NavController,
				private navParams: NavParams,
				private connectorRendering: ConnectorRenderingHelper) {
		this.connectors = this.connectorRendering.connectors();
	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad ConnectorSelectionPage');
	}

	/**
	 * Connector was selected
	 * @param connector
	 */
	public connectorTapped(connector: IConnector): void {
		let validConnectors: Array<string> = [
			'bands', 'football'
		];

		if (validConnectors.indexOf(connector.id) === -1) return;

		this.navCtrl.push(ComposeSubscriptionPage, {
			connector: connector
		});
	}

	public connectorsIcon(connector: IConnector): string {
		return this.connectorRendering.icon(connector.id);
	}

	public connectorsColor(connector: IConnector): string {
		return this.connectorRendering.color(connector.id);
	}
}
