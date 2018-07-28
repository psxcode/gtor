import { Tree } from '../types'

const mapTreeSeqSync = <A, B> (
  xf: (arg: A, indices: number[]) => B
) => (arr: Tree<A>): Tree<B> => {
  const visit = (arr: Tree<A>, inds: number[]): Tree<B> => {
    const result = new Array<B | B[]>(arr.length) as Tree<B>
    for (let i = 0; i < arr.length; ++i) {
      const value = arr[i]
      result[i] = Array.isArray(value)
        ? visit(value, [...inds, i])
        : xf(value, [...inds, i])
    }
    return result
  }
  return visit(arr, [0])
}

export default mapTreeSeqSync
