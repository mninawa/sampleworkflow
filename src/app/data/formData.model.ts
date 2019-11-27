export class FormData {
    firstName: string = '';
    lastName : string = '';
    email: string = '';
    work: string = '';
    street: string = '';
    city: string = '';
    state: string = '';
    zip: string = '';
    id: string = '';
    displayname: string = '';
    membernumber: string = '';
    dependantcode: string = '';
    cloudemail: string = '';
    nexusemail: string = '';
    mobilenumber: string = '';
    username: string = '';
    onetimepin:string ='';
    usecloudmail:string ='1';
    usenexusmail:string ='';
    newemailaddress:string ='';
    status:string ='';
    clear() {
        this.firstName = '';
        this.lastName = '';
        this.email = '';
        this.work = '';
        this.street = '';
        this.city = '';
        this.state = '';
        this.zip = '';
        this.username='';

        this.id='';
        this.displayname='';
        this.membernumber='';
        this.dependantcode='';
        this.cloudemail='';
        this.nexusemail='';
        this.mobilenumber='';
        this.onetimepin='';

    }
}

export class Personal {
    firstName: string = '';
    lastName : string = '';
    email: string = '';
}

export class Address {
    street: string = '';
    city: string = '';
    state: string = '';
    zip: string = '';
}

export class FindUser {
    username: string = '';
}

export class MemberInfo {
    id: string = '';
    displayname: string = '';
    membernumber: string = '';
    dependantcode: string = '';
    cloudemail: string = '';
    nexusemail: string = '';
    mobilenumber: string = '';
    onetimepin:string='';
    usecloudmail:string='';
    usenexusmail:string='';
    newemailaddress:string='';
    status:string='';
    constructor(values: Object = {}) {
        Object.assign(this, values);
      }  
}


export class Results {
    version: string = '';
    status: string = '';
    userMessage: string = '';
    constructor(values: Object = {}) {
        Object.assign(this, values);
      }  
}

