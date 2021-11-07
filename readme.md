<div style="text-align: center">
    <h1>
        Simple Emoji Captcha
    </h1>
</div>

<hr>
A simple emoji captcha which gets checked on the backend

## Motive

Some websites need cheap, fast and easy captcha. This is why simple emoji captcha was born.

## How it works?

This package selects a random question from the passed ones, mixes the right answer with the random ones, and returns a token, question and answers, to be solved.
Features timeout, which cancels the captcha if it was not solved in the provided timeframe.

## Install

```sh
npm install simple-emoji-captcha
```

## Usage

It's mandatory to pass atleast the questions, this is a sample of how they should look like, where "q" is the question, and "a" is the answer:

```js
const questions = [
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
```

When creating a new Captcha instance you can pass up to 3 parameters:

1. Question array as you saw above.
2. Dummy answer array which will be mixed with the right answer to a question.
3. The timeout in seconds after which the captcha will be expired.

You can decide to pass only the questions, since the default answers and timeout are ok.

```js
import { Captcha } from "simple-emoji-captcha"

// A new 'Captcha' instance where you can pass questions, random answers and timeout for captcha
const simpleCaptcha = new Captcha(
  [{ q: "Chicken", a: "🐔" }],
  ["🐬", "🐄", "🦆", "🐥", "🥭", "🐚", "🦛"],
  120
)
```

To generate a captcha you need to use generateCaptcha() method. It accepts 1 optional argument which indicates if random leet should be used.
Returns a token, question, and list of answers.

```js
/* Example generate captcha */
const { token, question, answers } = simpleCaptcha.generateCaptcha(true)
```

To check the captcha you need to use the checkCaptcha() method which accepts the captcha token and answer,
Returns true if correct, false if expired or false.

```js
/* Example check captcha. Returns a boolean */
const solved = simpleCaptcha.checkCaptcha("token", "answer")
```

Full Code,

```js
import { Captcha } from "simple-emoji-captcha"

const simpleCaptcha = new Captcha(
  [{ q: "Chicken", a: "🐔" }],
  ["🐬", "🐄", "🦆", "🐥", "🥭", "🐚", "🦛"],
  120
)

const { token, question, answers } = simpleCaptcha.generateCaptcha(true)

const solved = simpleCaptcha.checkCaptcha(token, correctAnswer)
```
