import React, { Component } from 'react';
import Image from 'react-bootstrap/lib/Image';
import Table from 'react-bootstrap/lib/Table';

import Grid  from 'react-bootstrap/lib/Grid';
import Row  from 'react-bootstrap/lib/Row';
import Col  from 'react-bootstrap/lib/Col';

import ImageUser from './user_write_post.png';
import Imageposticons from './posticons.png';

class BigPost extends Component {
  /**
  * Reduce lenght of string
  * String @strDescription original String
  * String @sepChar character separator
  * Integer @ maxWord max number of word to shown
  */
  reduceDescription (strDescription, sepChar=" ", maxWords = 50) {
    //check if strDescription is valid
    if (typeof strDescription !=="string") {
      return "";
    }

    let ellipsis = "";
    let arrDescription = strDescription.split(sepChar,maxWords+1);

    //check if number of words greater @maxWords, and add ellipsis text if is true
    if (arrDescription.length>maxWords) {
      ellipsis=" ... ";
      //remove last element of array exceed @maxWords
      arrDescription.pop();
    };
    return arrDescription.join(sepChar) + ellipsis;
  };
  /**
  * Prepare a series of images to show in the interface,
  * because the first image is large, the second and third are small,
  * and then continue with this scheme
  */
  prepareArrayImagesToShow(arrImages) {
    let indexImgArrSmall=0; //support index, to generate the second and third image array
    let imagesToShow=[];  //Array of images
    arrImages.forEach(function (image, index) {
      if (index===0 || index%3===0) {
        //I'm managing the first or third image
        indexImgArrSmall=0; //Reset support index
        imagesToShow.push(image); //Add images to array
      } else {
        //I'm managing the small images
        if (indexImgArrSmall === 0) {
          //Create a new array if the support index is equal to 0
          imagesToShow.push([image]);
        } else {
          //Add image to array last created
          imagesToShow[imagesToShow.length-1].push(image);
        }
        indexImgArrSmall++;
      }
    })
    return imagesToShow;
  }

  render() {
    //extract only 6 images, to render in view
    let arrImages=this.prepareArrayImagesToShow(this.props.images.slice(0,6));
    return (
      <div className="bigPost">
        <h1>{this.props.heading}</h1>
        <h2>{this.props.subheading}</h2>
        <p>{this.reduceDescription(this.props.description)}</p>
        <Table responsive>
          <tbody>
            <tr>
              <td className="imgAuthor">
                <Image src={ImageUser}  circle /> Author
              </td>
              <td className="text-right"><Image src={Imageposticons} /> </td>
            </tr>
          </tbody>
        </Table>
        <Grid fluid>
          <Row >
            {
              arrImages.map(function(V, K){
                  //Test type of object V
                  if (V instanceof Array) {
                    /**
                    * the element is of type Array, so I'm viewing the small images that have to go one below the other
                    * Cycle the array and save the interface part in the returnscolS variable
                    */
                    let returnedcOLS = V.map(function(V1, K1){
                      return <Col className="small_image" key={'img_small' + V1.id + K1}><Image key={'img' + V1.id + K1} src={V1.url} alt={V1.type} rounded/></Col>
                    })
                    //Return interface part
                    return <Col xs={4} sm={2} key={"imgSmall"+ K}><Row className="small_container" key={"imgRowSmall"+ K}>{returnedcOLS}</Row></Col>
                  } else {
                    //The element is an object, which contains the large image
                   return <Col xs={8} sm={4} key={"imgBig"+ K}><Image key={'img' + V.id + K} src={V.url} alt={V.type}  rounded responsive/></Col>
                  }
              })
            }
          </Row>
        </Grid>
      </div>
    );
  }
}

export default BigPost;
