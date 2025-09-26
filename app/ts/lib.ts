function _(selector: string) {
  return (document.querySelector(selector) as any);
}
function generateId(number: number= 10000) {
  return Math.floor((Date.now() + Math.random()) * number);
}