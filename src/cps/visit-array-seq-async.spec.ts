import { expect } from 'chai'
import visitArraySeqAsync from './visit-array-seq-async'
import defer from '../utils/defer'

type Spy<T> = {
  (val: T, index: number): void
  values: T[]
  indices: number[]
}

const makespy = <T> () => {
  const values = [] as T[]
  const indices = [] as number[]
  const spy = (val: T, i: number, done: () => void) => {
    values.push(val)
    indices.push(i)
    defer(done)
  }

  (spy as Spy<T>).values = values;
  (spy as Spy<T>).indices = indices

  return spy as Spy<T>
}

describe('[ visitArraySeqAsync ]', () => {
  it('should work', (done) => {
    const arr: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9]
    const spy = makespy()
    visitArraySeqAsync(spy, () => {
      expect(spy.values).deep.eq([1, 2, 3, 4, 5, 6, 7, 8, 9])
      expect(spy.indices).deep.eq(
        [0, 1, 2, 3, 4, 5, 6, 7, 8]
      )
      done()
    })(arr)
  })
})
