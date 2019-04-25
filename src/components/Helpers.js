import React from 'react';
import {Icon , Modal as AntModal , notification , message} from 'antd';

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

export const Notification = (duration , placement , message , description) => {
      const notificationMessage = 
      notification.open({
        duration: duration,
        placement: placement,
        message: message,
        description: description,
      });
};

export const Message = (type , text) =>{ 
    switch(type){
        case 'success':
             return message.success(text);
        case 'error':
             return message.error(text);
        case 'warning':
             return message.warning(text);
        case 'loading':
             return message.loading(text);
        case 'destroy':
             return message.destroy();
        default:
             return message.info(text);
   }
}