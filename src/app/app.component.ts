import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements AfterViewInit {
  date: any;
  now: any;
  targetDate: any = new Date(2022, 11, 19, 20, 25);
  targetTime: any = this.targetDate.getTime();
  difference: number;
  months: Array<string> = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  currentTime: any = `${
    this.months[this.targetDate.getMonth()]
  } ${this.targetDate.getDate()}, ${this.targetDate.getFullYear()}`;

  @ViewChild('days', { static: true }) days: ElementRef;
  @ViewChild('hours', { static: true }) hours: ElementRef;
  @ViewChild('minutes', { static: true }) minutes: ElementRef;
  @ViewChild('seconds', { static: true }) seconds: ElementRef;

  ngAfterViewInit() {
    setInterval(() => {
      this.tickTock();
      this.difference = this.targetTime - this.now;
      this.difference = this.difference / (1000 * 60 * 60 * 24);

      !isNaN(this.days.nativeElement.innerText)
        ? (this.days.nativeElement.innerText = Math.floor(this.difference))
        : (this.days.nativeElement.innerHTML = `<img src="https://i.gifer.com/VAyR.gif" />`);
    }, 1000);
  }

  tickTock() {
    this.date = new Date();
    this.now = this.date.getTime();
    this.days.nativeElement.innerText = Math.floor(this.difference);
    if (this.targetDate.getHours() - this.date.getHours() < 0) {
      this.hours.nativeElement.innerText = this.targetDate.getHours() - this.date.getHours() + 23;  
    } else {
      this.hours.nativeElement.innerText = this.targetDate.getHours() - this.date.getHours();  
    }
    if (this.targetDate.getMinutes() - this.date.getMinutes() < 0) {
      this.minutes.nativeElement.innerText = this.targetDate.getMinutes() - this.date.getMinutes() + 59;  
    } else {
      this.minutes.nativeElement.innerText = this.targetDate.getMinutes() - this.date.getMinutes() - 1;  
    }
    this.seconds.nativeElement.innerText = 60 - this.date.getSeconds();
  }
}
