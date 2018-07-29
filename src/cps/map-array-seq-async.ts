const mapArraySeqAsync = <A, B> (
  xf: (arg: A, i: number, done: (arg: B) => void) => void
) => (arr: A[], done: (arr: B[]) => void) => {
  const resArr = new Array<B>(arr.length)
  const visitNext = (index: number) => {
    xf(arr[index], index, (res) => {
      resArr[index] = res
      index >= arr.length - 1
        ? done(resArr)
        : visitNext(index + 1)
    })
  }
  visitNext(0)
}

export default mapArraySeqAsync
