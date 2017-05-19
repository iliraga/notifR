import {Component} from '@angular/core';
import {ISubscription} from "../../../interfaces/subscription.interface";

/*
 Generated class for the TvConfigurator component.

 See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 for more info on Angular 2 Components.
 */
@Component({
	selector: 'tv-configurator',
	templateUrl: 'tv-configurator.html',
	inputs: ['subscription']
})
export class TvConfiguratorComponent {
	/**
	 * Subscription which will be extended through this component
	 * @type {any}
	 */
	public subscription: ISubscription = null;

	constructor() {
		console.log('Hello BandsConfigurator Component');
	}

	/**
	 * Gets twenty configuration
	 * @returns {boolean}
	 */
	public get twenty(): boolean {
		return this.subscription.data.twenty;
	}

	/**
	 * Sets the twenty configuration
	 * @param enabled
	 */
	public set twenty(enabled: boolean) {
		this.subscription.data.twenty = enabled;
		this.updateMessage();
		this.checkValidity();
	}

	/**
	 * Gest the twentytwo properties
	 * @returns {boolean}
	 */
	public get twentytwo(): boolean {
		return this.subscription.data.twentytwo;
	}

	/**
	 * Sets the twentytwo properties
	 * @param enabled
	 */
	public set twentytwo(enabled: boolean) {
		this.subscription.data.twentytwo = enabled;
		this.updateMessage();
		this.checkValidity();
	}

	/**
	 * Get tipps property
	 * @returns {boolean}
	 */
	public get tipps(): boolean {
		return this.subscription.data.tipps;
	}

	/**
	 * Sets the tipps property
	 * @param enabled
	 */
	public set tipps(enabled: boolean) {
		this.subscription.data.tipps = enabled;
		this.updateMessage();
		this.checkValidity();
	}

	/**
	 * Get the highlights
	 * @returns {boolean}
	 */
	public get highlights(): boolean {
		return this.subscription.data.highlights;
	}

	/**
	 * Sets the highlights property
	 * @param enabled
	 */
	public set highlights(enabled: boolean) {
		this.subscription.data.highlights = enabled;
		this.updateMessage();
		this.checkValidity();
	}

	/**
	 * Updates the caption of this subscription
	 */
	private updateMessage(): void {
		this.subscription.caption = "Benachrichte mich über " + this.formatSubscriptionProperties(this.subscription.data);
	}

	/**
	 * Is valid?
	 */
	public checkValidity(): void {
		this.subscription.isValid = (this.extractRawValues(this.subscription.data).filter((enabled: boolean) => enabled).length > 0);
	}

	/**
	 * Format the selected subscription properties
	 * @param data
	 * @returns {string}
	 */
	private formatSubscriptionProperties(data: any): string {
		const captions: Array<string> = [];

		if (typeof data.twenty !== 'undefined') captions.push('TV-Highlights um 20:15');
		if (typeof data.twentytwo !== 'undefined') captions.push('TV-Highlights um 22:15');
		if (typeof data.tipps !== 'undefined') captions.push('TV-Tipps für ganzen Tag');
		if (typeof data.highlights !== 'undefined') captions.push('Spielfilm-Highlights des Tages');

		return captions.join(', ');
	}

	/**
	 * Extract raw properties
	 * @param data
	 * @returns {Array<boolean>}
	 */
	private extractRawValues(data: any): Array<boolean> {
		/**
		 * List of all Fields which must be checked
		 * @type {[boolean,boolean,boolean,boolean]}
		 */
		const validationRules: Array<any> = [
			data.twenty,
			data.twentytwo,
			data.tipps,
			data.highlights
		];

		// go through each validation field and add it's value to another list
		return validationRules.map((field: any) => typeof field !== 'undefined' && field === true);
	}
}
