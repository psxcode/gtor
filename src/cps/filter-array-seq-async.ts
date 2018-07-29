const filterArraySeqAsync = <T> (
  pred: (arg: T, i: number, done: (arg: boolean) => void) => void
) => (arr: T[], done: (arr: T[]) => void) => {
  const res = [] as T[]
  const visitNext = (index: number) => {
    pred(arr[index], index, (arg: boolean) => {
      arg && res.push(arr[index])
      index < arr.length - 1
        ? visitNext(index + 1)
        : done(res)
    })
  }
  visitNext(0)
}

export default filterArraySeqAsync
