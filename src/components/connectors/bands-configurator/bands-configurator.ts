import {Component} from '@angular/core';

/*
 Generated class for the BandsConfigurator component.

 See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 for more info on Angular 2 Components.
 */
@Component({
	selector: 'bands-configurator',
	templateUrl: 'bands-configurator.html'
})
export class BandsConfiguratorComponent {

	text: string;

	constructor() {
		console.log('Hello BandsConfigurator Component');
		this.text = 'Hello World';
	}

}
