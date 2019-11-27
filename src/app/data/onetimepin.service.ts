import { ValidatorFn, AbstractControl, FormControl } from "@angular/forms";
import { Http } from "@angular/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { Results,MemberInfo } from "./formData.model";
import { FormDataService }     from './formData.service';
import { TouchSequence } from "selenium-webdriver";
@Injectable()
export class OnetimepinValidator {
   // public server = 'https://devahlssoazurewebsitesnet.azurewebsites.net/';
   public server = 'https://afrocentricsso.azurewebsites.net/';
  public actionUrl = this.server;
  public message = "";
  public memberinfo:MemberInfo;
  constructor(private http: Http,private formDataService: FormDataService) {}

  verifyOneTimePin(userid: string, otp: string): Observable<Results> {
    return this.http
      .post(this.actionUrl + "api/ahl/optverify", { userid: userid, otp: otp })
      .map(response => {
        const output = response.json();
        return new Results(output);
      })
      .catch(this.handleError);
  }

  verifyPassport(userid: string, passport: string): Observable<Results> {
    return this.http
      .post(this.actionUrl + "api/ahl/verifyrsaid", { userid: userid, passport: passport })
      .map(response => {
        const output = response.json();
        return new Results(output);
      })
      .catch(this.handleError);
  }

  verifyUser(username: string): Observable<MemberInfo> {

    return  this.http.post(this.actionUrl+"api/ahl/memberinfo", {email:username})
        .map(response => {
            const output = response.json();
            //return todos.map((todo) => new Todo(todo));
            return new MemberInfo(output);
          }).catch(this.handleError);
  }

  public validateEmail = (control: FormControl) => {


    if (control && (control.value !== null || control.value !== undefined)) {

      //ng-pattern = '/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i'
      const regex = new RegExp("^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$");

      if (!regex.test(control.value)  && control.value!='') {
        return {
            isError: true
        };
    }
    }

    return null;
  };

   
  public validateUsernane = (control: FormControl) => {

   
    if (control && (control.value !== null || control.value !== undefined)) {
      const regex = new RegExp("^[_a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$");

      if (regex.test(control.value) && control.value !== null) {

        this.verifyUser(control.value).subscribe(res => {
          this.memberinfo = res;
          this.formDataService.setStateFlow(res)
        });

      if(this.memberinfo!=null && this.memberinfo.id!=""){

        return { isError: true };
      }else {
        return { isError: false };
      }

    }
    }
    return null;
  };

  public validateOtp = (control: FormControl) => {

    if (control && (control.value !== null || control.value !== undefined)) {
      const regex = new RegExp("^[0-9]{6}$");
     this.memberinfo= this.formDataService.getMemberInfoState();

     //if(this.memberinfo!=null && this.memberinfo.id!=""){

      if (regex.test(control.value) && control.value!='') {
        this.verifyOneTimePin(
          this.memberinfo.id,
          control.value
        ).subscribe(res => {
   
          this.message = res.userMessage;
        },error => {
  
          return { isError: false };
        },
        () => {
          if ("otp has been found" == this.message) {
            return { isError: true };
          }
        });

        if ("otp has been found" == this.message) {
          return { isError: true };
        }

      } else {
        return { isError: false };
      }
    //}
  }

    return null;
  };
  public validatePassport = (control: FormControl) => {

    if (control && (control.value !== null || control.value !== undefined)) {
      const regex = new RegExp("^[0-9]{13}$");
      this.memberinfo= this.formDataService.getMemberInfoState();

      if(this.memberinfo!=null && this.memberinfo.id!=""){
      if (regex.test(control.value)) {
        this.verifyPassport(
         this.memberinfo.id,
          control.value
        ).subscribe(res => {

          this.message = res.userMessage;
        });

        if ("Match" == this.message) {
          return { isError: true };
        }
      } else {
        return { isError: false };
      }
    }
  }

    return null;
  };
  private handleError(error: Response | any) {
    //console.error("ApiService::handleError", error);
    return Observable.throw(error);
  }

  private delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
   }

 
}
