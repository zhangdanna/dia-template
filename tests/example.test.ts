import { describe, expect, it } from 'vitest'
import { storage } from '@/utils/storage'

describe('storage', () => {
  it('returns fallback when key missing', () => {
    expect(storage.get('nope', 'default')).toBe('default')
  })

  it('round-trips a value', () => {
    storage.set('k', { a: 1 })
    expect(storage.get('k', null)).toEqual({ a: 1 })
    storage.remove('k')
  })
})
