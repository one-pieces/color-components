export class QuickUnionUF {
  id: number[]
  constructor(N: number) {
    this.id = []
    for (let i = 0; i < N; i++) {
      this.id[i] = i
    }
  }
  // 返回当前节点的根节点
  root(i: number) {
    while (i !== this.id[i]) i = this.id[i]
    return i
  }
  connected(p: number, q: number) {
    return this.root(p) === this.root(q)
  }
  union(p: number, q: number) {
    const i = this.root(p)
    const j = this.root(q)
    this.id[i] = j
  }
}
