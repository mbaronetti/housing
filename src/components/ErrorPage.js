import React from 'react';
import {Icon} from 'antd'

export const ErrorPage = props => {
  return (
      <div className="error-page">
        <h1>{props.title}</h1>
        <Icon type={props.icon} />
        <p>{props.message}</p>
      </div>
    )
}