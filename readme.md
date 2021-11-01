<div style="text-align: center">
    <h1>
        Simple Emoji Captcha
    </h1>
</div>

<hr>
A simple emoji captcha which gets checked on the backend

## Motive

Some websites need cheap, fast and easy captcha. This is why simple emoji captcha was born.

## Install

```sh
npm install simple-emoji-captcha
```

## Usage

You should pass your questions atleast when creating new Captcha instance. There is a list of random answers already there.

Generate captcha,

```js
import { Captcha } from "simple-emoji-captcha"

// A new 'Captcha' instance where you can pass questions, random answers and timeout for captcha
const simpleCaptcha = new Captcha(
  [{ q: "Chicken", a: "🐔" }],
  ["🐬", "🐄", "🦆", "🐥", "🥭", "🐚", "🦛"],
  120000
)

/* Example generate captcha */
const { token, question, answers } = simpleCaptcha.generateCaptcha()
```

Check Captcha,

```js
import { Captcha } from "simple-emoji-captcha"

const simpleCaptcha = new Captcha(
  [{ q: "Chicken", a: "🐔" }],
  ["🐬", "🐄", "🦆", "🐥", "🥭", "🐚", "🦛"],
  120000
)

/* Example check captcha. Returns a boolean */
const solved = simpleCaptcha.checkCaptcha("token", "answer")
```
