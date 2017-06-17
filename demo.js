import React, { Component } from 'react'
import { update, updateIn, updateList, updateAt, match, compose } from 'immutable-state/set'

const updateFriendLastSeen = compose(
  findIn('user.friends'),
  updateIn('meta.lastSeen')
)

updateFriendLastSeen({ id: 455 }, newLastSeen)


const state = {
  user: {
    id: 5,
    handle: '@aweary',
    loggedIn: false,
    friends: [
      {
        id: 6,
        handle: '@foo',
        loggedIn: true
      }
    ]
  }
}

this.setState(state => {
  
})

this.setState(state => ({
  ...state,
  user: {
    ...state.user,
    friends: state.user.friends.map((friend) => {
      if (friend.id === 455) {
        return {
          ...friend,
          lastSeen: newLastSeen
        }
      }
      return friend
    })
  }
}))

const setUserName = updateIn('user.name')

const updateFriendAt = updateIn('user.friends')

class UserProfile extends Component {
  state = {
    user: {
      name: {
        first: '',
        last: '',
      },
      friends: [
        {
          id: 144,
          name: 'billy',
          meta: {
            lastSeen: 123423433213
          }
        },
        {
          id: 424,
          name: 'bobby',
          meta: {
            lastSeen: 3045234234323

          }
        },
        {
          id: 212,
          name: 'brandy',
          meta: {
            lastSeen: 32423432423423

          }
        },
      ],
    },
    authenticated: false,
  }

  setUserName = bind(setUserName, this)

  updateUser = user => {
    this.setUserName({ first: user.first })
  }

  componentDidMount() {
    //const { first, last } = await getUser()
    this.setUserName({ first, last })
    const update = updateFriendAt(
      { id: 212 },
      friend => update('id')(friend)
    )
  }
}

const updateUserName = updateIn
