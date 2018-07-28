import defer from '../utils/defer'

const filterArraySeqAsync = <T> (
  pred: (arg: T, i: number, done: (arg: boolean) => void) => void,
  done: (arr: T[]) => void) =>
  (arr: T[]) => {
    const resArr = [] as T[]
    const visitNext = (index: number) => {
      pred(arr[index], index, (res: boolean) => {
        if(res) {
          resArr.push(arr[index])
        }
        index >= arr.length - 1
          ? defer(done, resArr)
          : defer(visitNext, index + 1)
      })
    }
    defer(visitNext, 0)
  }

export default filterArraySeqAsync
