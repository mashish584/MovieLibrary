import { ValidatorFn, AbstractControl } from "@angular/forms";

export function validateDate(type:string):ValidatorFn{
    return (control:AbstractControl):{[key:string]:any} => {
        if(type == "date"){
            return (control.value <= 0 || control.value > 31) ? {forbidden:true}:null;
        }
        if(type == "month"){
            return (control.value <= 0 || control.value > 12) ? {forbidden:true}:null;
        }
        if(type == "year"){
            let currentYear = new Date().getFullYear();
            return (control.value > currentYear) ? {forbidden:true}:null;
        }
    }
}