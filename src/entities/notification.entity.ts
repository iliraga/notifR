import {INotification} from "../interfaces/notification.interface";

export class Notification implements INotification {
	public message: string = "";
	public connectorId: string = "";
}