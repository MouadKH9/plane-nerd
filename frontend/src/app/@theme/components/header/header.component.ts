import { Component, Input, OnInit } from "@angular/core";

import { NbMenuService, NbSidebarService } from "@nebular/theme";
import { AnalyticsService } from "../../../@core/utils";
import { NbAuthService, NbAuthJWTToken, NbTokenService } from "@nebular/auth";
import { map } from "rxjs/operators";
import { Router } from "@angular/router";

@Component({
  selector: "ngx-header",
  styleUrls: ["./header.component.scss"],
  templateUrl: "./header.component.html"
})
export class HeaderComponent implements OnInit {
  @Input() position = "normal";

  user: any = {};

  userMenu = [{ title: "Profile" }, { title: "Log out" }];
  profilePic: string;
  constructor(
    private sidebarService: NbSidebarService,
    private menuService: NbMenuService,
    private authService: NbAuthService,
    private analyticsService: AnalyticsService,
    private nbMenuService: NbMenuService,
    private token: NbTokenService,
    private router: Router
  ) {
    this.authService.onTokenChange().subscribe((token: NbAuthJWTToken) => {
      if (token.isValid()) {
        // this.adminApi.profile().subscribe((res: any) => {
        //   console.log(res.body.profile);
        //   this.profilePic =
        //     environment.base_url + "file/profile/" + res.body.image;
        // });
      }
    });
    this.nbMenuService
      .onItemClick()
      .pipe(map(({ item: { title } }) => title))
      .subscribe(title => {
        if (title === "Log out") this.logout();
      });
  }

  logout() {
    this.token.clear();
    this.router.navigate(["auth/login"]);
  }

  ngOnInit() {}

  toggleSidebar(): boolean {
    this.sidebarService.toggle(true, "menu-sidebar");

    return false;
  }

  goToHome() {
    this.menuService.navigateHome();
  }

  startSearch() {
    this.analyticsService.trackEvent("startSearch");
  }
}
