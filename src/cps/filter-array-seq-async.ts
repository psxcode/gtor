const filterArraySeqAsync = <T> (
  pred: (arg: T, i: number, done: (arg: boolean) => void) => void,
  done: (arr: T[]) => void) =>
  (arr: T[]) => {
    const resArr = [] as T[]
    const visitNext = (index: number) => {
      pred(arr[index], index, (res: boolean) => {
        if (res) {
          resArr.push(arr[index])
        }
        index >= arr.length - 1
          ? done(resArr)
          : visitNext(index + 1)
      })
    }
    visitNext(0)
  }

export default filterArraySeqAsync
