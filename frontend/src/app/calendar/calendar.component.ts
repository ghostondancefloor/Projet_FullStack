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
import { StorageService } from '../services/storage.service';
import { AddHabitDialogComponent } from './add-habit-dialog/add-habit-dialog.component';
import { ModifyHabitDialogComponent } from './modify-habit-dialog/modify-habit-dialog.component';
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
      left: 'prev,next today',
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
    private storageService: StorageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadHabits();
  }

  openAddHabitDialog(): void {
    const dialogRef = this.dialog.open(AddHabitDialogComponent, {
      width: '400px',
    });
  
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.loadHabits(); // Refresh calendar after adding a habit
      }
    });
  }
  
  loadHabits(): void {
  this.habitService.getHabitEvents().subscribe({
    next: (events) => {
      console.log('Loaded Events:', events); // Debugging
      this.calendarOptions.events = events;
    },
    error: (err) => {
      console.error('Error loading habits:', err);
    },
  });
}

  
  
  
  
  deleteHabit(habitId: string): void {
    this.habitService.deleteHabit(habitId).subscribe({
      next: () => {
        alert('Habit deleted successfully!');
        this.loadHabits(); // Refresh habits after deletion
      },
      error: (err) => {
        console.error('Error deleting habit:', err);
      },
    });
  }
  handleEventClick(info: any): void {
    const habit = {
      _id: info.event.id,
      habit: info.event.title,
      description: info.event.extendedProps.description,
      date: info.event.start.toISOString().split('T')[0],
      time: info.event.start.toISOString().split('T')[1].slice(0, 5),
      duration: (new Date(info.event.end).getTime() - new Date(info.event.start).getTime()) / 60000,
    };
  
    if (confirm(`Do you want to modify the habit: "${info.event.title}"?`)) {
      this.modifyHabit(habit);
    }
  }
  
  
  

  goToProfile(): void {
    this.router.navigate(['/profile']); // Navigate to profile page
  }

  logout(): void {
    this.authService.logout().subscribe({
      next: () => {
        this.storageService.clearUser();
        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.error('Error during logout:', err);
        this.router.navigate(['/login']);
      },
    });
  }

  modifyHabit(habit: any): void {
    const dialogRef = this.dialog.open(ModifyHabitDialogComponent, {
      width: '400px',
      data: habit // Pass the habit to be modified
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadHabits(); // Reload calendar events after modification
      }
    });
  }
}
