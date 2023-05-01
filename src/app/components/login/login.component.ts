import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(private http: HttpClient) {}

  ngOnInit(): void {}
  onSubmit(form: NgForm) {
    const email = form.value.email;
    const password = form.value.password;

    // console.log(email, password);
    this.http
      .post('http://localhost:8000/api/login', {
        email: email,
        password: password,
      })
      .subscribe(
        (res) => {
          console.log(res);
        },
        (err) => {
          console.log(err);
        }
      );
  }
}
