import React from 'react'
import PropTypes from 'prop-types'

export default function ValidateFormat(props){
  if(props.message) {
    return (
      <div className="error">{props.message}</div>
    )
  }
  return <></>
}

ValidateFormat.propTypes = {
  message: PropTypes.string
}
