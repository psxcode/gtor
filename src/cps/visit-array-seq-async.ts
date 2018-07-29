const visitArraySeqAsync = <T> (
  visitor: (arg: T, i: number, done: () => void) => void
) => (arr: T[], done: () => void) => {
  const visitNext = (index: number) => {
    visitor(arr[index], index, () => {
      index >= arr.length - 1
        ? done()
        : visitNext(index + 1)
    })
  }
  visitNext(0)
}

export default visitArraySeqAsync
