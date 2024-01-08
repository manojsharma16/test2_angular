import { Component } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-reactive-form',
  templateUrl: './reactive-form.component.html',
  styleUrls: ['./reactive-form.component.css'],
})
export class ReactiveFormComponent {
  gender: any[] = ['Male', 'Female'];
  restrictedName = ['manoj'];

  form = new FormGroup({
    userData: new FormGroup({
      username: new FormControl('', [
        Validators.required,
        this.isRestrictedName.bind(this),
        this.noSpaceValidation.bind(this),
      ]),
      email: new FormControl('', [Validators.required, Validators.email]),
    }),
    gender: new FormControl('', [Validators.required]),
    hobbies: new FormArray([]),
  });

  get hobbies() {
    return this.form.get('hobbies') as FormArray;
  }

  isRestrictedName(control: FormControl): { [s: string]: boolean } {
    if (this.restrictedName.includes(control.value)) {
      return { nameIsRestricted: true };
    }
    return {};
  }

  noSpaceValidation({ value }: AbstractControl): ValidationErrors {
    if (!value) {
      return {
        trimError: { value: 'Control has no value' },
      };
    }
    if (value.startsWith(' ')) {
      return {
        trimError: { value: 'Control has leading whitespace' },
      };
    }
    if (value.endsWith(' ')) {
      return {
        trimError: { value: 'Control has trailing whitespace' },
      };
    }
    return {};
  }

  isRestrictedEmail(control: FormControl): Promise<any> | Observable<any> {
    let promise = new Promise((resolve, reject) => {
      setTimeout(() => {
        if (control.value === 'test@gmail.com') {
          resolve({ restrictedEmail: true });
        } else {
          resolve(null);
        }
      }, 2000);
    });
    return promise;
  }

  onSubmit() {
    console.log(this.form);
  }
  get f() {
    return this.form.get('hobbies') as FormArray;
  }

  onAddHobbies() {
    const control = new FormControl(null, Validators.required);
    // (<FormArray>this.form.get('hobbies')).push(control); //we can use this or below one
    this.f.push(control);
  }

  //below one dosent work in this type of formgroup
  // get f() {
  //   return this.form.controls.hobbies as FormArray;
  // }

  // onAddHobbies() {
  //   const control = new FormControl(null, Validators.required);
  //   (<FormArray>this.form.controls.hobbies).push(control);

  // }
}
