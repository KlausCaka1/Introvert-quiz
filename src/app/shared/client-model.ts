export interface Quiz {
  title: string
  questions: Question[]
}

export interface Question {
  text: string
  points: number
  order: string
}
