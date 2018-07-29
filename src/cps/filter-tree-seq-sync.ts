import { Tree } from '../types'

const filterTreeSeqSync = <T> (
  pred: (arg: T, indices: number[]) => boolean
) => (arr: Tree<T>): Tree<T> => {
  const visit = (arr: Tree<T>, inds: number[] = []): Tree<T> => {
    const result = [] as Tree<T>
    for (let i = 0; i < arr.length; ++i) {
      const value = arr[i]
      Array.isArray(value)
        ? result.push(visit(value, [...inds, i]))
        : pred(value, [...inds, i]) && result.push(value)
    }
    return result
  }
  return visit(arr)
}

export default filterTreeSeqSync
