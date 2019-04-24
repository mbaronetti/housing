import React from 'react';
import { Layout as AntLayout } from 'antd';

const { Header , Content } = AntLayout;

export const Layout = props => {
  return <AntLayout>
    <Header>
        <img src={props.logo} className="logo" alt="logo" />
    </Header>
    <AntLayout>
      {props.sidebar}
      <AntLayout>
        <Content className="content">
          {props.children}
        </Content>
      </AntLayout>
    </AntLayout>
  </AntLayout>
}