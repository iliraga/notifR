import {Component} from '@angular/core';
import {ISubscription} from "../../../interfaces/subscription.interface";

/*
 Generated class for the FootballConfigurator component.

 See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 for more info on Angular 2 Components.
 */
@Component({
	selector: 'football-configurator',
	templateUrl: 'football-configurator.html',
	inputs: ['subscription']
})
export class FootballConfiguratorComponent {
	private mySubscription: ISubscription = null;

	/**
	 * Subscription which will be extended through this component
	 * @type {any}
	 */
	public get subscription(): ISubscription {
		return this.mySubscription;
	}

	public set subscription(subscription: ISubscription) {
		this.mySubscription = subscription;

		this.mySubscription.data.team = "";
		this.mySubscription.data.goals = false;
		this.mySubscription.data.events = false;
		this.mySubscription.data.result = false;
	}

	constructor() {
		console.log('Hello FootballConfigurator Component');
	}

	public get team(): string {
		return this.subscription.data.team;
	}

	public set team(team: string) {
		this.subscription.data.team = team;
		this.updateMessage();
		this.checkValidity();
	}

	private updateMessage(): void {
		this.subscription.caption = "Benachrichte mich für Team '" + this.subscription.data.team + "'";
	}

	public checkValidity(): void {
		if (typeof this.subscription.data.team === 'undefined') {
			this.subscription.isValid = false;
			return;
		}

		this.subscription.isValid = this.subscription.data.team.trim() !== '';
	}
}
