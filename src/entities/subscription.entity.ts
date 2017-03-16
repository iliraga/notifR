import {ISubscription} from "../interfaces/subscription.interface";

export class Subscription implements ISubscription {
	public id: string;
	public connectorId: string;
	public caption: string;
	public data: any;
}