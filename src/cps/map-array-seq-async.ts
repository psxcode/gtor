import defer from '../utils/defer'

const mapArraySeqAsync = <A, B> (
  xf: (arg: A, i: number, done: (arg: B) => void) => void,
  done: (arr: B[]) => void) =>
  (arr: A[]) => {
    const resArr = new Array<B>(arr.length)
    const visitNext = (index: number) => {
      xf(arr[index], index, (res) => {
        resArr[index] = res
        index >= arr.length - 1
          ? defer(done, resArr)
          : defer(visitNext, index + 1)
      })
    }
    defer(visitNext, 0)
  }

  export default mapArraySeqAsync
