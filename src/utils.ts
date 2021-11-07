export const pickRandomCount = (
  answers: string[],
  exclude: string,
  count: number = 5
) => {
  const randomPicked = answers
    .filter((a) => a !== exclude)
    .sort(() => Math.random() - 0.5)
    .slice(0, count)
  return randomPicked
}
