const mapArrayParAsync = <A, B> (
  xf: (arg: A, index: number, done: (res: B) => void) => void,
  done: (res: B[]) => void
) => (arr: A[]) => {
  let numDone = 0
  const result = new Array<B>(arr.length)
  const visitNext = (i: number) => {
    xf(arr[i], i, (res: B) => {
      result[i] = res
      ++numDone
      if (numDone === arr.length) {
        done(result)
      }
    })
  }
  for (let i = 0; i < arr.length; ++i) {
    visitNext(i)
  }
}

export default mapArrayParAsync
