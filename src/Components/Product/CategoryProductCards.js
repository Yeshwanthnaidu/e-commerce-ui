import React, { useEffect, useMemo, useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { getAllProducts, proxy } from '../../actions';
import notFoundImage from '../../assets/notfound.jpg'
import { useNavigate } from 'react-router-dom';

const CategoryProductCards = (props) => {
    const navigate = useNavigate();
    const [productData, setProductData] = useState([]);

    useEffect(() => {
        const { category } = props

        const getProductData = async () => {
            setProductData(await getAllProducts(category))
        }
        getProductData();
    }, [])

    const navigateToProduct = (id) => {
        navigate(`/view_product/${id}`)
    }

    return (
        <div style={{ margin: '10px', display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr', gap: '15px' }}>
            {productData?.length && productData.map(product => {
                return (
                    <Card style={{ width: '18rem' }}>
                        <Carousel fade>
                            {product.images.map(imgUrl => {
                                return (
                                    <Carousel.Item onClick={() => {
                                        // make window go back to top
                                        window.scrollTo({
                                            top: 0,
                                            left: 0,
                                            behavior: 'smooth'
                                        });
                                        return navigateToProduct(product._id)
                                    }}>
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
                        <Card.Body onClick={() => {
                            // make window go back to top
                            window.scrollTo({
                                top: 0,
                                left: 0,
                                behavior: 'smooth'
                            });
                            return navigateToProduct(product._id)
                        }}>
                            <Card.Title>{product.product_name}</Card.Title>
                            <Card.Text>{product.description}</Card.Text>
                            <Card.Text style={{ color: 'red', fontWeight: '1000' }}>Flat {product.discount}% Discount</Card.Text>
                            <Card.Text style={{ fontWeight: '600' }}>Special Price: {Number(product.price) - ((Number(product.price) / 100) * Number(product.discount))} <s style={{ fontSize: '12px' }}>{product.price}</s></Card.Text>
                        </Card.Body>
                    </Card>
                )
            })}
        </div>
    );
}

export default CategoryProductCards