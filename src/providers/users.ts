import {Injectable} from '@angular/core';
import {Http, Headers, Response} from '@angular/http';
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
	public createUser(pushToken: string): Promise<string> {
		const properties: { identifier: string, device_type: number } = {
			identifier: pushToken,
			device_type: this.deviceType
		};

		return new Promise((resolve, reject) => {
			// go through the angularJS http interface to store stuff on webservice
			this.http.post(Constants.API_URI + 'users/', properties)
			.map((response: Response) => {
				console.log(response.url);
				console.log(response.status);
				console.log(response.statusText);
				console.log(response.headers.keys());
				console.log(response.headers.values());

				return response.headers.get('location');
			})
			.map((location: string) => location.replace('/api/users/', ''))
			.subscribe(
				// successfully fetched the data
				(userId: string) => {
					// getting data in location header like this:
					// /api/users/58d8f55bb796b600087bad9a
					// store the id into local storage to have further access on it
					this.participantId = userId;

					// resolve the promise
					resolve(userId);
				},
				// handle any errors in this pipe
				(error: Error) => {
					reject(error);
				}
			);
		});
	}
}