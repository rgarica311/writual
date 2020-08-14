import React from 'react'
import PropTypes from 'prop-types'

export default function ValidateLogline(props){
  if(props.message) {
    return (
      <div className="error">{props.message}</div>
    )
  }
  return <></>
}

ValidateLogline.propTypes = {
  message: PropTypes.string
}
