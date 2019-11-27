import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
/* App Root */
import { AppComponent } from "./app.component";
import { NavbarComponent } from "./navbar/navbar.component";

/* Feature Components */
import { PersonalComponent } from "./personal/personal.component";
import { WorkComponent } from "./work/work.component";
import { VerifyComponent } from "./verify/verify.component";
import { AddressComponent } from "./address/address.component";
import { ResultComponent } from "./result/result.component";
import { LoadingScreenComponent } from "./loading-screen/loading-screen.component";
import { FindUserComponent } from "./finduser/finduser.component";
/* Routing Module */
import { AppRoutingModule } from "./app-routing.module";

/* Shared Service */
import { FormDataService } from "./data/formData.service";
import { OnetimepinValidator } from "./data/onetimepin.service";
import { WorkflowService } from "./workflow/workflow.service";
import { LoadingScreenService } from "./data/loading-screen.service";
import { LoadingScreenInterceptor } from "./helpers/loading.interceptor";

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    AppRoutingModule
  ],
  providers: [
    { provide: FormDataService, useClass: FormDataService },
    { provide: LoadingScreenService, useClass: LoadingScreenService },
    { provide: OnetimepinValidator, useClass: OnetimepinValidator },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoadingScreenInterceptor,
      multi: true
    },
    { provide: WorkflowService, useClass: WorkflowService }
  ],

  declarations: [
    AppComponent,
    NavbarComponent,
    FindUserComponent,
    PersonalComponent,
    WorkComponent,
    AddressComponent,
    ResultComponent,
    LoadingScreenComponent,
    VerifyComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
