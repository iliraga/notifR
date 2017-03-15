import {NgModule, ErrorHandler} from '@angular/core';
import {IonicApp, IonicModule, IonicErrorHandler} from 'ionic-angular';
import {MyApp} from './app.component';
import {Page1} from '../pages/page1/page1';
import {Page2} from '../pages/page2/page2';
import {HomePage} from '../pages/home/home';
import {Subscriptions} from "../providers/subscriptions";
import {SubscriptionsPage} from "../pages/subscriptions/subscriptions";

@NgModule({
	declarations: [
		MyApp,
		Page1,
		Page2,
		HomePage,
		SubscriptionsPage
	],
	imports: [
		IonicModule.forRoot(MyApp)
	],
	bootstrap: [IonicApp],
	entryComponents: [
		MyApp,
		Page1,
		Page2,
		SubscriptionsPage,
		HomePage
	],
	providers: [
		Subscriptions,
		{provide: ErrorHandler, useClass: IonicErrorHandler}]
})
export class AppModule {
}
