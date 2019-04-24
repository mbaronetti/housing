import React from 'react';
import {Icon , Modal as AntModal} from 'antd';

export const sampleUrls = [
    "https://api.myjson.com/bins/cg25c" , 
    "https://api.myjson.com/bins/d9f8w" ,
    "https://api.myjson.com/bins/1e8fww",
    "https://api.myjson.com/bins/utplc" , 
    "https://api.myjson.com/bins/q28r4" ,
    "https://api.myjson.com/bins/1fnvrk"
]

export const Preloader = props => {
    if(props.loading)
    return <div className="preloader">
                <Icon type={props.icon} />
           </div>
    return null;
}

export const Modal = props => {
    return <AntModal width={props.width}
                     visible={props.visible}
                     onOk={props.onOk}
                     onCancel={props.onCancel}
                     title={props.title}
                     footer={props.footer}>
                           {props.children}
           </AntModal>
}