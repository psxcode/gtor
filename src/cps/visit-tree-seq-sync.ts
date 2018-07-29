import { Tree } from '../types'

const visitTreeSeqSync = <T> (
  visitor: (arg: T, indices: number[]) => void
) => (arr: Tree<T>) => {
  const visit = (arr: Tree<T>, inds: number[] = []) => {
    for (let i = 0; i < arr.length; ++i) {
      const value = arr[i]
      Array.isArray(value)
        ? visit(value, [...inds, i])
        : visitor(value, [...inds, i])
    }
  }
  visit(arr)
}

export default visitTreeSeqSync
