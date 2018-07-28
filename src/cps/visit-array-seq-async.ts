import defer from '../utils/defer'

const visitArraySeqAsync = <T> (
  visitor: (arg: T, i: number, done: () => void) => void,
  done: () => void) =>
  (arr: T[]) => {
    const visitNext = (index: number) => {
      visitor(arr[index], index, () => {
        index >= arr.length - 1
          ? defer(done)
          : defer(visitNext, index + 1)
      })
    }
    defer(visitNext, 0)
  }

export default visitArraySeqAsync
