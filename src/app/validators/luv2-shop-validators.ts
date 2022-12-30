import { FormControl, ValidationErrors } from "@angular/forms";

export class Luv2ShopValidators {

    //whitespace validator
    static notOnlyWhitespace(control:FormControl) : ValidationErrors{
//check only has whitespace
if((control.value != null) && (control.value.trim().length === 0)){
//invalid and return the object
return {'notOnlyWhitespace':true};
}else{
    //valid return null
    return String;
}

    }
}
