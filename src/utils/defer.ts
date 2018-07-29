function defer<A, B, C, D> (f: (p1: A, p2: B, p3: C, p4: D) => void, p1: A, p2: B, p3: C, p4: D): (ms: number) => void
function defer<A, B, C> (f: (p1: A, p2: B, p3: C) => void, p1: A, p2: B, p3: C): (ms: number) => void
function defer<A, B> (f: (p1: A, p2: B) => void, p1: A, p2: B): (ms: number) => void
function defer<A> (f: (p1: A) => void, p1: A): (ms: number) => void
function defer (f: () => void): (ms: number) => void
function defer (f: any, ...args: any[]) {
  return (ms: number) => {
    setTimeout(
      args.length === 0
        ? f
        : f.bind(null, ...args),
      ms
    )
  }
}

export default defer
