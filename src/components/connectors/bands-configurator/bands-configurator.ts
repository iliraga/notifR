import {Component} from '@angular/core';
import {ISubscription} from "../../../interfaces/subscription.interface";

/*
 Generated class for the BandsConfigurator component.

 See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 for more info on Angular 2 Components.
 */
@Component({
	selector: 'bands-configurator',
	templateUrl: 'bands-configurator.html',
	inputs: ['subscription']
})
export class BandsConfiguratorComponent {
	/**
	 * Subscription which will be extended through this component
	 * @type {any}
	 */
	public subscription: ISubscription = null;

	constructor() {
		console.log('Hello BandsConfigurator Component');
	}

	public set bandName(name: string) {
		this.subscription.data.band = name;
		this.updateMessage();
		this.checkValidity();
	}

	public get bandName(): string {
		return this.subscription.data.band;
	}

	public set country(country: string) {
		this.subscription.data.country = country;
		this.updateMessage();
		this.checkValidity();
	}

	public get country(): string {
		return this.subscription.data.country;
	}

	private updateMessage(): void {
		this.subscription.caption = "Benachrichte mich wenn '" + this.subscription.data.band + "' ein Konzert in '" + this.parseCountry(this.subscription.data.country) + "' gibt";
	}

	public checkValidity(): void {
		if (typeof this.subscription.data.band === 'undefined' || typeof this.subscription.data.country === 'undefined') {
			this.subscription.isValid = false;
			return;
		}

		this.subscription.isValid = this.subscription.data.band.trim() !== '' && this.subscription.data.country.trim() !== '';
	}

	private parseCountry(countryCode: string): string {
		switch (countryCode) {
			case 'de':
				return 'Deutschland';
			case 'ch':
				return 'Schweiz';
			case 'at':
				return 'Österreich';
		}
	}
}
