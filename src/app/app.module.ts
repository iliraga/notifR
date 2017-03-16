import {NgModule, ErrorHandler} from '@angular/core';
import {IonicApp, IonicModule, IonicErrorHandler} from 'ionic-angular';
import {MyApp} from './app.component';
import {Page1} from '../pages/page1/page1';
import {Page2} from '../pages/page2/page2';
import {HomePage} from '../pages/home/home';
import {Subscriptions} from "../providers/subscriptions";
import {SubscriptionsPage} from "../pages/subscriptions/subscriptions";
import {ConnectorSelectionPage} from "../pages/connector-selection/connector-selection";
import {ConnectorRenderingHelper} from "../providers/connector-rendering-helper";
import {ComposeSubscriptionPage} from "../pages/compose-subscription/compose-subscription";
import {BandsConfiguratorComponent} from "../components/connectors/bands-configurator/bands-configurator";

@NgModule({
	declarations: [
		MyApp,
		Page1,
		Page2,
		ConnectorSelectionPage,
		ComposeSubscriptionPage,
		HomePage,
		SubscriptionsPage,
		BandsConfiguratorComponent
	],
	imports: [
		IonicModule.forRoot(MyApp)
	],
	bootstrap: [IonicApp],
	entryComponents: [
		MyApp,
		Page1,
		Page2,
		ConnectorSelectionPage,
		SubscriptionsPage,
		ComposeSubscriptionPage,
		BandsConfiguratorComponent,
		HomePage
	],
	providers: [
		Subscriptions,
		ConnectorRenderingHelper,
		{provide: ErrorHandler, useClass: IonicErrorHandler}]
})
export class AppModule {
}
