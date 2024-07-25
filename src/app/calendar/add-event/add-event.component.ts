import { Component, Inject, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EventService } from '../event.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AddEventModel } from 'src/app/model/iEvent';
@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.scss'],
})
export class AddEventComponent  {
  eventForm: FormGroup;
  readonly dialogRef = inject(MatDialogRef<AddEventComponent>);

  constructor(
    private fb: FormBuilder,
    private eventService: EventService,
    @Inject(MAT_DIALOG_DATA) public data: AddEventModel,
  ) {
    console.log(this.data);
    this.eventForm = this.fb.group({
      title: ['', Validators.required],
      date: [new Date(this.data.date), Validators.required],
    });
  }

 

  onSubmit() {
    if (this.eventForm.valid) {
      const { title, date } = this.eventForm.value;
      this.eventService.addEvent(title, date);

      if (this.dialogRef) this.dialogRef.close();
    }
  }

  close() {
    if (this.dialogRef) this.dialogRef.close();
  }
}
