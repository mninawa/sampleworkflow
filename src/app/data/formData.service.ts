
import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { FormData, Personal, Address, FindUser, MemberInfo,Results }       from './formData.model';
import { WorkflowService }                   from '../workflow/workflow.service';
import { STEPS }                             from '../workflow/workflow.model';

@Injectable()
export class FormDataService {

    private formData: FormData = new FormData();
    private isPersonalFormValid: boolean = false;
    private isWorkFormValid: boolean = false;
    private isAddressFormValid: boolean = false;

   // public server = 'https://devahlssoazurewebsitesnet.azurewebsites.net/';
    public server = 'https://afrocentricsso.azurewebsites.net/';
    public actionUrl= this.server;

    constructor(private http: Http,private workflowService: WorkflowService) { 
        
    }

    getPersonal(): Personal {
        // Return the Personal data
        var personal: Personal = {
            firstName: this.formData.firstName,
            lastName: this.formData.lastName,
            email: this.formData.email
        };
        return personal;
    }

    setPersonal(data: Personal) {
        // Update the Personal data only when the Personal Form had been validated successfully
        this.isPersonalFormValid = true;
        this.formData.firstName = data.firstName;
        this.formData.lastName = data.lastName;
        this.formData.email = data.email;
        // Validate Personal Step in Workflow
        this.workflowService.validateStep(STEPS.personal);
    }

    getWork() : string {
        // Return the work type
        return this.formData.work;
    }
    
    setWork(data: string) {
        // Update the work type only when the Work Form had been validated successfully
        this.isWorkFormValid = true;
        this.formData.work = data;
        // Validate Work Step in Workflow
        this.workflowService.validateStep(STEPS.work);
    }

    getAddress() : Address {
        // Return the Address data
        var address: Address = {
            street: this.formData.street,
            city: this.formData.city,
            state: this.formData.state,
            zip: this.formData.zip
        };
        return address;
    }

    setAddress(data: Address) {
        // Update the Address data only when the Address Form had been validated successfully
        this.isAddressFormValid = true;
        this.formData.street = data.street;
        this.formData.city = data.city;
        this.formData.state = data.state;
        this.formData.zip = data.zip;
        // Validate Address Step in Workflow
        this.workflowService.validateStep(STEPS.address);
    }
    setStateFlow(data: MemberInfo) {

        this.formData.id=data.id;
        this.formData.displayname=data.displayname;
        this.formData.membernumber=data.membernumber;
        this.formData.dependantcode=data.dependantcode;
        this.formData.cloudemail=data.cloudemail;
        this.formData.nexusemail=data.nexusemail;
        this.formData.mobilenumber=data.mobilenumber;
        this.formData.onetimepin=data.onetimepin;
        this.formData.newemailaddress=data.newemailaddress;
        this.formData.status=data.status;
        // Update the Address data only when the Address Form had been validated successfully
       // this.isAddressFormValid = true;

        //this.workflowService.validateStep(STEPS.work);
    }

    getMemberInfoState() {

           // Return the Address data
           var memberInfo: MemberInfo = {
            id:this.formData.id,
            displayname:this.formData.displayname,
            membernumber:this.formData.membernumber,
            dependantcode:this.formData.dependantcode,
            cloudemail:this.formData.cloudemail,
            nexusemail:this.formData.nexusemail,
            mobilenumber:this.formData.mobilenumber,
            onetimepin:this.formData.onetimepin,
            usecloudmail:this.formData.usecloudmail,
            usenexusmail:this.formData.usenexusmail,
            newemailaddress:this.formData.newemailaddress,
            status:this.formData.status
        };
        return memberInfo;
    }
    getFormData(): FormData {
        // Return the entire Form Data
        return this.formData;
    }

    resetFormData(): FormData {
        // Reset the workflow
        this.workflowService.resetSteps();
        // Return the form data after all this.* members had been reset
        this.formData.clear();
        this.isPersonalFormValid = this.isWorkFormValid = this.isAddressFormValid = false;
        return this.formData;
    }

    isFormValid() {
        // Return true if all forms had been validated successfully; otherwise, return false
        return this.isPersonalFormValid &&
                this.isWorkFormValid && 
                this.isAddressFormValid;
    }
    
    newPassword(password: string,userid:string): Observable<Results>  {

        return  this.http.post(this.actionUrl+"api/member/resetpassword", {password:password,userid:userid})
        .map(response => {
            const output = response.json();
            return new Results(output);
          }) .catch(this.handleError);
      }

    getUser(username: string): Observable<MemberInfo>  {

        return  this.http.post(this.actionUrl+"api/ahl/memberinfo", {email:username})
        .map(response => {
            const output = response.json();
            //return todos.map((todo) => new Todo(todo));
            return new MemberInfo(output);
          }) .catch(this.handleError);
      }

      getMemberInfo(userid: string): Observable<MemberInfo>  {

        return  this.http.post(this.actionUrl+"api/ahl/memberinfobyid", {userid:userid})
        .map(response => {
            const output = response.json();
            return new MemberInfo(output);
          }) .catch(this.handleError);
      }
      getMemberInfoByMemberNo(member: string): Observable<MemberInfo>  {

        return  this.http.post(this.actionUrl+"api/ahl/memberinfobymemberno", {memberno:member})
        .map(response => {
            const output = response.json();
            return new MemberInfo(output);
          }) .catch(this.handleError);
      }

      updateMember(userid: string,email:string): Observable<Results>  {

        return  this.http.post(this.actionUrl+"api/member/update", {userid:userid,email:email})
        .map(response => {
            const output = response.json();
            return new Results(output);
          }) .catch(this.handleError);
      }

      sendOneTimePin(userid: string,mobile:string): Observable<Results>  {

        return  this.http.post(this.actionUrl+"api/ahl/assertopt", {userid:userid,mobile:mobile})
        .map(response => {
            const output = response.json();
            return new Results(output);
          }) .catch(this.handleError);
      }
      getAssertionLink(userid: string): Observable<Results>  {

        return  this.http.post(this.actionUrl+"api/ahl/assertionlink", {userid:userid})
        .map(response => {
            const output = response.json();
            return new Results(output);
          }) .catch(this.handleError);
      }
      
      verifyOneTimePin(userid: string,otp:string): Observable<Results>  {

        return  this.http.post(this.actionUrl+"api/ahl/optverify", {userid:userid,otp:otp})
        .map(response => {
            const output = response.json();
            return new Results(output);
          }) .catch(this.handleError);
      }
      verifyPassport(userid: string, passport: string): Observable<Results> {
          var integers =0;
        return this.http
          .post(this.actionUrl + "api/ahl/verifyrsaid", { userid: userid, passport: passport })
          .map(response => {
            const output = response.json();
            return new Results(output);
          })
          .catch(this.handleError);
      }

      getDefaultUser(): FindUser {
        // Return the Personal data
        var user: FindUser = {
            username: this.formData.username
        };
        return user;
    }
    private handleError (error: Response | any) {
        //console.error('ApiService::handleError', error);
        return Observable.throw(error);
      }
}