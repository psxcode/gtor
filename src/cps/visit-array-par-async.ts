const visitArrayParAsync = <T> (
  visitor: (arg: T, index: number, done: () => void) => void,
  done: () => void
) => (arr: T[]) => {
  let numDone = 0
  for (let i = 0; i < arr.length; ++i) {
    visitor(arr[i], i, () => {
      ++numDone
      if (numDone === arr.length) {
        done()
      }
    })
  }
}

export default visitArrayParAsync
