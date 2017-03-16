import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';
import {IConnector} from "../interfaces/connector.interface";
import {Connector} from "../entities/connector.entity";

/*
 Generated class for the ConnectorRenderingHelper provider.

 See https://angular.io/docs/ts/latest/guide/dependency-injection.html
 for more info on providers and Angular 2 DI.
 */
@Injectable()
export class ConnectorRenderingHelper {
	private myConnectors: Array<IConnector> = [];


	constructor() {
		console.log('Hello ConnectorRenderingHelper Provider');

		this.myConnectors.push(this.connector('bands', 'Meine Bands'));
		this.myConnectors.push(this.connector('tv', 'Fernsehen'));
		this.myConnectors.push(this.connector('weather', 'Wetter'));
		this.myConnectors.push(this.connector('football', 'Fussball Resultate'));
	}

	private connector(identifier: string, caption: string): IConnector {
		let connector: IConnector = new Connector();

		connector.id = identifier;
		connector.caption = caption;

		return connector;
	}

	public color(connectorId): string {
		return 'connector-' + connectorId;
	}

	public connectors(): Array<IConnector> {
		return this.myConnectors;
	}

	public icon(connectorId): string {
		switch (connectorId) {
			case 'weather':
				return 'rainy';
			case 'bands':
				return 'musical-notes';
			case 'tv':
				return 'desktop';
		}

		return connectorId;
	}
}
