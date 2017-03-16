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
}
