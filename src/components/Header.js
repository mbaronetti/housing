import React from 'react';
import { Layout } from 'antd';

const {Header} =  Layout;

const Head = props => {
  return (
        <Header className="header">
          <img className="logo" src={props.logo} alt="logo" />
        </Header>
    )
    
}

export default Head;