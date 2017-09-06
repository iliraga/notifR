import {Injectable} from '@angular/core';
import {Platform} from 'ionic-angular';
import {Push, PushObject, PushOptions, NotificationEventResponse, RegistrationEventResponse} from '@ionic-native/push';
import 'rxjs/add/operator/map';

/**
 * Notification Service for hardware supported push notifications
 */
@Injectable()
export class NotificationService {
	private pusher: PushObject = null;

	constructor(private platform: Platform,
				private push: Push) {
		console.log('Hello NotificationService Provider');
	}

	/**
	 * Fetches the token of the device
	 * @returns {Promise<T>|Promise}
	 */
	public fetchToken() {
		return this.platform.ready().then(() => {
			if (this.isDevice()) {
				return this.requestToken();
			}

			return this.requestEmulatorToken();
		});
	}

	/**
	 * Initializes the pusher with stored configuration
	 *
	 * @returns {PushNotification}
	 */
	private createPusher(): PushObject {
		const options: PushOptions = {
			android: {
				senderID: 'not_used_rightnow'
			},
			ios: {
				alert: 'true',
				badge: true,
				sound: 'false'
			},
			windows: {}
		};

		const push: PushObject = this.push.init(options);

		return push;
	}

	/**
	 * Requests emulator token when running app on a simulator or emulator
	 * @returns {Promise<string>}
	 */
	private requestEmulatorToken(): Promise<string> {
		return Promise.resolve(this.getEmulatorToken());
	}

	/**
	 * Gets the simulator token
	 * @returns {string}
	 */
	private getEmulatorToken(): string {
		return "SIMULATOR_TOKEN";
	}

	/**
	 * Create pusher and attach event handlers
	 * @returns {Promise<T>|Promise}
	 */
	private requestToken(): Promise<string> {
		return new Promise((resolve, reject) => {
			this.pusher = this.createPusher();

			// handle incoming notification
			this.pusher.on('notification').subscribe((data: NotificationEventResponse) => this.incoming(data));

			// handle registration to device and retrieval of pushtoken
			this.pusher.on('registration').subscribe((data: RegistrationEventResponse) => {
				let pushToken = data.registrationId;

				console.log('NotificationsService.requestToken()', 'Fetched token', pushToken);

				resolve(pushToken);
			});

			// handle errors on native layer
			this.pusher.on('error').subscribe((e: Error) => {
				console.log('NotificationsService.createPushEventHandlers()', 'Error while fetching push token', e.message, e.name);

				// check for the issue "remote notifications are not supported in the fucker"
				// TODO: Replace with proper checking of issue, not by comparing strings. This can change in each version of iOS
				if (e.message.indexOf('remote notifications are not supported in the simulator') > 0) {
					console.log(e.message.indexOf('remote notifications are not supported in the simulator'));

					// we now know we're running on fcking emulator
					resolve(this.getEmulatorToken());
				} else {
					reject(e);
				}
			});
		});
	}

	/**
	 * Handle incoming push notifications
	 * @param notification
	 */
	private incoming(notification: NotificationEventResponse): void {
		console.log(notification.message);
		console.log(notification.title);
		console.log(notification.count);
		console.log(notification.sound);
		console.log(notification.image);
		console.log(notification.additionalData);
	}

	/**
	 * Checks whether we're running on an actual device
	 * @returns {boolean}
	 */
	private isDevice(): boolean {
		return !this.platform.is('mobileweb');
	}
}