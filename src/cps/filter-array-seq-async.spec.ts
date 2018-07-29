import { expect } from 'chai'
import filterArraySeqAsync from './filter-array-seq-async'
import defer from '../utils/defer'

type Spy<T> = {
  (val: T, index: number, done: (arg: boolean) => void): void
  values: T[]
  indices: number[]
}

const makespy = <T> (pred: (val: T) => boolean) => {
  const values = [] as T[]
  const indices = [] as number[]
  const spy = (val: T, i: number, done: (arg: boolean) => void) => {
    values.push(val)
    indices.push(i)

    defer(done, pred(val))(10)
  }

  (spy as Spy<T>).values = values;
  (spy as Spy<T>).indices = indices

  return spy as Spy<T>
}

const isEven = (val: number) => val % 2 == 0

describe('[ filterArraySeqAsync ]', () => {
  it('should work', (done) => {
    const arr: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9]
    const spy = makespy(isEven)
    filterArraySeqAsync(spy)(arr, (res) => {
      expect(spy.values).deep.eq([1, 2, 3, 4, 5, 6, 7, 8, 9])
      expect(spy.indices).deep.eq(
        [0, 1, 2, 3, 4, 5, 6, 7, 8]
      )
      expect(res).deep.eq(
        [2, 4, 6, 8]
      )
      done()
    })
  })
})
