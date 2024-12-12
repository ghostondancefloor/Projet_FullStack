import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import listPlugin from '@fullcalendar/list';
import timeGridPlugin from '@fullcalendar/timegrid';
import { AuthService } from '../services/auth.service';
import { HabitService } from '../services/habit.service';
import { StorageService } from '../services/storage.service'; // Added import for StorageService
import { AddHabitDialogComponent } from './add-habit-dialog/add-habit-dialog.component';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css'],
})
export class CalendarComponent implements OnInit {
  calendarOptions: CalendarOptions = {
    initialView: 'timeGridWeek',
    plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin],
    headerToolbar: {
      left: 'prev,next today addHabit',
      center: 'title',
      right: 'timeGridWeek,dayGridMonth,listWeek',
    },
    customButtons: {
      addHabit: {
        text: 'Add Habit',
        click: () => this.openAddHabitDialog(),
      },
    },
    selectable: true,
    editable: true,
    events: [],
    eventClick: this.handleEventClick.bind(this),
  };

  constructor(
    private habitService: HabitService,
    public dialog: MatDialog,
    private authService: AuthService,
    private storageService: StorageService, // Inject StorageService
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadHabits();
  }

  loadHabits(): void {
    this.habitService.getHabitsForUser().subscribe({
      next: (habits) => {
        this.calendarOptions.events = habits.map((habit: any) => ({
          id: habit._id,
          title: habit.title,
          start: habit.startDate,
          end: habit.endDate,
          description: habit.description,
        }));
      },
      error: (err) => {
        console.error('Error loading habits:', err);
      },
    });
  }

  openAddHabitDialog(): void {
    const dialogRef = this.dialog.open(AddHabitDialogComponent, {
      width: '400px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.habitService.addHabit(result).subscribe(() => {
          this.loadHabits();
        });
      }
    });
  }

  handleEventClick(info: any): void {
    alert(`Event: ${info.event.title}\nDescription: ${info.event.extendedProps.description}`);
  }

  logout(): void {
    this.authService.logout().subscribe({
      next: () => {
        this.storageService.clearUser(); // Clear session data
        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.error('Error during logout:', err);
        this.router.navigate(['/login']);
      },
    });
  }
}
