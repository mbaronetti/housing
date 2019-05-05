import React , { Component } from 'react';
import { connect } from 'react-redux';
import { showModal , setData , setHouseImages} from '../redux/actions/index';
import {Row , Col , Carousel} from 'antd';
import {HouseInfo} from './HouseInfo';
import {HouseDetails} from './HouseDetails';
import {sampleUrls} from './Helpers';
//const url = "http://partnerapi.funda.nl/feeds/Aanbod.svc/json/detail/ac1b0b1572524640a0ecc54de453ea9f/koop/6289a7bb-a1a8-40d5-bed1-bff3a5f62ee6/"
const url = sampleUrls[0];

const mapStateToProps = state => {
    return {
        modalVisible: state.modalVisible,
        data: state.data,
        houseImages: state.houseImages,
        showModal: state.showModal
    }
}

const mapDispatchToProps = dispatch => {
    return{
        showModal: val => dispatch(showModal(val)),
        setData: data => dispatch(setData(data)),
        setHouseImages: data => dispatch(setHouseImages(data))
    }
}

class Gallery extends Component{
    constructor(props){
        super(props);
        this.state = {
            data: {}
        }
    }
    
    getData = url => {
        this.props.dataLoaded(false);
        fetch(url)
        .then(response => response.json())
        .then(data => {
            console.log(data); 
            this.props.dataLoaded(true);
            this.getHouseImages(data);
            this.props.setData(data);
        })
        .catch(e => {
            console.error(e);
            this.props.dataLoaded(false);
            this.props.hasErrored(true , e.message);
        });
    }
    
    componentDidMount(){
        this.getData(url);
    }

    openGallery = (e) => {
        const {carouselImages} = this.state;
        const { showModal } = this.props;
        const key = e.target.getAttribute('data-key');
        const modalContent = <Carousel ref={slider => (this.slider = slider)}>{carouselImages}</Carousel>;
        this.props.handleModal(true , 'Preview' , modalContent , 800);
        showModal(true);
        setTimeout(() => this.goToImage(key) , 200)
    }
    goToImage = index => {
        this.slider.goTo(index)
    }
    componentDidUpdate(nextProps){
        if(this.props.url !== nextProps.url){
            const {url} = this.props;
            this.getData(url);
        }
    }
    mouseEnter = (e) => {
        const target = e.target;
        const houseImages = document.body.querySelectorAll('.house-image');
        for(let i=0;i<houseImages.length;i++){
            const currentImage = houseImages[i];
            currentImage.style.opacity = '.75';
        }
        target.style.opacity = 1;
        
    }
    mouseLeave = (e) => {
        const houseImages = document.body.querySelectorAll('.house-image');
        for(let i=0;i<houseImages.length;i++){
            const currentImage = houseImages[i];
            currentImage.style.opacity = '1';
        }
        
    }
    getHouseImages = data => {
        const houseImages = [];
        const carouselImages = [];
        for(let i = 0; i<data['Media-Foto'].length;i++){
            const currentMedia = data['Media-Foto'][i];
            const carouselImageSrc = data['Media'][i]['MediaItems'][3]['Url'];
            carouselImages.push(<div key={i}>
                                    <img src={carouselImageSrc} 
                                         alt="carousel" />
                                </div>);
            houseImages.push(<Col lg={4} md={6} sm={8} xs={12} key={i} >
                                <img data-key={i} 
                                     onMouseEnter={this.mouseEnter}
                                     onMouseLeave={this.mouseLeave}
                                     onClick={this.openGallery} 
                                     className="house-image img-fluid border-white pointer" 
                                     src={currentMedia} 
                                     alt="preview" />
                             </Col>);
        }
        const images = {houseImages , carouselImages};
        this.props.setHouseImages(houseImages);
        this.setState({carouselImages})
    }
    bookClicked = () => {
        this.props.bookClicked();
    }
    
    render(){
      const {data , houseImages} = this.props;
      if(data)
        return (
        <div className="gallery-container">
            <Row type="flex" align="top" gutter={12}>
                <Col lg={8} md={12} sm={24}>
                    <HouseInfo  bookButtonText="BUY"
                                bookClicked={this.bookClicked}
                                cover={data.HoofdFoto}
                                avatar={data.HoofdFoto}
                                description={data.Voorzieningen}
                    >
                        <ul className="house-info-list">
                            <li><strong>AantalWoonlagen:</strong> {data.AantalWoonlagen}</li>
                            <li><strong>Adres:</strong> {data.Adres}</li>
                            <li><strong>Bouwvorm:</strong> {data.Bouwvorm}</li>
                            <li><strong>Cv:</strong> {data.Cv}</li>
                            <li className="house-info-list_highlighted green">$ {data.KoopPrijs}</li>
                        </ul>
                    </HouseInfo>
                </Col>
                <Col lg={16} md={12} sm={24}>
                    <HouseDetails description={data.VolledigeOmschrijving} 
                                  images={houseImages}
                    />
                </Col>
            </Row>
            {this.props.children}
        </div>
      );
        return null
    }
}
    
export default connect(mapStateToProps , mapDispatchToProps)(Gallery);
