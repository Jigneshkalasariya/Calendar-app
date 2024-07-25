import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Event } from '../model/iEvent';

@Injectable({
  providedIn: 'root',
})
export class EventService {
  private eventSubject = new BehaviorSubject<Event[]>([]);
  events$ = this.eventSubject.asObservable();

  private events: Event[] = [];
  private idCounter = 0;

  addEvent(title: string, date: Date) {
    const event: Event = { id: this.idCounter++, title, date };
    this.events.push(event);
    this.eventSubject.next(this.events);
  }

  deleteEvent(id: number) {
    this.events = this.events.filter((event) => event.id !== id);
    this.eventSubject.next(this.events);
  }

  moveEvent(id: number, newDate: Date) {
    const event = this.events.find((app) => app.id === id);
    if (event) {
      event.date = newDate;
      this.eventSubject.next(this.events);
    }
  }
}
