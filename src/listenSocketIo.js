/**@flow*/
import {getClient} from './ClientManager'

export function listenSocketIo(url:string, events:Object):Function {
  return next => (reducer:Function, initialState:Object = {}) => {
    const
      store = next(reducer, initialState),
      client = getClient(url)
    Object.keys(events).forEach(key => {
      client.on(key, (...args) => {
        if (typeof events[key] == 'string') {
          const event = {
            ...args.shift(),
            type: events[key]
          }
          store.dispatch(event)
        } else if (events[key] instanceof Function) {
          store.dispatch(events[key](...args))
        } else {
          throw new Error('Wrong event type')
        }
      })
    })

    return store
  }
}
