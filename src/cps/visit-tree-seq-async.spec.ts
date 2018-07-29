import { expect } from 'chai'
import visitTreeSeqAsync from './visit-tree-seq-async'
import defer from '../utils/defer'
import { Tree } from '../types'

type Spy<T> = {
  (val: T, inds: number[]): void
  values: T[]
  indices: number[][]
}

const makespy = <T> () => {
  const values = [] as T[]
  const indices = [] as number[][]
  const spy = (val: T, inds: number[], done: () => void) => {
    values.push(val)
    indices.push(inds)
    defer(done)(10)
  }

  (spy as Spy<T>).values = values;
  (spy as Spy<T>).indices = indices

  return spy as Spy<T>
}

describe('[ visitTreeSeqAsync ]', () => {
  it('should work', (done) => {
    const tree: Tree<number> = [1, 2, 3, [4, 5, [6, 7], 8], 9]
    const spy = makespy()
    visitTreeSeqAsync(spy)(tree, () => {
      expect(spy.values).deep.eq([1, 2, 3, 4, 5, 6, 7, 8, 9])
      expect(spy.indices).deep.eq(
        [[0], [1], [2], [3, 0], [3, 1], [3, 2, 0], [3, 2, 1], [3, 3], [4]]
      )
      done()
    })
  })
})
