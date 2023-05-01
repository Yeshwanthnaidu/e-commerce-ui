import React, { useEffect, useMemo, useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { getMyAds } from '../../actions';

function MyAds() {
    const [adData, setAdData] = useState([]);

    useEffect(() => {
        const getAdData = async () => {
            setAdData(await getMyAds())
        }
        getAdData();
    }, [])

    return (
        <div style={{ minHeight: '87.5vh' }}>
            <div style={{ margin: '10px', display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr' }}>
                {adData && adData.map((product, index) => {
                    return (
                        <Card style={{ width: '18rem' }} key={index}>
                            <Carousel fade>
                                {product.images.map(imgUrl => {
                                    return (
                                        <Carousel.Item onClick={() => { console.log('pablo escobar') }}>
                                            <Card.Img variant="top" src={imgUrl}
                                                style={{
                                                    width: '300px',
                                                    height: '200px',
                                                    maxWidth: "300px",
                                                    maxHeight: "200px"
                                                }} />
                                        </Carousel.Item>
                                    )
                                })}
                            </Carousel>
                            <Card.Body onClick={() => { console.log('pablo escobar') }}>
                                <Card.Title>{product.product_name}</Card.Title>
                                <Card.Text>{product.description}</Card.Text>
                                <Card.Text style={{ color: 'red', fontWeight: '1000' }}>Flat {product.discount}% Discount</Card.Text>
                                <Card.Text style={{ fontWeight: '600' }}>Special Price: {Number(product.price) - ((Number(product.price) / 100) * Number(product.discount))} <s style={{ fontSize: '12px' }}>{product.price}</s></Card.Text>
                            </Card.Body>
                            <div style={{ display: 'flex', gap: '10px', margin: '10px' }}>
                                <Button>View</Button>
                                <Button>Edit</Button>
                            </div>
                        </Card>
                    )
                })}
            </div>
        </div>
    )

}

export default MyAds