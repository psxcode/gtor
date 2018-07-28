const visitArraySeqSync = <T> (visitor: (arg: T, i: number) => void) =>
  (arr: T[]) => {
    for (let i = 0; i < arr.length; ++i) {
      visitor(arr[i], i)
    }
  }

export default visitArraySeqSync
