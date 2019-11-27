import { Component, OnInit }   from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router'; 
import { MemberInfo }         from '../data/formData.model';
import { Results }            from '../data/formData.model';
import { FormDataService }     from '../data/formData.service';
import { WorkflowService }     from '../workflow/workflow.service';
import { STEPS }               from '../workflow/workflow.model';
import { FormGroup, FormBuilder} from "@angular/forms";
@Component ({
    selector:     'mt-wizard-personal'
    ,templateUrl: './personal.component.html'
})

export class PersonalComponent implements OnInit {
    title = 'User has been found';
    personal: MemberInfo;
    response: Results;
    form: FormGroup;
    radioSel:any;
    radioSelected:string;
    radioSelectedString:string;
    queryId:string;
    isMobile:boolean;
    useNexus:string;
    useCloud:string;
  
    constructor(private router: Router,private route: ActivatedRoute,
         private formDataService: FormDataService,
         private workflowService: WorkflowService) {
    }

    ngOnInit() {
        this.personal = this.formDataService.getMemberInfoState();
        if(this.personal.id==''){
            this.router.navigate(["/"]);
        }
        console.log('Personal feature loaded!');
    }


    save(form: any): boolean {
        if (!form.valid) {
            return false;
        }
            
         this.formDataService.setStateFlow(this.personal);
         return true;
    }

    goToNext(form: any) {
        this.personal = this.formDataService.getMemberInfoState();
        var state = form.controls['setPrime'].value;

        switch(state){
            case 'nexus':
            this.formDataService.sendOneTimePin(this.personal.id,this.personal.mobilenumber.replace(/\s/g, "")).subscribe(res => {
            });
    this.delay(5000);
           this.formDataService.updateMember(this.personal.id,this.personal.nexusemail.replace(/\s/g, "")).subscribe(res => {
            this.response = res;
            if(this.response!=null){
                this.delay(5000);
                this.workflowService.validateStep(STEPS.address);
                this.router.navigate(["/verify"]);
            }
            });
            break;
            case 'cloud':
            this.formDataService.sendOneTimePin(this.personal.id,this.personal.mobilenumber.replace(/\s/g, "")).subscribe(res => {
            });
    this.delay(5000);

          this.formDataService.updateMember(this.personal.id,this.personal.cloudemail.replace(/\s/g, "")).subscribe(res => {

            this.response = res;
            if(this.response!=null){
                this.delay(5000);
                this.workflowService.validateStep(STEPS.address);
                this.router.navigate(["/verify"]);
            }
                });
            break;
        }

    }

    sendOneTimePin(form: any) {

            this.formDataService.sendOneTimePin(this.personal.id,this.personal.mobilenumber.replace(/\s/g, "")).subscribe(res => {
                    });
            this.delay(5000);
            this.formDataService.setStateFlow(this.personal)
            this.workflowService.validateStep(STEPS.work);
            // Navigate to the work page
            this.router.navigate(['/work']);
    }

    delay(ms: number) {
        return new Promise( resolve => setTimeout(resolve, ms) );
       }
}
