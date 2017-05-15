import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import 'rxjs/add/operator/map';
import {INotification} from "../interfaces/notification.interface";
import {Users} from "./users";
import {Constants} from "../app/app.constants";
import {Notification} from "../entities/notification.entity";

interface INotificationPayload {
	connector: string;
	create_date: number;
	id: string;
	message: string;
}

/*
 Generated class for the Notifications provider.

 See https://angular.io/docs/ts/latest/guide/dependency-injection.html
 for more info on providers and Angular 2 DI.
 */
@Injectable()
export class Notifications {
	private notifications: Array<INotification> = [];

	constructor(private http: Http, private users: Users) {
		console.log('Hello Notifications Provider');
	}

	/**
	 * Get my notifications
	 * @returns {Promise<Array<INotification>>}
	 */
	public mine(): Promise<Array<INotification>> {
		const url: string = Constants.API_URI + 'users/' + this.users.participantId + '/notifications';

		return new Promise<Array<INotification>>((resolve, reject) => {
			this.http.get(url)
			.map((response: Response) => response.json())
			.map((raw: any) => raw.data)
			.map((items: Array<INotificationPayload>) => items.map((item: INotificationPayload) => this.deserialize(item)))
			.map((notifications: Array<INotification>) => this.notifications = notifications)
			.subscribe(
				(notifications: Array<INotification>) => resolve(notifications),
				(error: Error) => reject(error)
			)
		});
	}

	/**
	 * Converts a raw object into INotification compatible entity instance
	 * @param raw
	 * @returns {INotification}
	 */
	private deserialize(raw: INotificationPayload): INotification {
		const notification: INotification = new Notification();

		notification.connectorId = raw.connector;
		notification.message = raw.message;

		return notification;
	}
}
