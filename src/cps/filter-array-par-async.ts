const filterArrayParAsync = <T> (
  pred: (arg: T, index: number, done: (res: boolean) => void) => void
) => (arr: T[], done: (res: T[]) => void) => {
  let numDone = 0
  const result = new Array<T>(arr.length)
  const visitNext = (i: number) => {
    pred(arr[i], i, (res) => {
      ++numDone
      if (res) {
        result[i] = arr[i]
      }
      if (numDone === arr.length) {
        done(result)
      }
    })
  }
  for (let i = 0; i < arr.length; ++i) {
    visitNext(i)
  }
}

export default filterArrayParAsync
