import { Component, OnInit }   from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Address,MemberInfo }             from '../data/formData.model';
import { FormDataService }     from '../data/formData.service';

@Component ({
    selector:     'mt-wizard-address'
    ,templateUrl: './address.component.html'
})

export class AddressComponent implements OnInit {
    title = 'Set New Password';
    address: Address;
   // form: any;
    personal: MemberInfo;
    [x: string]: any;
    ResponseResetForm: FormGroup;
    forbiddenEmails: any;
    errorMessage: string;
    successMessage: string;
    resetToken: null;
    CurrentState: any;
    IsResetFormValid = true;
    
    constructor(
        private router: Router,
        private formDataService: FormDataService,
        private route: ActivatedRoute,
        private fb: FormBuilder ) {
    
        this.CurrentState = 'Wait';

      }

   

    ngOnInit() {
        this.personal = this.formDataService.getMemberInfoState();
        if(this.personal.id==''){
            this.router.navigate(["/"]);
        }
        this.Init();
    }

    Init() {
        this.ResponseResetForm = this.fb.group(
          {
            resettoken: [this.resetToken],
            newPassword: ['', [Validators.required, Validators.minLength(4)]],
            confirmPassword: ['', [Validators.required, Validators.minLength(4)]]
          }
        );
      }

      Validate(passwordFormGroup: FormGroup) {
        const new_password = passwordFormGroup.controls.newPassword.value;
        const confirm_password = passwordFormGroup.controls.confirmPassword.value;
    
        if (confirm_password.length <= 0) {
          return null;
        }
    
        if (confirm_password !== new_password) {
          return {
            doesNotMatch: true
          };
        }
    
        return null;
      }

      ResetPassword(form) {
      
        const confirm_password = this.ResponseResetForm.controls.confirmPassword.value;
        if (form.valid) {
          this.IsResetFormValid = true;
          this.formDataService.newPassword(confirm_password,this.personal.id).subscribe(
            data => {
              this.successMessage = 'Your password has been reset.';
              setTimeout(() => {
                this.successMessage = null;
               // window.location.href='https://fhfamilyroom2.cagan.tech/login/'
                window.location.href='https://www.fedhealth.co.za/login/'
              }, 3000);
            },
            err => {
            //   if (err.error.message) {
            //     this.errorMessage = err.error.;
            //   }
            }
          );
        } else { 
            this.IsResetFormValid = false; }
      }
}