import { expect } from 'chai'
import filterTreeSeqAsync from './filter-tree-seq-async'
import defer from '../utils/defer'

type Spy<T> = {
  (val: T, inds: number[], done: (res: boolean) => void): void
  values: T[]
  indices: number[][]
}

const makespy = <T> (pred: (arg: T) => boolean) => {
  const values = [] as T[]
  const indices = [] as number[][]
  const spy = (val: T, inds: number[], done: (res: boolean) => void) => {
    values.push(val)
    indices.push(inds)

    defer(done, pred(val))(10)
  }

  (spy as Spy<T>).values = values;
  (spy as Spy<T>).indices = indices

  return spy as Spy<T>
}

const isEven = (arg: number) => arg % 2 === 0

describe('[ filterTreeSeqAsync ]', () => {
  it('should work', (done) => {
    const tree = [1, 2, 3, [4, 5, [6, 7], 8], 9]
    const spy = makespy(isEven)
    filterTreeSeqAsync(spy)(tree, (res) => {
      expect(spy.values).deep.eq([1, 2, 3, 4, 5, 6, 7, 8, 9])
      expect(spy.indices).deep.eq(
        [[0], [1], [2], [3, 0], [3, 1], [3, 2, 0], [3, 2, 1], [3, 3], [4]]
      )
      expect(res).deep.eq([2, [4, [6], 8]])
      done()
    })
  })
})
