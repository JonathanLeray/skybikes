import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import {UsersService} from '../../services/users.service';
import {User} from '../../models/User.model';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  signupForm: FormGroup;
  errorMessage: string;
  fileIsUploading = false;
  fileUrl: string;
  fileUploaded = false;

  constructor(private formBuilder: FormBuilder,
              private authService: AuthService,
              private usersService: UsersService,
              private router: Router) { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.signupForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern(/[0-9a-zA-Z]{6,}/)]],
      firstname: ['', [Validators.required, Validators.pattern(/[a-zA-Z]/)]],
      lastname: ['', [Validators.required, Validators.pattern(/[a-zA-Z]/)]],
      emergencyPhoneNumber: ['', [Validators.required, Validators.pattern(/[0-9]/)]]
    });
  }

  onSubmit() {
    const email = this.signupForm.get('email').value;
    const password = this.signupForm.get('password').value;
    const firstname = this.signupForm.get('firstname').value;
    const lastname = this.signupForm.get('lastname').value;
    const emergencyPhoneNumber = this.signupForm.get('emergencyPhoneNumber').value;
    const profile = 'member';

    this.authService.createNewUser(email, password).then(
      () => {
        const newUser = new User(email, firstname, lastname, emergencyPhoneNumber, profile);
        if (this.fileUrl && this.fileUrl !== '') {
          newUser.photo = this.fileUrl;
        }
        this.usersService.createNewUser(newUser);
        this.authService.signInUser(email, password).then(
          () => {
            this.router.navigate(['/bikes']);
          },
          (error) => {
            this.errorMessage = error;
          }
        );
      },
      (error) => {
        this.errorMessage = error;
      }
    );
  }

  onUploadFile(file: File) {
    this.fileIsUploading = true;
    this.usersService.uploadFile(file).then(
      (url: string) => {
        this.fileUrl = url;
        this.fileIsUploading = false;
        this.fileUploaded = true;
      }
    );
  }

  detectFiles(event) {
    this.onUploadFile(event.target.files[0]);
  }
}
