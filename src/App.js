import React , {Component} from 'react';
import { connect } from 'react-redux';
import {Layout} from './components/Layout';
import {Sidebar} from './components/Sidebar';
import {ErrorPage} from './components/ErrorPage';
import Gallery from './components/Gallery';
import { showModal } from './redux/actions/index';
import {sampleUrls , Preloader , Modal} from './components/Helpers';
import { Modal as AntModal , Menu , Button , notification , Input} from 'antd';
import logo from './media/logo.png';
import './css/Styles.css';

//WITH REDUX JS
const mapStateToProps = state => {
    return {modalVisible: state.modalVisible}
}

const mapDispatchToProps = dispatch => {
    return {
        showModal: val => dispatch(showModal(val))
    }
}

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
            menuItems.push(<Menu.Item key={i}>House {i+1}</Menu.Item>);
        }
        this.setState({menuItems});
    }
    handleClick = (item) => {
        const key = item.key;
        this.setState({currentUrl: sampleUrls[key]})
    }
    handleModal = (oldVal , modalTitle , modalContent , modalWidth) => {
        this.setState({oldVal , modalTitle , modalContent , modalWidth});
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
                                    <Button onClick={() => this.handleModal(true, 'Subscribe' ,<Input type="text" placeholder="Enter your email"/> , 300)} type="primary">SUBSCRIBE</Button>
                                  </div>;
      notification.open({
        duration: null,
        placement: 'bottomRight',
        message: 'Stay in touch!',
        description: notificationMessage,
      });
    };
        
    closeModal = () => {this.props.showModal(false)}
    render(){
      const {loading , currentUrl , menuItems , errorMessage , error , modalTitle , modalContent , modalWidth} = this.state;
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
          <Modal width={modalWidth?modalWidth:600} 
                 visible={this.props.modalVisible} 
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

export default connect(mapStateToProps , mapDispatchToProps)(App);
