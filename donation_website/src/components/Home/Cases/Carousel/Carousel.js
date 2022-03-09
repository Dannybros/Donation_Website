import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Item from "./Item";
import {url} from '../../../../axios/axios'

const Simple = ({ deviceType, data }) => {
  let DeskShowItem =0;
  let tabletShowItem =2.4;


  if(data.length <=3){
    DeskShowItem = data.length;
  }else{
    DeskShowItem = 2.6
  }

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: DeskShowItem,
      paritialVisibilityGutter:70
    },
    tablet: {
      breakpoint: { max: 1024, min: 484 },
      items: tabletShowItem,
      paritialVisibilityGutter: 50
    },
    mobile: {
      breakpoint: { max: 484, min: 0 },
      items: 1.2,
      partialVisibilityGutter: 30
    }
  };

  return (
    <Carousel
        responsive={responsive}
        ssr={true}
        infinite={true}
        // autoPlay={false}
        // keyBoardControl={true}
        // customTransition="all .5"
        // transitionDuration={500}
        containerClass="carousel-container"
        removeArrowOnDeviceType={["tablet", "mobile", "desktop"]}
        deviceType={deviceType}
        itemClass="carousel-item-padding-40-px"
    >
      {data.map((item)=>{
        return(
          <Item
            key={item.title}
            title={item.title} 
            current={item.reach} 
            goal={item.goal} 
            des={item.content} 
            img={url + item.img[0]} 
            id={item._id}/>
        )
      })}
        
        
    </Carousel>
  );
};

export default Simple;
