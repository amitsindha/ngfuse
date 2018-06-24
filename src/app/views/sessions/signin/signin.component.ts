import { Component, OnInit, ViewChild } from '@angular/core';
import { MatProgressBar, MatButton, MatSnackBar } from '@angular/material';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { SessionService } from '../sessions.service';
import { Router } from '@angular/router';
import { AuthGuard } from '../../../shared/services/auth/auth.guard';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  @ViewChild(MatProgressBar) progressBar: MatProgressBar;
  @ViewChild(MatButton) submitButton: MatButton;

  signinForm: FormGroup;

  constructor(private router: Router, private sessionService: SessionService, private snack: MatSnackBar) { 
     if(sessionService.isLoggedIn()) {
        //console.log(this.router.navigate(['dashboard']));
        this.router.navigate(['dashboard']); 
      }    
  }

  ngOnInit() {
    this.signinForm = new FormGroup({
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      rememberMe: new FormControl(false)
    })
  }

  signin() {
    const signinData = this.signinForm.value
    
    this.submitButton.disabled = true;
    this.progressBar.mode = 'indeterminate';
   
    this.sessionService.logIn(signinData).subscribe(data => {
        //console.log('signinData ::: '+signinData.email);        
        localStorage.setItem('ngFuseToken', JSON.stringify(data));
        //console.log('localStorage setting ::: '+JSON.stringify(data));             
        this.router.navigate(['dashboard']);     
      }, error => {                             
          this.snack.open('Login Failed: 401 Aunothorised !!! ', 'OK');
          this.submitButton.disabled = false;
          this.progressBar.mode = 'determinate';
      })
  }

  


}
