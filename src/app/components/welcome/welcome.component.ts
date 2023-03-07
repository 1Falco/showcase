import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "user-welcome",
  templateUrl: "./welcome.component.html",
  styleUrls: ["./welcome.component.scss"],
})
export class WelcomeComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {
    console.log("hello");
  }

  navigate() {
    this.router.navigateByUrl('http://localhost:4200/user');
  }
}
