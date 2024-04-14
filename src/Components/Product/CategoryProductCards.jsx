import React, { useEffect, useMemo, useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { getAllProducts } from '../../actions';
import notFoundImage from '../../assets/notfound.jpg'
import { useNavigate, useParams } from 'react-router-dom';

const CategoryProductCards = (props) => {
    const navigate = useNavigate();
    const [productData, setProductData] = useState([]);
    const { id } = useParams()

    useEffect(() => {
        const { category } = props

        const getProductData = async () => {
            const data = await getAllProducts(category);
            setProductData(data.filter(p => p.id !== parseInt(id)))
        }
        getProductData();
    }, [])

    const navigateToProduct = (id) => {
        navigate(`/view_product/${id}`)
    }

    return (
        <>
            {productData?.length ? productData.map(product => {
                return (
                    <div style={{ margin: '10px', display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr', gap: '15px' }}>
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
                                            return navigateToProduct(product.id)
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
                            <Card.Body style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }} onClick={() => {
                                // make window go back to top
                                window.scrollTo({
                                    top: 0,
                                    left: 0,
                                    behavior: 'smooth'
                                });
                                return navigateToProduct(product.id)
                            }}>
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
                    </div>
                )
            }) :
                <div className='w-100'>
                    <span className='d-flex' style={{ justifyContent: 'center', padding: '2rem', fontSize: '1.5rem', fontWeight: '500', textAlign: 'center' }}>Sorry No Related Products Found</span>
                </div>}
        </>
    );
}

export default CategoryProductCards