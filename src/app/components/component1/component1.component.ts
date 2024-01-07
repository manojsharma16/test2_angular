import {
  Component,
  Injectable,
  PLATFORM_ID,
  Inject,
  ElementRef,
  ViewChild,
} from '@angular/core';
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
  FormArray,
} from '@angular/forms';
import { isPlatformBrowser } from '@angular/common';
@Component({
  selector: 'app-component1',
  templateUrl: './component1.component.html',
  styleUrls: ['./component1.component.css'],
})
export class Component1Component {
  // public form = new FormGroup({
  //   name: new FormControl('', [Validators.required]),
  //   dept: new FormControl('', [Validators.required]),
  //   mobile: new FormControl('', [Validators.required]),
  //   date: new FormControl('', [Validators.required]),
  // });

  public form = this.fb.group({
    name: ['', [Validators.required]],
    dept: ['', [Validators.required]],
    mobile: ['', [Validators.required]],
    date: ['', [Validators.required]],
    image: ['', [Validators.required]],
    sibblings: this.fb.array([]),
  });

  // public form: FormGroup;

  // name = new FormControl('', [Validators.required]);
  // dept = new FormControl('', [Validators.required]);
  // mobile = new FormControl('', [Validators.required]);
  // date = new FormControl('', [Validators.required]);

  public submitted: boolean = false;
  public formArray: any = [];
  isBrowser: boolean;

  constructor(public fb: FormBuilder, @Inject(PLATFORM_ID) platformId: Object) {
    this.isBrowser = isPlatformBrowser(platformId);
    console.log(this.isBrowser);

    // this.form = this.fb.group({
    //   name: ['', [Validators.required]],
    //   dept: ['', [Validators.required]],
    //   mobile: ['', [Validators.required]],
    //   date: ['', [Validators.required]],
    //   sibblings: this.fb.array([]),
    // });

    this.addSibblings();
  }
  get f() {
    return this.form.controls;
  }
  get fsib() {
    return this.form.controls.sibblings.controls;
  }

  get addDynamicElement() {
    return this.form.get('sibblings') as FormArray;
  }

  addSibblings() {
    console.log('hello');
    const lessonForm = this.fb.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
    });
    this.addDynamicElement.push(lessonForm);
  }

  submit() {
    console.log(this.form);
    this.submitted = true;
    if (this.form.valid) {
      this.formArray = this.form.value;
      this.submitted = false;
      // this.form.reset();
      // this.addDynamicElement.clear();
    }
  }
  imageChange(event: any) {
    console.log('event', event);
    if (event.target.files.length > 0) {
      let reader = new FileReader();
      console.log(reader);
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (e: any) => {
        console.log(e.target.result);
        this.form.get('image')?.setValue(e.target.result);
      };
    } else {
      this.form.get('image')?.setValue('');
    }
  }

  selectedFile: any = null;

  // @ViewChild('fileInput') fileInput!: ElementRef;

  // openFileInput() {
  //   // Open the hidden file input programmatically
  //   this.fileInput.nativeElement.click();
  // }

  onFileSelected(event: any): void {
    const fileList: FileList = event.target.files;

    if (fileList.length > 0) {
      // Display the selected image
      const reader = new FileReader();
      reader.onload = (e) => {
        this.selectedFile = e.target?.result;
      };
      reader.readAsDataURL(fileList[0]);
    }
  }
}
