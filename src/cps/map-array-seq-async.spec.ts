import { expect } from 'chai'
import mapArraySeqAsync from './map-array-seq-async'
import defer from '../utils/defer'

type Spy<A, B> = {
  (val: A, index: number, done: (arg: B) => void): void
  values: A[]
  indices: number[]
}

const makespy = <A, B> (xf: (arg: A) => B) => {
  const values = [] as A[]
  const indices = [] as number[]
  const spy = (val: A, i: number, done: (arg: B) => void) => {
    values.push(val)
    indices.push(i)

    defer(done, xf(val))(10)
  }

  (spy as Spy<A, B>).values = values;
  (spy as Spy<A, B>).indices = indices

  return spy as Spy<A, B>
}

const mult2 = (val: number) => val * 2

describe('[ mapArraySeqAsync ]', () => {
  it('should work', (done) => {
    const arr: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9]
    const spy = makespy(mult2)
    mapArraySeqAsync(spy)(arr, (res) => {
      expect(spy.values).deep.eq([1, 2, 3, 4, 5, 6, 7, 8, 9])
      expect(spy.indices).deep.eq(
        [0, 1, 2, 3, 4, 5, 6, 7, 8]
      )
      expect(res).deep.eq(
        [2, 4, 6, 8, 10, 12, 14, 16, 18]
      )
      done()
    })
  })
})
