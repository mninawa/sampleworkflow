import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { MemberInfo } from "../data/formData.model";
import { FormDataService } from "../data/formData.service";
import { OnetimepinValidator } from "../data/onetimepin.service";
import { WorkflowService } from "../workflow/workflow.service";
import { STEPS } from "../workflow/workflow.model";

@Component({
  selector: "mt-wizard-verify",
  templateUrl: "./verify.component.html"
})
export class VerifyComponent implements OnInit {
  title = "ONE TIME PIN";
  workType: string;
  form: FormGroup;
  memberinfo: MemberInfo;
  onetimepinValid: boolean;
  onetimepinInvalid: boolean;
  passportInvalid: boolean;
  passportValid: boolean;
  emailValid: boolean;
  emailInvalid: boolean;
  emailTaken: boolean;
  public RedirectUrl = "";

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private formDataService: FormDataService,
    private scv: OnetimepinValidator,
    private workflowService: WorkflowService
  ) {
    this.form = this.fb.group({
      onetimepin: [null, Validators.maxLength(6)],
      identityno: [null, Validators.maxLength(14)],
      email: [null, Validators.maxLength(150)]
    });
  }

  ngOnInit() {
    this.workType = this.formDataService.getWork();
    this.memberinfo = this.formDataService.getMemberInfoState();

    console.log("Work feature loaded!");
    if (this.memberinfo.id == "") {
      this.router.navigate(["/"]);
    }
  }
  delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  sendOneTimePin(form: any) {
    this.formDataService
      .sendOneTimePin(
        this.memberinfo.id,
        this.memberinfo.mobilenumber.replace(/\s/g, "")
      )
      .subscribe(res => {
      });
    this.formDataService.setStateFlow(this.memberinfo);
  }

  goToNext(form: any) {

    // this.formDataService
    //   .updateMember(this.memberinfo.id, this.form.controls.email.value)
    //   .subscribe(res => {
    //     // this.RedirectUrl = res.userMessage;
    //   });
    // this.memberinfo.newemailaddress = this.form.controls.email.value;
    this.formDataService.setStateFlow(this.memberinfo);
    this.delay(5000);
    this.router.navigate(["/address"]);

  }

  onOnetimePinValidate(event) {

    const regex = new RegExp("^[0-9]{6}$");

    if (regex.test(event.target.value) && event.target.value != "") {
      this.formDataService
        .verifyOneTimePin(this.memberinfo.id, event.target.value)
        .subscribe(
          res => {
            this.onetimepinValid = true;
            this.onetimepinInvalid = false;
          },
          error => {
            this.onetimepinValid = false;
            this.onetimepinInvalid = true;
          },
          () => {
            // this.onetimepinInvalid=false;
          }
        );
    } else {
      this.onetimepinValid = false;
      this.onetimepinInvalid = false;
    }
  }
  onEmailValidate(event) {

    const regex = new RegExp( "^[_a-z0-9]+(.[_a-z0-9]+)*@[a-z0-9-]+(.[a-z0-9-]+)*(.[a-z]{2,4})$" );

    if (
      regex.test(event.target.value.toLowerCase()) &&
      event.target.value != ""
    ) {
      this.emailValid = true;
      this.emailInvalid = false;
      this.emailTaken = null;
    } else {
      this.emailValid = false;
      this.emailInvalid = true;
      this.emailTaken = null;
    }

    if (
      regex.test(event.target.value.toLowerCase()) &&
      event.target.value != ""
    ) {
      this.formDataService.getUser(event.target.value).subscribe(
        res => {
          if (res.id != null) {
            this.emailTaken = true;
            this.emailValid = null;
            this.emailInvalid = null;
          }else{
            this.emailTaken = false;
            this.emailValid = null;
            this.emailInvalid = null;
          }
        },
        error => {
        
        },
        () => {
          
          // this.onetimepinInvalid=false;
        }
      );
    }
  }

  onPassportValidate(event) {
    console.log(event.target.value);

    const regex = new RegExp("^[0-9]{13}$");

    if (regex.test(event.target.value) && event.target.value != "") {
      this.formDataService
        .verifyPassport(this.memberinfo.id, event.target.value)
        .subscribe(
          res => {
            this.passportValid = true;
            this.passportInvalid = false;
          },
          error => {
            this.passportValid = false;
            this.passportInvalid = true;
          },
          () => {
          }
        );
    } else {
      this.passportValid = false;
      this.passportInvalid = false;
    }
  }
}
