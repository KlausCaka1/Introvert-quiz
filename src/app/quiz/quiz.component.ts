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
  public orders: string[] = ['A', 'B', 'C', 'D']

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
        this.quizzes = res.map(item => {
          return {
            title: item.title,
            questions: item.questions.sort((a,b) => 0.5 - Math.random())
          }
        })
      })
    ).subscribe()
  }

  getQuestions() {
    return
  }

  nextQuestion() {
    this.points.push(this.point)
    this.nrQuestion++
    this.navigateToNextQuestion()
  }

  goToResults() {
    const sum = this.getSumOfPoints()
    this.router.navigate(['/results'], {
      queryParams: {
        pointSum: sum
      }
    })
  }

  getSumOfPoints() {
    return this.points.reduce((sum, point) => sum + point)
  }

  goToPreviousQuestion() {
    this.points.splice(this.points.length - 1, 1)
    this.nrQuestion--
    this.navigateToNextQuestion()
  }

  navigateToNextQuestion() {
    this.router.navigate(['/'], {
      queryParams: {
        points: this.points,
        questionIndex: this.nrQuestion
      },
      replaceUrl: true
    })
  }
}
