import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-component2',
  templateUrl: './component2.component.html',
  styleUrls: ['./component2.component.css'],
})
export class Component2Component {
  @ViewChild('f') submittedForm!: NgForm; //using viewclild is better bec we will not delay of the submit but to get form day in other event binding also we can use it like below
  firstname: string = 'Manoj';
  lastname: string = 'Sharma';
  comment: string = 'Hello sir, how are you!';

  onDataInput() {
    console.log(this.submittedForm);
  }

  onSubmit() {
    console.log(this.submittedForm);
  }
  //if not using viewchild
  // onSubmit(f: NgForm) {
  //   console.log(f);
  // }

  fillValuesAll() {
    this.submittedForm.form.setValue({
      username: 'auto username',
      email: 'auto@email.com',
      fullName: {
        firstname: 'auto first name',
        lastname: 'auto last name',
      },
      comment: 'this is auto generated comment',
      gender: 'female',
      course: 'bsc',
    });
  }
  fillValuesSome() {
    this.submittedForm.form.patchValue({
      username: 'auto username',
      email: 'auto@email.com',
    });
  }

  reset() {
    this.submittedForm.reset();
  }
}
