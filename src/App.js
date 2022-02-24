import React from 'react';
import { Routes, NavLink, Route } from 'react-router-dom';
import Case from './view/Case/index';
import About from './view/About/index';
import Home from './view/Home/index';
import BusinessScope from './view/BusinessScope';
import logo from './assets/img/index/logo.png';
export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      scrollTop: 0
    };
  }
  componentDidMount() {
  }
  //回到顶部
  onScrollTop = () => {
    if (document.body.scrollTop > 0 || document.documentElement.scrollTop > 0) {
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
    }
  }
  handleScroll = () => {
    this.setState({
      scrollTop: document.body.scrollTop || document.documentElement.scrollTop
    })
  }

  render() {
    const { scrollTop } = this.state;
    return (
      <div onWheel={this.handleScroll}>
        <header className={scrollTop > 70 ? "shadow" : ""}>
          <div className='wrapper'>
            <img className="logo" src={logo}></img>
            <nav className="header-nav">
              <NavLink to="/">首页</NavLink>
              <NavLink to="/businessScope">业务领域</NavLink>
              <NavLink to="/case">案例演示</NavLink>
              <NavLink to="/about">关于我们</NavLink>
            </nav>
          </div>
        </header>
        <Routes>
          <Route exact strict path="/" element={<Home />}></Route>
          <Route exact strict path="/businessScope" element={<BusinessScope />}></Route>
          <Route exact strict path="/case" element={<Case />}></Route>
          <Route exact strict path="/about" element={<About />}></Route>
        </Routes>
        <footer>
          <div className="footerT">
            <div className="wrapper ovh">
              <div className="footerL">
                <div className="footerItem">
                  <p>技术服务</p>
                  <div className="ftb">
                    <div><a href="/">技术咨询</a></div>
                    <div><a href="/">工程实施</a></div>
                    <div><a href="/">售后服务</a></div>
                  </div>
                </div>
              </div>
              <div className="footerR">
                <p className="textCenter">
                  <i className="icon iconfont icon-dianhua"></i>
                  <span>0755-8326-9919</span>
                </p>
                <p className="textCenter">
                  <i className="icon iconfont icon-youxiang"></i>
                  <span>abc@meshox.com</span>
                </p>
                <p className="textCenter">
                  <i className="icon iconfont icon-dizhi"></i>
                  <span>深圳市龙华新区清祥路1号宝能科技园7栋A座11楼</span>
                </p>
              </div>
            </div>
          </div>
          <div className='footerB'>
            <div className="wrapper ovh textCenter">
              <span >Copyright ©2019深圳市达英和自动化工程有限公司.版权所有</span>
              <a href="http://beian.miit.gov.cn/" target="_blank">粤ICP备140136389</a>
            </div>
          </div>
        </footer>
        <div className="suspension_box">
          <ul>
            <li className="textCenter">
              <i className="icon iconfont icon-dianhua"></i>
              <div>0755-8326-9919</div>
            </li>
            <li className="textCenter">
              <i className="icon iconfont icon-xiaoxi"></i>
              <div></div>
            </li>
            <li className="textCenter" onClick={this.onScrollTop}>
              <i className="icon iconfont icon-dingbu"></i>
            </li>
          </ul>
        </div>
      </div>
    )
  }
}