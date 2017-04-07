import {Injectable} from '@angular/core';
import {Http, Response, Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import {ISubscription} from "../interfaces/subscription.interface";
import {Subscription} from "../entities/subscription.entity";
import {Observable} from "rxjs/Observable";
import {Constants} from "../app/app.constants";
import {Users} from "./users";

interface ISubscriptionPayload {
	connector: string;
	userid: string;
	message: string;
	data: any;
}

/*
 Generated class for the Subscriptions provider.

 See https://angular.io/docs/ts/latest/guide/dependency-injection.html
 for more info on providers and Angular 2 DI.
 */
@Injectable()
export class Subscriptions {

	private subscriptions: Array<ISubscription> = [];

	constructor(private http: Http,
				private users: Users) {
		console.log('Hello Subscriptions Provider');

		let subscriptions: Array<ISubscription> = [];

		subscriptions.push(this.emptySubscription("Zeige mir alle Tore von FC Bayern", "football"));
		subscriptions.push(this.emptySubscription("Zeige mir alle Siege von FC Schaffhausen", "football"));
		subscriptions.push(this.emptySubscription("Wenn die Temperatur in Schaffhausen um 10 Grad variiert", "weather"));
		subscriptions.push(this.emptySubscription("Wenn ein Thriller im Free-TV spielt", "tv"));
		subscriptions.push(this.emptySubscription("Wenn Berlin Tag und Nacht spielt", "tv"));
		subscriptions.push(this.emptySubscription("Wenn ein Selena Gomez Konzert in der Nähe ist", "bands"));
		subscriptions.push(this.emptySubscription("Wenn ein Louis Richi Müller Konzert in der Nähe ist", "bands"));

		this.subscriptions = subscriptions;
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
		subscription.data = {};

		return subscription;
	}

	public add(subscription: ISubscription): void {
		this.subscriptions.push(subscription);
	}

	public save(subscription: ISubscription): Promise<ISubscription> {
		let url: string = Constants.API_URI + 'users/' + this.users.participantId + '/subscriptions';
		let payload: ISubscriptionPayload = this.mapSubscription(subscription);

		return new Promise<ISubscription>((resolve, reject) => {
			this.http.post(url, payload)
			.map((response: Response) => response.headers)
			.map((headers: Headers) => headers.get('location'))
			.map((location: string) => location.replace('/api/subscriptions/', ''))
			.map((id: string) => {
				subscription.id = id;

				this.subscriptions.push(subscription);

				return subscription;
			})
			.subscribe(
				(subscription: ISubscription) => resolve(subscription),
				(error: Error) => reject(error)
			);
		});
	}

	public mine(): Promise<Array<ISubscription>> {
		return Promise.resolve(this.subscriptions);
	}

	private mapSubscription(subscription: ISubscription): ISubscriptionPayload {
		return {
			userid: this.users.participantId,
			connector: subscription.connectorId,
			message: subscription.caption,
			data: subscription.data
		};
	}
}
