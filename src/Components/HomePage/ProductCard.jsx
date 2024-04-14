import React, { useEffect, useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import Card from 'react-bootstrap/Card';
import { getAllProducts } from '../../actions';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { mainSliceActions } from '../../Store/MainSlice';

const ProductCard = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [productData, setProductData] = useState([]);

    useEffect(() => {
        const getProductData = async () => {
            try {
                dispatch(mainSliceActions.showLoadingPage(true));
                setProductData(await getAllProducts());
                dispatch(mainSliceActions.showLoadingPage(false));
            } catch (error) {
                console.error('Error fetching product data:', error);
                dispatch(mainSliceActions.showLoadingPage(false));
            }
        }
        getProductData();
    }, [])

    const navigateToProduct = (id) => {
        navigate(`/view_product/${id}`)
    }

    return (
        <div style={{ margin: '10px', display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr', gap: '15px', cursor: 'pointer' }}>
            {productData?.length && productData.map(product => {
                return (
                    <Card style={{ width: '18rem' }}>
                        <Carousel fade>
                            {product.images.map(imgUrl => {
                                return (
                                    <Carousel.Item onClick={() => { navigateToProduct(product.id) }}>
                                        <Card.Img variant="top" src={imgUrl}
                                            style={{
                                                width: '300px',
                                                height: '200px',
                                                maxWidth: "300px",
                                                maxHeight: "200px",
                                                objectFit: "contain",
                                            }} />
                                    </Carousel.Item>
                                )
                            })}
                        </Carousel>
                        <Card.Body onClick={() => { navigateToProduct(product.id) }} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                            <div style={{ marginBottom: '10px' }}>
                                <Card.Title>{product.productName}</Card.Title>
                                <Card.Text>{product.description}</Card.Text>
                            </div>
                            <div style={{ display: 'grid', gridTemplateRows: '1fr 1fr', }}>
                                <Card.Text style={{ color: 'red', fontWeight: '1000' }}>Flat {product.discount}% Discount</Card.Text>
                                <Card.Text style={{ fontWeight: '600' }}>Special Price: &#8377; {Number(product.price) - ((Number(product.price) / 100) * Number(product.discount))} <s style={{ fontSize: '12px' }}>{product.price}</s></Card.Text>
                            </div>
                        </Card.Body>
                    </Card>
                )
            })}
        </div>
    );
}

export default ProductCard