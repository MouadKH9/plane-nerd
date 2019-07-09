import { APP_BASE_HREF } from "@angular/common";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from "@angular/core";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { CoreModule } from "./@core/core.module";
import {
  NbPasswordAuthStrategy,
  NbAuthModule,
  NbAuthJWTToken
} from "@nebular/auth";
import { AppComponent } from "./app.component";
import { AppRoutingModule } from "./app-routing.module";
import { ThemeModule } from "./@theme/theme.module";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { environment } from "../environments/environment";
import { AuthGuard } from "./services/auth/auth-guard.service";
import { TokenInterceptor } from "./services/auth/token.interceptor";
import { NbDatepickerModule, NbToastrModule } from "@nebular/theme";
import { Ng2GoogleChartsModule } from "ng2-google-charts";
import { CountUpModule } from "countup.js-angular2";

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgbModule.forRoot(),
    CountUpModule,
    NbDatepickerModule.forRoot(),
    ThemeModule.forRoot(),
    NbToastrModule.forRoot(),
    Ng2GoogleChartsModule,
    CoreModule.forRoot(),
    NbAuthModule.forRoot({
      strategies: [
        NbPasswordAuthStrategy.setup({
          name: "email",
          token: {
            class: NbAuthJWTToken,
            key: "data.token"
          },
          baseEndpoint: environment.base_auth,
          login: {
            endpoint: "auth/login",
            method: "post"
          },
          register: {
            endpoint: "auth/register",
            method: "post"
          },
          logout: {
            endpoint: "auth/logout",
            method: "post"
          }
        })
      ],
      forms: {}
    })
  ],
  bootstrap: [AppComponent],
  providers: [
    { provide: APP_BASE_HREF, useValue: "/" },
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ]
})
export class AppModule {}
