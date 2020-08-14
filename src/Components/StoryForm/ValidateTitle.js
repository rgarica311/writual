import React from 'react'
import PropTypes from 'prop-types'

export default function ValidateTitle(props){
  if(props.message) {
    return (
      <div className="error">{props.message}</div>
    )
  }
  return <></>
}

ValidateTitle.propTypes = {
  message: PropTypes.string
}
