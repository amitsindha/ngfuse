import { egretAnimations } from "../../../../shared/animations/egret-animations";
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from "@angular/router";

@Component({
  selector: 'app-members-popup',
  templateUrl: './app-members-popup.component.html',
  styleUrls: ['./app-members-popup.component.css'],
  animations: egretAnimations
})

export class AppMembersPopupComponent implements OnInit {
  public itemForm: FormGroup;
  
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<AppMembersPopupComponent>,
    private fb: FormBuilder,
    private router: Router,
    private snack: MatSnackBar,
  ) { }
  
  ngOnInit() {      
    this.buildItemForm(this.data.payload)
  }
  
  buildItemForm(item) {
    this.itemForm = this.fb.group({
      name: [item.name || '', Validators.required],
      age: [item.age || ''],
      email: [item.email || ''],
      company: [item.company || ''],
      phone: [item.phone || ''],
      address: [item.address || ''],
      balance: [item.balance || ''],
      isActive: [item.isActive || false]
    })
  }
  
  submit() {
    if(!localStorage.getItem('ngFuseToken')) {
        this.snack.open('Session Expired !!! ', 'OK');
        //this.router.navigate(['/sessions/signin']); 
    } else {
        this.dialogRef.close(this.itemForm.value)
    }  
  }
  
}