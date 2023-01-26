import {Component, OnInit} from '@angular/core';
import {ClientService} from "../shared/client.service";
import {map, tap} from "rxjs";
import {Quiz} from "../shared/client-model";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {
  public quizzes!: Quiz[]

  public nrQuestion: number = 0
  public points: number[] = []
  public point: number = 0

  constructor(
    private clientService: ClientService,
    private router: Router,
    private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.queryParams.pipe(
      tap(params => {
        this.point = 0
        this.points = params['points'] ? params['points'].map((point: string) => {
          return parseInt(point)
        }) : []
        this.nrQuestion = params['questionIndex'] ? parseInt(params['questionIndex']) : 0
      })
    ).subscribe()

    this.clientService.getQuestions().pipe(
      map(res => res),
      tap(res => {
        this.quizzes = res
      })
    ).subscribe()
  }

  nextQuestion() {
    this.points.push(this.point)
    this.nrQuestion++
    this.router.navigate(['/'], {
      queryParams: {
        points: this.points,
        questionIndex: this.nrQuestion
      },
      replaceUrl: true
    })
  }

  goToResults() {
    const sum = this.points.reduce((sum, point) => sum + point)
    this.router.navigate(['/results'], {
      queryParams: {
        pointSum: sum
      }
    })
  }

  goToPreviousQuestion() {
    this.points.splice(this.points.length - 1, 1)
    this.nrQuestion--
    this.router.navigate(['/'], {
      queryParams: {
        points: this.points,
        questionIndex: this.nrQuestion
      },
      replaceUrl: true
    })
  }
}
