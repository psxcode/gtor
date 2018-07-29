import { Tree } from '../types'

const mapTreeSeqAsync = <A, B> (
  xf: (arg: A, indices: number[], done: (arg: B) => void) => void
) => (arr: Tree<A>, done: (arg: Tree<B>) => void) => {
  const mapArray = (arr: Tree<A>, inds: number[], done: (arg: Tree<B>) => void) => {
    const res = new Array(arr.length) as Tree<B>
    const mapValue = (i: number) => {
      const value = arr[i]
      const indices = [...inds, i]
      const doneValue = (arg: B | Tree<B>) => {
        res[i] = arg
        i < arr.length - 1
          ? mapValue(i + 1)
          : done(res)
      }
      Array.isArray(value)
        ? mapArray(value, indices, doneValue)
        : xf(value, indices, doneValue)
    }
    mapValue(0)
  }
  mapArray(arr, [], done)
}

export default mapTreeSeqAsync
