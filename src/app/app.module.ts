import {NgModule, ErrorHandler} from '@angular/core';
import {IonicApp, IonicModule, IonicErrorHandler} from 'ionic-angular';
import {MyApp} from './app.component';
import {HomePage} from '../pages/home/home';
import {Subscriptions} from "../providers/subscriptions";
import {SubscriptionsPage} from "../pages/subscriptions/subscriptions";
import {ConnectorSelectionPage} from "../pages/connector-selection/connector-selection";
import {ConnectorRenderingHelper} from "../providers/connector-rendering-helper";
import {ComposeSubscriptionPage} from "../pages/compose-subscription/compose-subscription";
import {BandsConfiguratorComponent} from "../components/connectors/bands-configurator/bands-configurator";
import {Push} from "@ionic-native/push";
import {Users} from "../providers/users";
import {NotificationService} from "../providers/notification-service";
import {AboutPage} from "../pages/about/about";
import {FootballConfiguratorComponent} from "../components/connectors/football-configurator/football-configurator";
import {InboxPage} from "../pages/inbox/inbox";

@NgModule({
	declarations: [
		MyApp,
		AboutPage,
		ConnectorSelectionPage,
		ComposeSubscriptionPage,
		HomePage,
		SubscriptionsPage,
		InboxPage,
		BandsConfiguratorComponent,
		FootballConfiguratorComponent
	],
	imports: [
		IonicModule.forRoot(MyApp)
	],
	bootstrap: [IonicApp],
	entryComponents: [
		MyApp,
		AboutPage,
		InboxPage,
		ConnectorSelectionPage,
		SubscriptionsPage,
		ComposeSubscriptionPage,
		BandsConfiguratorComponent,
		FootballConfiguratorComponent,
		HomePage
	],
	providers: [
		Subscriptions,
		ConnectorRenderingHelper,
		Push,
		Users,
		NotificationService,
		
		{provide: ErrorHandler, useClass: IonicErrorHandler}]
})
export class AppModule {
}
