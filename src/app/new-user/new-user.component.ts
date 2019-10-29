import { User } from './../models/User.model';
import { Router } from '@angular/router';
import { UserService } from './../services/user.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.scss']
})
export class NewUserComponent implements OnInit {

  // form en methode réactive

  userForm: FormGroup;
  fileIsUploading = false;
  fileUploaded = false;
  image = null;

  constructor(private formBuilder: FormBuilder, private userService: UserService, private router: Router) { }

  ngOnInit() {
    this.initForm();
  }
  initForm() {
    this.userForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName:  ['', Validators.required],
      email:  ['', [Validators.required, Validators.email]],
      drinkPreference:  ['', Validators.required],
      hobbies: this.formBuilder.array([]),
    });
  }
  onSubmitForm(url: string) {
    const formValue = this.userForm.value;
    const newUser = new User();
    newUser.firstName = formValue.firstName;
    newUser.lastName = formValue.lastName;
    newUser.email = formValue.email;
    newUser.drinkPreference = formValue.drinkPreference;
    newUser.hobbies = formValue.hobbies ? formValue.hobbies  : [];
    newUser.url = url;
    this.userService.addUser(newUser);
    this.router.navigate(['/users']);
  }
  getHobbies() {
    return this.userForm.get('hobbies') as FormArray;
  }
  onAddHobby() {
    const newHobbyControl = this.formBuilder.control('' , Validators.required);
    this.getHobbies().push(newHobbyControl);
  }
  onUploadFile() {
    this.fileIsUploading = true;
    this.userService.uploadFile(this.image).then(
      (url: string) => {
        this.onSubmitForm(url);
        this.fileIsUploading = false;
        this.fileUploaded = true;
      }
    );
  }
  detectFiles(event) {
    this.image = event.target.files[0];
  }
}
