import React from 'react';
import { Card , Avatar , Button} from 'antd';

const { Meta } = Card;

export const HouseInfo = props => {
  return (
      <Card
        cover={<img alt="thumb" src={props.cover} />}
        actions={[<Button onClick={props.bookClicked} type="primary" className="btn-funda">{props.bookButtonText}</Button>]}
      >
        <Meta
          avatar={<Avatar src={props.avatar} />}
          title={props.title}
          description={props.description}
        />
          {props.children}
      </Card>
    )
}