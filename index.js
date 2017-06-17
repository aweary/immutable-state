// @flow
import isFunction from 'lodash.isfunction'

const PATH_SEPARATOR = '.'

export const update = (key, fn) => {
  if (!fn) return fn => update(key, fn)
  return state => {
    return {
      ...state,
      [key]: isFunction(fn) ? fn(state[key]) : fn,
    }
  }
}

export const updateIn = (query, fn) => {
  if (!fn) return fn => updateIn(query, fn)
  const path = query.split(PATH_SEPARATOR)
  const max = path.length - 1
  const last = path.length - 2
  return state => {
    let cachedStateValue = null
    let nextState = { [path[0]]: state[path[0]] }
    let index = 0
    // Start with the new state
    let target = nextState
    // Used to keep a reference to the previous
    // path object, so it can be mutated. Since nextState
    // is a new object, mutating is fine.
    let prev = null
    // Stop at the second-to-last path segment, which
    // should be the nested object containing the key we're
    // updating.
    while (index < max) {
      prev = target
      // We assume that every item up to the
      target = target[path[index++]]
      if (typeof target !== 'object') {
        // @todo better error message including type and full path
        throw new Error(
          `updateIn: item in path with key ${path[index]} is not an object`
        )
      }
      target = { ...target }
      prev[path[index - 1]] = target
    }
    const nextValue = isFunction(fn) ? fn(target[path[index]]) : fn
    const lastValue = target[path[index]]
    // If the value never changed, return the initial state.
    // We don't need to create a new one.
    if (nextValue === lastValue) {
      return state
    }

    target[path[index]] = nextValue
    return nextState
  }
}

export const findIn = (query, fn) => {
  const path = query.split(PATH_SEPARATOR);
  return state => {
    let index = 0
    let max = path.length
    let target = state
    while (index < max) {
      target = target[path[index++]]
    }
    return target
  }
}

export const findInList = (query, key, value) => {
  const finder = findIn(query)
  return state => {
    const target = finder(state)
    if (!Array.isArray) {
      throw new Error(
        `findInList(...): queried property '${query}' is not an array. ` +
        `Use findIn to query deeply nested properties of any time`
      )
    }
    return target.find(item => {
      return value ? item[key] === value : item === key
    })
  }
}