import Str from "@supercharge/strings"
import { convertToRandomLeet } from "./randomLeet"
import { pickRandomCount } from "./utils"

const answersSample = [
  "ð¬",
  "ð",
  "ð¦",
  "ð¥",
  "ð¥­",
  "ð",
  "ð¦",
  "ð",
  "ð³",
  "ð",
  "ð",
  "ð©",
  "ð",
]

const questionsSample = [
  {
    q: "âFâârââoâânâââtââ-ââfââaâcââiânâgâ âbââaâââbâyââ ââcâhââiâcâââk",
    a: "ð¥",
  },
  {
    q: "Pineapple",
    a: "ð",
  },
  {
    q: "Hippopotamus",
    a: "ð¦",
  },
]

const issuedCaptchas: { [key: string]: { a: string; timeOut: number } } = {}

export class Captcha {
  public _timeout: number
  public _questions: { q: string; a: string }[]
  public _answers: string[]

  constructor(
    questions: { q: string; a: string }[] = questionsSample,
    answers: string[] = answersSample,
    timeout: number = 120
  ) {
    this._timeout = timeout * 1000
    this._questions = questions
    this._answers = answers
  }

  public generateCaptcha(leet: boolean = false): {
    token: string
    question: string
    answers: string[]
  } {
    const newCaptchaToken = Str.random()

    const question = this._questions[Math.floor(Math.random() * this._questions.length)]

    const captchaTimeout = setTimeout(
      () => delete issuedCaptchas[newCaptchaToken],
      this._timeout
    )

    issuedCaptchas[newCaptchaToken] = {
      a: question.a,
      timeOut: captchaTimeout,
    }

    const randomAnswers = pickRandomCount(this._answers, question.a)
    const finalAnswers = [...randomAnswers, question.a].sort(() => Math.random() - 0.5)

    let questionText = question.q
    if (leet) {
      questionText = convertToRandomLeet(questionText)
    }

    return { token: newCaptchaToken, question: questionText, answers: finalAnswers }
  }

  public checkCaptcha(token: string, answer: string): boolean {
    const captcha = issuedCaptchas[token]
    if (captcha) {
      clearTimeout(captcha.timeOut)
      delete issuedCaptchas[token]

      if (captcha?.a === answer) {
        return true
      }
    }
    return false
  }
}
