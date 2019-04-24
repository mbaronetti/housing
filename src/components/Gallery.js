import React , { Component } from 'react';
import {Row , Col , Carousel} from 'antd';
import {HouseInfo} from './HouseInfo';
import {HouseDetails} from './HouseDetails';
import {sampleUrls} from './Helpers';
//const url = "http://partnerapi.funda.nl/feeds/Aanbod.svc/json/detail/ac1b0b1572524640a0ecc54de453ea9f/koop/6289a7bb-a1a8-40d5-bed1-bff3a5f62ee6/"
const url = sampleUrls[0];

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
            this.setState({data});
            this.props.dataLoaded(true);
            this.getHouseImages(data);
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
        const key = e.target.getAttribute('data-key');
        const modalContent = <Carousel ref={slider => (this.slider = slider)}>{carouselImages}</Carousel>;
        this.props.handleModal(true , 'Preview' , modalContent);
        setTimeout(() => this.goToImage(key) , 0)
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
        this.setState({houseImages , carouselImages})
    }
    bookClicked = () => {
        this.props.bookClicked();
    }
    
    render(){
      const {data , houseImages} = this.state;
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
    }
}

export default Gallery;
