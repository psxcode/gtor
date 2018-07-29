const mapArraySeqSync = <A, B> (
  xf: (arg: A, i: number) => B
) => (arr: A[]) => {
  const res = new Array<B>(arr.length)
  for (let i = 0; i < arr.length; ++i) {
    res[i] = xf(arr[i], i)
  }
  return res
}

export default mapArraySeqSync
