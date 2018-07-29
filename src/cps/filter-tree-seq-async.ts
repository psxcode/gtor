import { Tree } from '../types'

const filterTreeSeqAsync = <T> (
  pred: (arg: T, indices: number[], done: (arg: boolean) => void) => void,
  done: (arg: Tree<T>) => void
) => (arr: Tree<T>) => {
  const filterArray = (arr: Tree<T>, inds: number[], done: (arg: Tree<T>) => void) => {
    const res = [] as Tree<T>
    const filterValue = (i: number) => {
      const value = arr[i]
      Array.isArray(value)
        ? filterArray(value, [...inds, i], (arg: Tree<T>) => {
          arg.length > 0 && res.push(arg)
          i < arr.length - 1 ? filterValue(i + 1) : done(res)
        })
        : pred(value, [...inds, i], (arg: boolean) => {
          arg && res.push(value)
          i < arr.length - 1 ? filterValue(i + 1) : done(res)
        })
    }
    filterValue(0)
  }
  filterArray(arr, [], done)
}

export default filterTreeSeqAsync
