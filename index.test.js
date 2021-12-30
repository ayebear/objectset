import ObjectSet from './index.js'
// const ObjectSet = require('./index.js')

test('create ObjectSet', () => {
  const s1 = new ObjectSet('key')
  expect(s1.size).toBe(0)
  const s2 = new ObjectSet(elem => elem.key)
  expect(s2.size).toBe(0)
  expect(() => {
    new ObjectSet()
  }).toThrow()
  const s3 = new ObjectSet('key', [{ key: 'foo' }, { key: 'bar' }])
  expect(s3.size).toBe(2)
})

test('add', () => {
  const s1 = new ObjectSet('key')
  s1.add({ key: 'foo' })
  expect(s1.size).toBe(1)
  expect([...s1.values()]).toEqual([{ key: 'foo' }])
  const s2 = new ObjectSet(elem => `${elem.x},${elem.y}`)
  s2.add({ x: 1, y: 2 })
  s2.add({ x: 1, y: 2 })
  s2.add({ x: 2, y: 2 }).add({ x: 2, y: 2 })
  expect(s2.size).toBe(2)
  expect([...s2.values()]).toEqual([
    { x: 1, y: 2 },
    { x: 2, y: 2 },
  ])
})

test('has', () => {
  const s1 = new ObjectSet('key')
  s1.add({ key: 'foo' })
  expect(s1.has({ key: 'foo' })).toBe(true)
  const s2 = new ObjectSet(elem => `${elem.x},${elem.y}`)
  s2.add({ x: 1, y: 2 })
  s2.add({ x: 1, y: 2 })
  s2.add({ x: 2, y: 2 }).add({ x: 2, y: 2 })
  expect(s2.has({ x: 1, y: 2 })).toBe(true)
  expect(s2.has({ x: 2, y: 2 })).toBe(true)
  expect(s2.has({ x: 2, y: 1 })).toBe(false)
})

test('delete', () => {
  const s1 = new ObjectSet('key')
  s1.add({ key: 'foo' })
  expect(s1.delete({ key: 'foo' })).toBe(true)
  expect(s1.delete({ key: 'foo' })).toBe(false)
  expect(s1.has({ key: 'foo' })).toBe(false)
  const s2 = new ObjectSet(elem => `${elem.x},${elem.y}`)
  s2.add({ x: 1, y: 2 })
  s2.add({ x: 1, y: 2 })
  s2.add({ x: 2, y: 2 }).add({ x: 2, y: 2 })
  s2.delete({ x: 1, y: 2 })
  s2.delete({ x: 2, y: 2 })
  expect(s2.has({ x: 1, y: 2 })).toBe(false)
  expect(s2.has({ x: 2, y: 2 })).toBe(false)
})

test('clear', () => {
  const s1 = new ObjectSet('key')
  s1.add({ key: 'foo' })
  s1.clear()
  expect(s1.size).toBe(0)
})

test('entries', () => {
  const s1 = new ObjectSet('key', [{ key: 'foo' }, { key: 'bar' }])
  expect([...s1.entries()]).toEqual([
    ['foo', { key: 'foo' }],
    ['bar', { key: 'bar' }],
  ])
})

test('forEach', () => {
  const s1 = new ObjectSet('key', [{ key: 'foo' }, { key: 'bar' }])
  const results = []
  s1.forEach((v, k) => {
    results.push([k, v])
  })
  expect(results).toEqual([
    ['foo', { key: 'foo' }],
    ['bar', { key: 'bar' }],
  ])
})

test('iteration', () => {
  const s1 = new ObjectSet('key', [{ key: 'foo' }, { key: 'bar' }])
  const results = []
  for (const e of s1) {
    results.push(e)
  }
  expect(results).toEqual([{ key: 'foo' }, { key: 'bar' }])
})
