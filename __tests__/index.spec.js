import React from 'react'
import ReactTestUtils from 'react-dom/test-utils'
import { update, updateIn, findIn, findInList } from '../'

const setState = (state, updater) => updater(state)

describe('immutable-state', () => {
  describe('update', () => {
    let state;
    beforeEach(() => {
      state = { value: 1 }
    })

    it ('should update with an updater function', () => {
      const updateValue = update('value', v => v + 1)
      let newState = setState(state, updateValue)
      expect(newState).toEqual({ value: 2 })
      newState = setState(newState, updateValue)
      expect(newState).toEqual({ value: 3 })
    })

    it('should update with a literal value', () => {
      const updateValue = update('value', 5)
      let newState = setState(state, updateValue)
      expect(newState).toEqual({ value: 5 })
    })

    it('should let lazily provide the updater', () => {
      const updateValue = update('value')
      let newState = setState(state, updateValue(5))
      expect(newState).toEqual({ value: 5 })
      newState =  setState(newState, updateValue(value => value * 10))
      expect(newState).toEqual({ value: 50 })
    })
  })

  describe('updateIn', () => {
    let state;
    beforeEach(() => {
      state = {
        user: {
          name: {
            first: 'foo',
            last: 'bar',
            middle: 'baz'
          },
          stats: {
            batting: 400
          },
          id: 'foobar'
        },
        meta: {
          page: 'about',
          visitedAt: 8933393
        }
      }
    })

    it('should update with an updater function', () => {
      const updateFirstName = updateIn('user.name', name => {
        return {
        ...name,
        first: 'brandon',
        last: 'dail'
        }
      })
      let stateUpdate = setState(state, updateFirstName)
      let newState = Object.assign({}, state, stateUpdate)
    })

    // it('should update with a literal value', () => {
    //   const updateValue = update('value', 5)
    //   let newState = setState(state, updateValue)
    //   expect(newState).toEqual({ value: 5 })
    // })

    // it('should let lazily provide the updater', () => {
    //   const updateValue = update('value')
    //   let newState = setState(state, updateValue(5))
    //   expect(newState).toEqual({ value: 5 })
    //   newState =  setState(newState, updateValue(value => value * 10))
    //   expect(newState).toEqual({ value: 50 })
    // })
  })

  describe('findIn', () => {
    it('should find deeply nested values', () => {
      const state = {
        user: {
          meta: {
            lang: {
              region: 'EN_US',
              multi: false
            }
          }
        }
      }
      const findLang = findIn('user.meta.lang')
      const findMulti = findIn('user.meta.lang.multi')
      const lang = findLang(state)
      const multi = findMulti(state)
      expect(lang).toEqual(state.user.meta.lang)
      expect(multi).toEqual(state.user.meta.lang.multi)
    });
  })

  describe('findInList', () => {
    it('should find an item in a list', () => {
      const state = {
        user: {
          name: 'brandon',
          friends: {
            count: 2,
            list: [
              { name: 'shmandon', id: 4 },
              { name: 'blandon', id: 2 },
            ]
          }
        }
      }
      const findAFriend = findInList('user.friends.list', 'id', 1)
      console.log(findAFriend(state))
    })
  })
});