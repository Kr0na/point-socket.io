/**@flow*/
import {getClient} from './ClientManager'

function emitActionResult(client, result) {
  if (result.type) {
    client.emit(result.type, result)
  } else if (result.callEvent) {
    emitActionResult(client, result.callEvent)
  } else if (result.then) {
    result.then(
      result => {
        emitActionResult(client, result)
      }
    )
  }
}

export function createSocketAction(url:string, callback:Function):Function {
  const client = getClient(url)
  return (...args) => {
    let result = callback(...args)
    emitActionResult(client, result)
    return result
  }
}
