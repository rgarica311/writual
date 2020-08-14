import React from 'react'
import PropTypes from 'prop-types'

export default function ValidateAuthor(props){
  if(props.message) {
    return (
      <div className="error">{props.message}</div>
    )
  }
  return <></>
}

ValidateAuthor.propTypes = {
  message: PropTypes.string
}
