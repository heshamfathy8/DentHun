import { Pipe, PipeTransform } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';

@Pipe({
  name: 'isRequired',
  standalone: true
})
export class IsRequiredPipe implements PipeTransform {

  transform(form: FormGroup<any>, control: string): boolean {
    return  !!form?.get(control)?.hasValidator(Validators.required) ;
  }

}