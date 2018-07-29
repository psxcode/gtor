import { expect } from 'chai'
import defer from '../utils/defer'
import { Tree } from '../types'
import mapTreeSeqAsync from './map-tree-seq-async'

type Spy<A, B> = {
  (val: A, inds: number[], done: (arg: B) => void): void
  values: A[]
  indices: number[][]
}

const makespy = <A, B> (xf: (arg: A) => B) => {
  const values = [] as A[]
  const indices = [] as number[][]
  const spy = (val: A, inds: number[], done: (arg: B) => void): void => {
    values.push(val)
    indices.push(inds)
    defer(done, xf(val))(10)
  }

  (spy as Spy<A, B>).values = values;
  (spy as Spy<A, B>).indices = indices

  return spy as Spy<A, B>
}

const mult2 = (val: number) => val * 2

describe('[ mapTreeSeqAsync ]', () => {
  it('should work', (done) => {
    const tree: Tree<number> = [1, 2, 3, [4, 5, [6, 7], 8], 9]
    const spy = makespy(mult2)
    mapTreeSeqAsync(spy)(tree, (res: Tree<number>) => {
      expect(spy.values).deep.eq([1, 2, 3, 4, 5, 6, 7, 8, 9])
      expect(spy.indices).deep.eq(
        [[0], [1], [2], [3, 0], [3, 1], [3, 2, 0], [3, 2, 1], [3, 3], [4]]
      )
      expect(res).deep.eq([2, 4, 6, [8, 10, [12, 14], 16], 18])
      done()
    })
  })
})
