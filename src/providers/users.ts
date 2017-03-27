import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import {Platform} from 'ionic-angular';
import 'rxjs/add/operator/map';
import {Constants} from "../app/app.constants";

@Injectable()
export class Users {
	// <editor-fold desc="Properties">
	/**
	 * Checks whether user was registered yet
	 * @returns {boolean}
	 */
	public get userRegistered(): boolean {
		return this.participantId !== null;
	}

	/**
	 * Gets the participants ID on this device
	 * @returns {any}
	 */
	public get participantId(): string {
		return localStorage.getItem('user_participant_id');
	}

	/**
	 * Sets the participants ID on this particular device
	 * @param id
	 */
	public set participantId(id: string) {
		localStorage.setItem('user_participant_id', id);
	}

	/**
	 * Gets the participants name
	 * @returns {string}
	 */
	public get participantName(): string {
		return localStorage.getItem('user_participant_name');
	}

	/**
	 * Sets the participant name
	 * @param name
	 */
	public set participantName(name: string) {
		localStorage.setItem('user_participant_name', name);
	}

	/**
	 * Gets the device type
	 * @returns {string|string}
	 */
	private get deviceType(): number {
		return this.platform.is('ios') ? 0 : 1;
	}

	// </editor-fold>

	/**
	 * Construct the instance
	 * @param http
	 * @param platform
	 */
	constructor(private http: Http, private platform: Platform) {
		console.log('Hello ParticipantService Provider');
	}

	/**
	 * Stores the user initially
	 * @param values
	 * @returns {Subscription}
	 */
	public saveUser(values) {
		// no user yet
		if (this.participantId === null) {
			return this.createUser(values);
		}
	}


	/**
	 * Create the user on serverside if not existing yet
	 * @param values
	 * @returns {Promise<T>|Promise}
	 */
	createUser(pushToken: string): Promise<any> {
		let headers = new Headers({
			'Content-Type': 'application/json'
		});

		let properties: any = {};

		properties.identifier = pushToken;
		properties.device_type = this.deviceType;

		return new Promise((resolve, reject) => {
			// go through the angularJS http interface to store stuff on webservice
			this.http.post(Constants.API_URI + 'users/', JSON.stringify(properties), {headers: headers})
			.map(res => res.json())
			.subscribe(
				// successfully fetched the data
				data => {
					// getting data in location header like this:
					// /api/users/58d8f55bb796b600087bad9a
					// store the id into local storage to have further access on it
					this.participantId = data.id;
					this.participantName = data.userId;

					console.log(data);

					// resolve the promise
					resolve(data);
				},
				// handle any errors in this pipe
				error => {
					reject(error);
				}
			);
		});
	}
}