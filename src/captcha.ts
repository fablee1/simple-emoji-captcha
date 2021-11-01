import Str from "@supercharge/strings"

const answersSample = [
  "🐬",
  "🐄",
  "🦆",
  "🐥",
  "🥭",
  "🐚",
  "🦛",
  "🍌",
  "🐳",
  "🍇",
  "🍍",
  "🐩",
  "🍅",
]

const questionsSample = [
  {
    q: "​F​​r​​o​​n​​​t​​-​​f​​a​c​​i​n​g​ ​b​​a​​​b​y​​ ​​c​h​​i​c​​​k",
    a: "🐥",
  },
  {
    q: "Pineapple",
    a: "🍍",
  },
  {
    q: "Hippopotamus",
    a: "🦛",
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

  public generateCaptcha(): { token: string; question: string; answers: string[] } {
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

    const randomAnswers = this._answers
      .filter((a) => a !== question.a)
      .sort(() => Math.random() - 0.5)
      .slice(0, 5)
    const finalAnswers = [...randomAnswers, question.a].sort(() => Math.random() - 0.5)

    return { token: newCaptchaToken, question: question.q, answers: finalAnswers }
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
