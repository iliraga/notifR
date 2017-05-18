import {Component} from '@angular/core';
import {ISubscription} from "../../../interfaces/subscription.interface";

/*
 Generated class for the WeatherConfiguration component.

 See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 for more info on Angular 2 Components.
 */
@Component({
	selector: 'weather-configuration',
	templateUrl: 'weather-configuration.html',
	inputs: ['subscription']
})
export class WeatherConfigurationComponent {
	public subscription: ISubscription = null;

	constructor() {
		console.log('Hello WeatherConfiguration Component');
	}

	public get city(): string {
		return this.subscription.data.city;
	}

	public set city(city: string) {
		this.subscription.data.city = city;
		// default, set it in each case for whatever reasons
		this.subscription.data.amount = 0;

		this.updateMessage();
		this.checkValidty();
	}

	private updateMessage(): void {
		this.subscription.caption = "Informiere mich über das Wetter in '" + this.city + "'";
	}

	private checkValidty(): void {
		this.subscription.isValid = typeof this.city !== 'undefined' && this.city.trim().length > 3;
	}
}
