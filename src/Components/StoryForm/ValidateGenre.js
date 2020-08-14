import React from 'react'
import PropTypes from 'prop-types'

export default function ValidateGenre(props){
  if(props.message) {
    return (
      <div className="error">{props.message}</div>
    )
  }
  return <></>
}

ValidateGenre.propTypes = {
  message: PropTypes.string
}
