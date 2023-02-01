import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {tap} from "rxjs";

@Component({
  selector: 'app-quiz-results',
  templateUrl: './quiz-results.component.html',
  styleUrls: ['./quiz-results.component.css']
})
export class QuizResultsComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private router: Router) {
  }

  public points!: number

  ngOnInit(): void {
    this.route.queryParams.pipe(
      tap(params => {
        this.points = params['pointSum']
      })
    ).subscribe()
  }

  reTakeTest() {
    this.router.navigate(['/'])
  }
}
