import React from 'react';
import { Carousel } from 'antd';
import './style.css';
import banner from '../../assets/img/index/banner.jpg';
export default class Home extends React.Component {
  render() {
    return (
      <div className='home'>
        <Carousel
          autoplay
          autoplaySpeed={10000}
          className='bannerBox'
          dotPosition="bottom"
          dots={true}>
          <div className='bannerItem'>
            <img src={banner} alt="智慧园区1" />
          </div>
          <div className='bannerItem'>
            <img src={banner} alt="智慧园区1" />
          </div>
          <div className='bannerItem'>
            <img src={banner} alt="智慧园区2" />
          </div>
          <div className='bannerItem'>
            <img src={banner} alt="智慧园区3" />
          </div>
        </Carousel>
        <div className='home-box'></div>
      </div>
    )
  }
}