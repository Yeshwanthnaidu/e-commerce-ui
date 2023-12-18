import React, { useEffect, useState } from 'react';
import { Card } from 'react-bootstrap';
import Carousel from 'react-bootstrap/Carousel';
import { useNavigate, useParams } from 'react-router-dom';

import { getSearchData, getImage } from '../../actions';

const SearchResult = () => {
    const navigate = useNavigate()
    const [searchProducts, SetSearchProducts] = useState([]);

    const { query } = useParams();

    const searchData = async () => {
        SetSearchProducts(await getSearchData(query))
    }

    useEffect(() => {
        searchData();
    }, [query])

    const navigateToProduct = (id) => {
        navigate(`/view_product/${id}`)
    }

    return (
        <div style={{ minHeight: '88.1vh', backgroundColor: '#E5E5E5', display: 'flex', flexDirection: 'column', gap: '30px', padding: '30px' }}>
            <div>
                <div style={{ fontSize: '20px', fontWeight: '600' }}>Showing Results of <span style={{ color: 'red' }}>{query}</span>:</div>
            </div>
            {searchProducts?.length ?
                searchProducts.map((product, index) => {
                    return <Card>
                        <div className="row no-gutters">
                            <div className="col-md-3" onClick={() => { navigateToProduct(product._id) }}>
                                <Carousel fade>
                                    {product.images.map(imgUrl => {
                                        return (
                                            <Carousel.Item onClick={() => { navigateToProduct(product._id) }} style={{ marginLeft: '30px' }}>
                                                <Card.Img variant="top" src={getImage(imgUrl)}
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
                            </div>
                            <div className="col-md-8" onClick={() => { navigateToProduct(product._id) }}>
                                <Card.Body>
                                    <Card.Title>{product.product_name}</Card.Title>
                                    <Card.Text>{product.description}</Card.Text>
                                    <Card.Text style={{ color: 'red', fontWeight: '1000' }}>Flat {product.discount}% Discount</Card.Text>
                                    <Card.Text id={`productPrice${index}`} style={{ fontWeight: '600' }}>
                                        Special Price: &#8377; {(Number(product.price) - ((Number(product.price) / 100) * Number(product.discount)))} <s style={{ fontSize: '12px' }}>{product.price}</s>
                                    </Card.Text>
                                </Card.Body>
                            </div>
                        </div>
                    </Card>
                }) :
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '88.1vh', flexDirection: 'column' }}>
                    <span style={{ fontSize: '30px', fontWeight: '600' }}>No Products found &#128532;</span>
                    <span style={{ color: 'blue', padding: '10px', cursor: 'pointer' }} onClick={() => { navigate('/') }}>Continue Shopping</span>
                </div>}
        </div>
    );
}

export default SearchResult;