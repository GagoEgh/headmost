import { Component, OnInit } from '@angular/core';
import {FormControl, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { UserDataService } from '../../user-data.service';


@Component({
  selector: 'app-change-email',
  templateUrl: './change-email.component.html',
  styleUrls: ['./change-email.component.css']
})
export class ChangeEmailComponent implements OnInit {
  unsubscribe$ = new Subject();
  message = ''
  email = new FormControl(null, [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")])

  constructor(
    public activeModal: NgbActiveModal,
    public userDataService: UserDataService
  ) { }

  ngOnInit(): void {}

  changeEmail() {
    if (this.email.valid) {

      this.userDataService.changeEmail({ email: this.email.value })
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe({
          next:(res:any)=>{
            this.message = res.message;
            this.activeModal.close();
          },
          error:(error)=>{
            this.message = error.error.message
          }
        })
     

      
    }


  }

}
