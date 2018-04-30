import { Component } from '@angular/core';

// import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
// import { HomePage } from '../home/home';

import { DayPage } from '../day/day';
import { TestPage } from '../test/test';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = DayPage;
  tab2Root = TestPage;
  tab3Root = ContactPage;

  constructor() {

  }
}
