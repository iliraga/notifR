import {Component} from '@angular/core';
import {ISubscription} from "../../../interfaces/subscription.interface";

interface IFootballData {
	team: string;
	events: boolean;
	goals: boolean;
	result: boolean;
}

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

	/**
	 * Gets team name
	 * @returns {string}
	 */
	public get team(): string {
		return this.subscription.data.team;
	}

	/**
	 * Sets team name
	 * @param team
	 */
	public set team(team: string) {
		this.subscription.data.team = team;
		this.checkDirty();
	}

	/**
	 * Subscribe to events?
	 */
	public get events(): boolean {
		return this.subscription.data.events;
	}

	/**
	 * Sets the subscribe events
	 * @param enabled
	 */
	public set events(enabled: boolean) {
		this.subscription.data.events = enabled;
		this.checkDirty();
	}

	/**
	 * Goals events
	 * @returns {boolean}
	 */
	public get goals(): boolean {
		return this.subscription.data.goals;
	}

	/**
	 * Goals
	 * @param enabled
	 */
	public set goals(enabled: boolean) {
		this.subscription.data.goals = enabled;
		this.checkDirty();
	}

	/**
	 * Result
	 */
	public get result(): boolean {
		return this.subscription.data.result;
	}

	/**
	 * Resultate
	 * @param enabled
	 */
	public set result(enabled: boolean) {
		this.subscription.data.result = enabled;
		this.checkDirty();
	}

	/**
	 * Updates the message
	 */
	private updateMessage(): void {
		this.subscription.caption = "Benachrichte mich für Team '" + this.subscription.data.team + "'";
	}

	/**
	 * Checks validity of subscription
	 */
	private checkValidity(): void {
		const data: IFootballData = this.subscription.data;
		const countToggledFields: number = this.extractRawValues(data).filter((enabled: boolean) => enabled).length;

		this.subscription.isValid = data.team.trim() !== '' && countToggledFields > 0
	}

	/**
	 * Check whether subscription is dirty
	 */
	private checkDirty(): void {
		this.updateMessage();
		this.checkValidity();
	}

	/**
	 * Extract raw properties
	 * @param data
	 * @returns {Array<boolean>}
	 */
	private extractRawValues(data: IFootballData): Array<boolean> {
		/**
		 * List of all Fields which must be checked
		 * @type {[boolean,boolean,boolean,boolean]}
		 */
		const validationRules: Array<any> = [
			data.events,
			data.goals,
			data.result
		];

		// go through each validation field and add it's value to another list
		return validationRules.map((field: any) => typeof field === 'boolean' && field === true);
	}
}
