const customLeetDict: { [key: string]: string } = {
  a: "4",
  e: "3",
  i: "1",
  o: "0",
  t: "7",
  s: "5",
  g: "6",
}
const customLeetLettersString = Object.keys(customLeetDict).join()

export const convertToRandomLeet = (question: string): string => {
  const newQuestion = Array.from(question)
    .map((l) => {
      if (customLeetLettersString.includes(l.toLowerCase())) {
        if (Math.random() > 0.5) {
          return customLeetDict[l.toLowerCase()]
        }
      }
      return l
    })
    .join()
  return newQuestion
}
