function _(selector: string) {
  return (document.querySelector(selector) as any);
}
function generateId(number: number= 10000) {
  return Math.floor((Date.now() + Math.random()) * number);
}
class MyMap<T1, T2> extends Map<T1, T2>{
  constructor(private readonly T1 = (q) => q, private readonly T2 = q=>q) {
    super()
  }
  set(key: T1, value: T2): this {
    return super.set(this.T1(key), this.T2(value));
  }
  get(key: T1): T2 {
    return super.get(this.T1(key))
  }
  
  
}
(new MyMap<number, number>())