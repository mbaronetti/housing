import React , {Component} from 'react';
import {Layout} from './components/Layout';
import {Sidebar} from './components/Sidebar';
import {ErrorPage} from './components/ErrorPage';
import Gallery from './components/Gallery';
import {sampleUrls , Preloader , Modal} from './components/Helpers';
import { Modal as AntModal , Menu , Button , notification , Input} from 'antd';
import logo from './media/logo.png';
import './css/Styles.css';

class App extends Component {
    constructor(props){
        super(props);
        this.state = {
            userLogged: false,
            loading: true,
            error: false,
            menuItems: [],
        }
    }
    componentDidMount = () => {
        this.setMenuItems(sampleUrls);
        setTimeout(() => this.openNotification() , 5000 );
    }
    dataLoaded = val => {
        this.setState({loading: !val})
    }
    hasErrored = (val , message) => {
        this.setState({error: val , errorMessage: message})
    }
    setMenuItems = urls => {
        const menuItems = [];
        for(let i = 0; i<sampleUrls.length;i++){
            menuItems.push(<Menu.Item key={i}>House {i+1}</Menu.Item>)
        }
        this.setState({menuItems})
    }
    handleClick = (item) => {
        const key = item.key;
        this.setState({currentUrl: sampleUrls[key]})
    }
    handleModal = (modalVisible , modalTitle , modalContent) => {
        this.setState({modalVisible , modalTitle , modalContent})
    }
    bookClicked = () => {
        const {userLogged} = this.state;
        if(!userLogged){
            AntModal.error({
                title: 'Authentication error',
                content: 'You must be logged to perform this action'
            })
        }else{
            //Not for demo
        }
    }
    openNotification = () => {
      const notificationMessage = <div>
                                    <p>Subscribe to receive the BEST DEALS & Last minute offers!</p>
                                    <Button onClick={() => this.handleModal(true, 'Subscribe' ,<Input type="text" placeholder="Enter your email"/>)} type="primary">SUBSCRIBE</Button>
                                  </div>;
      notification.open({
        duration: null,
        placement: 'bottomRight',
        message: 'Notification Title',
        description: notificationMessage,
      });
    };
        
    closeModal = () => {this.setState({modalVisible:false})}
    render(){
      const {loading , currentUrl , menuItems , errorMessage , error , modalVisible , modalTitle , modalContent} = this.state;
      if(!error)
      return (
        <div className="App">
          <Layout logo={logo} 
                  sidebar={<Sidebar 
                                width={300} 
                                handleClick={this.handleClick} 
                                title="Select house" 
                                menuItems={menuItems}/>}>
                                    <Gallery bookClicked={this.bookClicked}
                                             dataLoaded={this.dataLoaded}
                                             hasErrored={this.hasErrored}
                                             handleModal={this.handleModal}
                                             url={currentUrl} />
                                    <Preloader icon="loading" loading={loading} />
          </Layout>
          <Modal width={768} 
                 visible={modalVisible} 
                 title={modalTitle} 
                 onOk={this.closeModal} 
                 onCancel={this.closeModal} 
                 footer={[<Button type="primary" 
                 onClick={this.closeModal}>Ok</Button>]} >
                    {modalContent}
          </Modal>
        </div>
      );
      return <ErrorPage title="Error" icon="frown" message={errorMessage} />
    }
}

export default App;
