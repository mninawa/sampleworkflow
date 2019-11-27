import { Component, OnInit }    from '@angular/core';
import {Router}                 from '@angular/router';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/delay';
import { Subscription } from "rxjs/Subscription";
import { FindUser }            from '../data/formData.model';
import { MemberInfo }          from '../data/formData.model';
import { FormDataService }     from '../data/formData.service';
import { WorkflowService }     from '../workflow/workflow.service';
import { STEPS }               from '../workflow/workflow.model';

@Component ({
    selector:     'mt-wizard-finduser'
    ,templateUrl: './finduser.component.html'
})

export class FindUserComponent implements OnInit {

    title = 'Find Existing user';
    finduser: FindUser;
    memberInfo:MemberInfo;
    form: any;
    usernotfound: boolean;
    constructor(private router: Router, private formDataService: FormDataService,
        private workflowService: WorkflowService) {
    }

    ngOnInit() {
        this.finduser = this.formDataService.getDefaultUser();
        console.log('User information feature loaded!');
    }



    goToNext(form: any) {

        if (!form.valid) {
            return false;
        }else{
            this.formDataService.getUser(this.finduser.username.replace(/\s/g, "")).subscribe(res => {
                this.memberInfo = res;
               // console.log(res);
                if(this.memberInfo!=null && this.memberInfo.id!=''){
                    this.formDataService.setStateFlow(this.memberInfo);
                    this.workflowService.validateStep(STEPS.personal);
                    this.router.navigate(['/personal'])
                }else{
                    this.usernotfound=true;
                }
            },error => {
                this.usernotfound=true;
                //this.usernotfound=false;
              },
              () => {
                this.usernotfound=true;
                //this.usernotfound=false;
                // 'onCompleted' callback.
                // No errors, route to new page here
              });
        }
        
       
    }
  
    private delay(ms: number) {
        return new Promise( resolve => setTimeout(resolve, ms) );
       }


}