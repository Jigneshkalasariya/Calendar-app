import { Component, OnInit } from '@angular/core';
import { EventService } from '../event.service';
import { Event } from 'src/app/model/iEvent';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { MatDialog } from '@angular/material/dialog';
import { AddEventComponent } from '../add-event/add-event.component';
@Component({
  selector: 'app-view-calandar',
  templateUrl: './view-calandar.component.html',
  styleUrls: ['./view-calandar.component.scss'],
})
export class ViewCalandarComponent implements OnInit {
  dates: Date[] = [];
  events: Event[] = [];
  currentMonth: Date = new Date();

  constructor(
    private eventService: EventService,
    private dialog: MatDialog,
  ) {}

  ngOnInit() {
    this.loadDates();
    this.eventService.events$.subscribe((events) => {
      this.events = events;
    });
  }

  getEvents(date: Date): Event[] {
    return this.events.filter(
      (app) => app.date.toDateString() === date.toDateString(),
    );
  }

  drop(event: CdkDragDrop<Event[]>, targetDate: Date) {
    const prevContainerData = event.previousContainer.data as Event[];
    const currContainerData = event.container.data as Event[];

    if (!prevContainerData || !currContainerData) {
      console.error('Data is missing or invalid.');
      return;
    }

    if (event.previousContainer === event.container) {
      moveItemInArray(
        currContainerData,
        event.previousIndex,
        event.currentIndex,
      );
    } else {
      const movedEvent = prevContainerData[event.previousIndex];
      if (!movedEvent) {
        console.error('No event found at the previous index.');
        return;
      }

      movedEvent.date = targetDate;
      //this.eventService.moveEvent(movedEvent);

      transferArrayItem(
        prevContainerData,
        currContainerData,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }

  loadDates() {
    this.dates = this.getDatesOfMonth(this.currentMonth);
  }

  getDatesOfMonth(date: Date): Date[] {
    const start = new Date(date.getFullYear(), date.getMonth(), 1);
    const end = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    const dates: Date[] = [];

    const currentDate = start;
    while (currentDate <= end) {
      dates.push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + 1);
    }

    return dates;
  }

  previousMonth() {
    const newDate = new Date(this.currentMonth);
    newDate.setMonth(newDate.getMonth() - 1);
    this.currentMonth = newDate;
    this.loadDates();
  }

  nextMonth() {
    const newDate = new Date(this.currentMonth);
    newDate.setMonth(newDate.getMonth() + 1);
    this.currentMonth = newDate;
    this.loadDates();
  }

  openDialog(date: Date) {
    this.dialog.closeAll();
    this.dialog.open(AddEventComponent, {
      width: '500px',
      data: {
        date,
      },
      hasBackdrop: false,
      disableClose: true,
    });
  }

  deleteEvent(event: Event, nativeEvent: MouseEvent) {
    nativeEvent.stopPropagation(); // Prevent the click event from propagating to parent elements

    if (confirm('Are you sure you want to delete this event?')) {
      this.eventService.deleteEvent(event.id);
    }
  }
}
