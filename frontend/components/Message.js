import React from 'react'
import {connect, useSelector} from 'react-redux'
import * as actionCreators from '../state/action-creators'

export function Message() {
  const messageState = useSelector(state => state.infoMessage)
  
  if (!messageState) {
    return null;
  }

  return <div id="message">{messageState}</div>
}

export default connect(st => st, actionCreators)(Message)