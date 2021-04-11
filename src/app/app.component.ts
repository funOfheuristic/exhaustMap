import { HttpClient } from '@angular/common/http';
import { identifierModuleUrl } from '@angular/compiler';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { fromEvent, Observable, of, Subject } from 'rxjs';
import { delay, exhaustMap, map, mergeMap, toArray } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'rxjs-playground';
  url = `https://gorest.co.in/public-api/users`;
  user$: Observable<any> = new Observable();
  selectedUser: any = {};
  userDetails: any = {};
  json = JSON;
  btnSub: Subject<any> = new Subject();

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.user$ = this.http.get(this.url).pipe(
      map((u: any) =>
        u.data.map((user: any) => {
          return { id: user.id, name: user.name };
        })
      )
    );

    this.btnSub.pipe(exhaustMap(() => this.getData())).subscribe((data) => {
      this.userDetails = data;
      console.log(this.userDetails);
    });
  }

  selectUser(user: any): void {
    this.selectedUser.selected = false;
    this.selectedUser = user;
    this.selectedUser.selected = true;
  }

  getData() {
    console.log('Hi');
    return this.http
      .get(`https://gorest.co.in/public-api/users/${this.selectedUser.id}`)
      .pipe(
        map((u: any) => u.data),
        delay(3000)
      );
  }
}
