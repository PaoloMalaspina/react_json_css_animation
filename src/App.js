import React, { Component } from 'react';

/* external library */
//
import { Parallax } from 'react-parallax';
//
import Grid  from 'react-bootstrap/lib/Grid';
import Row  from 'react-bootstrap/lib/Row';
import Col  from 'react-bootstrap/lib/Col';
/* app components*/
import AppNavBar from './components/AppNavBar';
import BigPost  from './components/BigPost';
import SmallPost  from './components/SmallPost';
import LightBoxPost from './components/LightBoxPost';
//Logo
import logo from './uala_small_black.svg';
//CSS
import './App.css';
import './css/BigPost.css';
import './css/SmallPost.css';
import './css/LightBoxPost.css';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      navBarHide:false, //Specify behavior of navbar, true: show, false: hide
      mainGridFullScreen:false, //Specify behavior of main Grid, true: use 12 columns of bootstrap, false: use sm-10 md-8 columns of bootstrap
      datasForLightBoxPost:null, //Specify behavior of LightBoxPost, !=null show, null: hide
      posts: {} //List of objects of type posts, returned by API
    };
    /* bind object "this" to a specific function, for use it inside */
    this.loadData = this.loadData.bind(this);
    this.animateInterface = this.animateInterface.bind(this);
  };

  /**
  * Determines the rendering mainNavBar
  * - Hide NavBar if the top position of containerPost is less than the height of NavBar
  */
  animateInterface() {
    let mainNavBar = document.getElementById('mainNavBar').getBoundingClientRect();
    let containerPost = document.getElementById('containerPost').getBoundingClientRect();
    let navBarHide =  (containerPost.y< mainNavBar.y+mainNavBar.height)
    //Change state if the property is different
    if (navBarHide !== this.state.navBarHide) {
       this.setState({navBarHide: navBarHide});
    }
  }

  componentDidMount(){
    //Connect event listeners
    window.addEventListener('scroll', this.animateInterface);
    //Start the request to find external data
    this.loadData()
  };

  componentWillUnmount(){
    //Disconnect event listeners to optimize resources
    window.removeEventListener('scroll', this.animateInterface);
  };

  //Send request to the proxy, for loading datas
  loadData () {
    let url = 'http://localhost/api/getdatas.php';   //Proxy Url
    let self= this; //Save this object for use it in inner function
    //Start call
    fetch(url,{
      method: "POST",
      mode: "cors",
      body: ""
    })
    .then((resp) => resp.json()) // Transform the data into json
    .then(function(xdata) {
      // Update the state  "posts" for reload interface whit post datas
      self.setState({posts: xdata});
    })
  };

  render() {
    let bigPost = []; //Array of bigPost
    let smallPost = []; //Array of smallPost
    if (this.state.posts instanceof Array && this.state.posts.length>0) {
      //Set the array of posts if they are present
      bigPost=[this.state.posts[0]];  //The first post is bigPost
      smallPost = this.state.posts.slice(1,this.state.posts.length+1);
    }
    //CallBack function to close the lightbox
    let hideLightBoxPost = () => this.setState({datasForLightBoxPost:null});
    //CallBack function to open the lightbox
    let showLightBox = (datas) => this.setState({datasForLightBoxPost: datas});
    return (
      <div className="App">
        <AppNavBar id="mainNavBar" className={this.state.navBarHide ? "navBarHide" : "navBarShow"} logo={logo} />
        <Parallax bgImage={require('./cover.png')} bgWidth="100%" bgHeight="auto" bgClassName="cover" bgImageAlt="Cover" strength={200}>
          <div id="containerPost" >
            <Grid fluid>
              <Row>
                <Col xs={8}>
                  {
                   bigPost.map(function(object, i){
                     if (typeof object !== "undefined") {
                      return <BigPost key={"bigpost" + object.id + i} images={object.images} heading={object.heading} subheading={object.subheading} description={object.description}/>
                    } else {
                      return "";
                    }
                  })}
                </Col>
                <Col xs={4}>
                <Grid id="containerSmallPost">
                  {
                  smallPost.map(function(object, i){
                    if (typeof object !== "undefined") {
                     return <Row key={"smallpostrow" +i} className="show-grid">
                     <Col xs={12} key={"smallpostrow"+i +"col"}><SmallPost key={"smallpost" + object.id + i}
                      indexView={i+1}
                      icons={object.icons} heading={object.heading} subheading={object.subheading} description={object.description}
                      images={object.images}
                      onClickBtn={ showLightBox}
                      /></Col></Row>
                   } else {
                     return "";
                   }
                  })
                  }
                  </Grid>
                </Col>
              </Row>
            </Grid>
          </div>
        </Parallax>
        <LightBoxPost show={this.state.datasForLightBoxPost!==null} id="LightBoxPost" datas={this.state.datasForLightBoxPost} onHide={hideLightBoxPost} />
      </div>
    );
  }
}

export default App;
