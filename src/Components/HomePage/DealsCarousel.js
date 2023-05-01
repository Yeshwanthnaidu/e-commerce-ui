import Carousel from 'react-bootstrap/Carousel';

import deals1 from '../../assets/deals1.jpg'
import deals2 from '../../assets/deals2.jpg'
import deals3 from '../../assets/deals3.jpg'

const DealsCarousel = () => {
    return (
        <>
            <Carousel fade>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src={deals1}
                        alt="First slide"
                        style={{maxHeight: "250px"}}
                    />
                    {/* <Carousel.Caption>
                        <h3>First slide label</h3>
                        <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                    </Carousel.Caption> */}
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src={deals2}
                        alt="Second slide"
                        style={{maxHeight: "250px"}}
                    />
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src={deals3}
                        alt="Third slide"
                        style={{maxHeight: "250px"}}
                    />
                </Carousel.Item>
            </Carousel>
        </>
    )
}

export default DealsCarousel;