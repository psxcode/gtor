const visitTreeSeqSync = <T> (
  visitor: (arg: T, indices: number[]) => void
) => (arr: (T | T[])[]) => {
  const visit = (arr: (T | T[])[], inds: number[]) => {
    const value = arr[inds[inds.length - 1]]
    Array.isArray(value)
      ? visit(value, [...inds, 0])
      : visitor(value, inds.slice())
  }
  visit(arr, [0])
}

export default visitTreeSeqSync
