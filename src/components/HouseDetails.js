import React from 'react';
import { Tabs , Icon , Row} from 'antd';

const TabPane = Tabs.TabPane;

export const HouseDetails = props => {
  return (
      <Tabs defaultActiveKey="1">
        <TabPane tab={<span><Icon type="picture" />Gallery</span>} key="1">
          <Row type="flex" gutter={0} align="top">{props.images}</Row>
        </TabPane>
        <TabPane tab={<span><Icon type="read" />description</span>} key="2">
          {props.description}
        </TabPane>
      </Tabs>
    )
}