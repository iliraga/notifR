import {Injectable} from '@angular/core';
import {Http, Response, Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import {ISubscription} from "../interfaces/subscription.interface";
import {Subscription} from "../entities/subscription.entity";
import {Observable} from "rxjs/Observable";
import {Constants} from "../app/app.constants";
import {Users} from "./users";

interface ISubscriptionPayload {
	_id?: string;
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
	}

	/**
	 * Gets an empty subscription
	 * @param caption
	 * @param connector
	 * @returns {ISubscription}
	 */
	public emptySubscription(caption: string, connector: string): ISubscription {
		const subscription: ISubscription = new Subscription();

		subscription.caption = caption;
		subscription.connectorId = connector;

		return subscription;
	}

	/**
	 * Gets empty subscription for specified connector
	 * @param connectorIdentifier
	 * @returns {ISubscription}
	 */
	public forConnector(connectorIdentifier: string): ISubscription {
		const subscription: ISubscription = new Subscription();

		subscription.connectorId = connectorIdentifier;
		subscription.data = {};

		return subscription;
	}

	/**
	 * Deletes single subscription and removes it from cached list
	 * @param subscription
	 * @returns {Promise<any>}
	 */
	public delete(subscription: ISubscription): Promise<Array<ISubscription>> {
		const url: string = Constants.API_URI + 'subscriptions/' + subscription.id;

		return new Promise<any>((resolve, reject) => {
			this.http.delete(url)
			.map((response: Response) => this.subscriptions.filter((item: ISubscription) => item.id !== subscription.id))
			.subscribe(
				(subscriptions: Array<ISubscription>) => {
					this.subscriptions = subscriptions;

					resolve(subscriptions);
				},
				(error: Error) => reject(error)
			)
		});
	}

	/**
	 * Persist specified subscription through webservice
	 * @param subscription
	 * @returns {Promise<ISubscription>}
	 */
	public save(subscription: ISubscription): Promise<ISubscription> {
		const url: string = Constants.API_URI + 'subscriptions/';
		const payload: ISubscriptionPayload = this.serialize(subscription);

		return new Promise<ISubscription>((resolve, reject) => {
			this.http.post(url, payload)
			.map((response: Response) => response.headers)
			.map((headers: Headers) => headers.get('location'))
			.map((location: string) => location.replace('/api/subscriptions/', ''))
			.map((id: string) => {
				console.log('Created subscriptionp with', id);

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

	/**
	 * Fetch own subscriptions through webservice
	 * @returns {Promise<Array<ISubscription>>}
	 */
	public mine(): Promise<Array<ISubscription>> {
		const url: string = `${Constants.API_URI}users/${this.users.participantId}/subscriptions`;

		if (this.subscriptions.length > 0) {
			return Promise.resolve(this.subscriptions);
		}

		return new Promise<Array<ISubscription>>((resolve, reject) => {
			this.http.get(url)
			.map((response: Response) => {
				console.log(response);

				return response;
			})
			.map((response: Response) => response.json())
			.map((entities: any) => entities.data)
			.map((entities: Array<ISubscriptionPayload>) => entities.map((raw: ISubscriptionPayload) => this.deserialize(raw)))
			.map((entities: Array<ISubscription>) => this.subscriptions.concat(entities))
			.map((entities: Array<ISubscription>) => {
				this.subscriptions = entities;

				return this.subscriptions;
			})
			.subscribe(
				(subscriptions: Array<ISubscription>) => resolve(subscriptions),
				(error: Error) => reject(error)
			)
		});
	}

	/**
	 * Deserializes entity from payload
	 * @param raw
	 * @returns {ISubscription}
	 */
	private deserialize(raw: ISubscriptionPayload): ISubscription {
		const subscription: ISubscription = this.forConnector(raw.connector);

		subscription.caption = raw.message;
		subscription.data = raw.data;
		subscription.id = raw._id;

		return subscription;
	}

	/**
	 * Serializes entity into payload
	 * @param subscription
	 * @returns {{userid: string, connector: string, message: string, data: any}}
	 */
	private serialize(subscription: ISubscription): ISubscriptionPayload {
		return {
			userid: this.users.participantId,
			connector: subscription.connectorId,
			message: subscription.caption,
			data: subscription.data
		};
	}
}
