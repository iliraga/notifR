import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
import {ISubscription} from "../interfaces/subscription.interface";
import {Subscription} from "../entities/subscription.entity";

/*
 Generated class for the Subscriptions provider.

 See https://angular.io/docs/ts/latest/guide/dependency-injection.html
 for more info on providers and Angular 2 DI.
 */
@Injectable()
export class Subscriptions {

	constructor(public http: Http) {
		console.log('Hello Subscriptions Provider');
	}

	public emptySubscription(caption: string, connector: string): ISubscription {
		let subscription: ISubscription = new Subscription();

		subscription.caption = caption;
		subscription.connectorId = connector;

		return subscription;
	}

	public forConnector(connectorIdentifier: string): ISubscription {
		let subscription: ISubscription = new Subscription();

		subscription.connectorId = connectorIdentifier;

		return subscription;
	}

	public mine(): Promise<Array<ISubscription>> {
		let subscriptions: Array<ISubscription> = [];

		subscriptions.push(this.emptySubscription("Zeige mir alle Tore von FC Bayern", "football"));
		subscriptions.push(this.emptySubscription("Zeige mir alle Siege von FC Schaffhausen", "football"));
		subscriptions.push(this.emptySubscription("Wenn die Temperatur in Schaffhausen um 10 Grad variiert", "weather"));
		subscriptions.push(this.emptySubscription("Wenn ein Thriller im Free-TV spielt", "tv"));
		subscriptions.push(this.emptySubscription("Wenn Berlin Tag und Nacht spielt", "tv"));
		subscriptions.push(this.emptySubscription("Wenn ein Selena Gomez Konzert in der Nähe ist", "bands"));
		subscriptions.push(this.emptySubscription("Wenn ein Louis Richi Müller Konzert in der Nähe ist", "bands"));

		return Promise.resolve(subscriptions);
	}
}
