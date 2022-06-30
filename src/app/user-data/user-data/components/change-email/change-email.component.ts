import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-change-email',
  templateUrl: './change-email.component.html',
  styleUrls: ['./change-email.component.css']
})
export class ChangeEmailComponent implements OnInit {
  newEmail!: FormGroup
  constructor(
    private fb: FormBuilder,
    public activeModal: NgbActiveModal
  ) { }

  initForm() {
    return this.fb.group({
      oldEmail: ['', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      newEmail: ['', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]]
    })
  }

  ngOnInit(): void {
    this.newEmail = this.initForm()
  }

  changeEmail(){
    this.activeModal.close();
  }

}
