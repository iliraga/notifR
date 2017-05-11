import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
import {INotification} from "../interfaces/notification.interface";

/*
 Generated class for the Notifications provider.

 See https://angular.io/docs/ts/latest/guide/dependency-injection.html
 for more info on providers and Angular 2 DI.
 */
@Injectable()
export class Notifications {

	constructor(public http: Http) {
		console.log('Hello Notifications Provider');
	}

	public mine(): Promise<Array<INotification>> {
		return new Promise<Array<INotification>>(resolve => {
		});
	}
}
