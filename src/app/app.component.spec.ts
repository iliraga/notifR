import {async, TestBed} from '@angular/core/testing';
import {IonicModule} from 'ionic-angular';

import {MyApp} from './app.component';
import {Users} from "../providers/users";
import {NotificationService} from "../providers/notification-service";
import {Push} from "@ionic-native/push";

describe('MyApp Component', () => {
	let fixture;
	let component;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [MyApp],
			imports: [
				IonicModule.forRoot(MyApp)
			],
			providers: [Users, NotificationService, Push]
		})
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(MyApp);
		component = fixture.componentInstance;
	});

	it('should be created', () => {
		expect(component instanceof MyApp).toBe(true);
	});

	it('should have two pages', () => {
		expect(component.pages.length).toBe(4);
	});

});
