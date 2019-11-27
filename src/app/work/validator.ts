import { AbstractControl } from '@angular/forms';

export function  onetimepassValidator( control: AbstractControl) {

  
    if (control && (control.value !== null || control.value !== undefined)) {
        const cnfpassValue = control.value;
            if ('12345' != cnfpassValue) {
                return {
                    isError: true
                };
        }
    }
    return null;
}