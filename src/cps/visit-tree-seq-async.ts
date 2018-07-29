import { Tree } from '../types'

const visitTreeSeqAsync = <T> (
  visitor: (arg: T, indices: number[], done: () => void) => void,
  done: () => void
) => (arr: Tree<T>) => {
  const visitArray = (arr: Tree<T>, inds: number[], done: () => void) => {
    const visitValue = (i: number) => {
      const value = arr[i]
      const indices = [...inds, i]
      const doneValue = () => {
        i < arr.length - 1
          ? visitValue(i + 1)
          : done()
      }
      Array.isArray(value)
        ? visitArray(value, indices, doneValue)
        : visitor(value, indices, doneValue)
    }
    visitValue(0)
  }
  visitArray(arr, [], done)
}

export default visitTreeSeqAsync
