const filterArraySeqSync = <T> (pred: (arg: T, i: number) => boolean) => (arr: T[]) => {
  let res = [] as T[]
  for (let i = 0; i < arr.length; ++i) {
    if (pred(arr[i], i)) {
      res.push(arr[i])
    }
  }
  return res
}

export default filterArraySeqSync
