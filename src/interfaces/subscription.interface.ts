export interface ISubscription {
	id: string;

	connectorId: string;

	caption: string;

	data: any;

	isValid: boolean;
}