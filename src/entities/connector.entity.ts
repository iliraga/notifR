import {IConnector} from "../interfaces/connector.interface";

export class Connector implements IConnector {
	public id: string;
	public caption: string;
}