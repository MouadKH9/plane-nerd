/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { Component, OnInit } from "@angular/core";
import { AnalyticsService } from "./@core/utils/analytics.service";

@Component({
  selector: "ngx-app",
  template: "<router-outlet></router-outlet>",
  styles: ["app.styles.scss"]
})
export class AppComponent implements OnInit {
  constructor(private analytics: AnalyticsService) {}

  ngOnInit() {
    this.analytics.trackPageViews();
  }
}
