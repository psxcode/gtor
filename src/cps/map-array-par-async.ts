const mapArrayParAsync = <A, B> (
  xf: (arg: A, index: number, done: (res: B) => void) => void
) => (arr: A[], done: (res: B[]) => void) => {
  let numDone = 0
  const result = new Array<B>(arr.length)
  const visitNext = (i: number) => {
    xf(arr[i], i, (res: B) => {
      result[i] = res
      ++numDone === arr.length && done(result)
    })
  }
  for (let i = 0; i < arr.length; ++i) {
    visitNext(i)
  }
}

export default mapArrayParAsync
