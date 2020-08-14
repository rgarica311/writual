import React from 'react'
import PropTypes from 'prop-types'

export default function ValidateForm(props){
  if(props.message) {
    return (
      <div className="error">{props.message}</div>
    )
  }
  return <></>
}

ValidateForm.propTypes = {
  message: PropTypes.string
}
