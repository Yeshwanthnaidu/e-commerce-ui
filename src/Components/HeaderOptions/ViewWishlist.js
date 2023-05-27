import React, { useEffect, useState } from 'react';
import { Card } from 'react-bootstrap';
import Carousel from 'react-bootstrap/Carousel';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { getWishlistData, addToCart, removeProductFromWishlist } from '../../actions';


const ViewWishlist = () => {
    const navigate = useNavigate()
    const [wishlistProducts, SetWishlistProducts] = useState([]);

    //Login Status
    const loginStatus = useSelector(state => state.mainSlice.loginStatus)

    //user Data
    const userData = useSelector(state => state.mainSlice.userData)

    const setWishlistData = async () => {
        SetWishlistProducts(await getWishlistData(userData.username))
    }

    useEffect(() => {
        setWishlistData();
    }, [])

    const navigateToProduct = (id) => {
        navigate(`/view_product/${id}`)
    }

    const handleAddToCart = async (productId) => {
        if(loginStatus) {
            const AddProduct = {id: productId, username: userData.username};
            addToCart(AddProduct)
        } else {
            navigate('/login')
        }
    }

    const handleRemoveFromWIshlist = async (productId) => {
        const productData = { productId, username: userData.username };
        await removeProductFromWishlist(productData)
        await setWishlistData()
    }

    return (
        <div style={{ minHeight: '88.1vh', backgroundColor: '#E5E5E5', display: 'flex', flexDirection: 'column', gap: '30px', padding: '30px' }}>
            {wishlistProducts?.length ?
                <div>
                    <div style={{ fontSize: '30px', fontWeight: '600' }}>Showing WishList:</div>
                </div> : null}
            {wishlistProducts?.length ?
                wishlistProducts.map((product, index) => {
                    return <Card>
                        <div className="row no-gutters">
                            <div className="col-md-3" onClick={() => { navigateToProduct(product._id) }}>
                                <Carousel fade>
                                    {product.images.map(imgUrl => {
                                        return (
                                            <Carousel.Item onClick={() => { navigateToProduct(product._id) }} style={{ marginLeft: '30px' }}>
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
                            </div>
                            <div className="col-md-6" onClick={() => { navigateToProduct(product._id) }}>
                                <Card.Body>
                                    <Card.Title>{product.product_name}</Card.Title>
                                    <Card.Text>{product.description}</Card.Text>
                                    <Card.Text style={{ color: 'red', fontWeight: '1000' }}>Flat {product.discount}% Discount</Card.Text>
                                    <Card.Text style={{ fontWeight: '600' }}>Special Price: &#8377; {Number(product.price) - ((Number(product.price) / 100) * Number(product.discount))} <s style={{ fontSize: '12px' }}>{product.price}</s></Card.Text>
                                </Card.Body>
                            </div>
                            <div className="col-md-3" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly' }}>
                                <div><Button style={{ backgroundColor: 'gold', color: 'black', width: '30vh' }} size='md'>Buy Now</Button></div>
                                <div><Button style={{ backgroundColor: '#E5E5E5', color: 'black', width: '30vh' }} size='md' onClick={() => { handleAddToCart(product._id) }}>Add to Cart</Button></div>
                                <div><Button style={{ backgroundColor: '#E5E5E5', color: 'black', width: '30vh' }} size='md' onClick={() => { handleRemoveFromWIshlist(product._id) }}>Remove From WishList</Button></div>
                            </div>
                        </div>
                    </Card>
                }) :
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '88.1vh', flexDirection: 'column' }}>
                    <span style={{ fontSize: '30px', fontWeight: '600' }}>Your Wishlist is Empty &#128532;</span>
                    <span style={{ color: 'blue', padding: '10px', cursor: 'pointer' }} onClick={() => { navigate('/') }}>Continue Shopping</span>
                </div>}
        </div>
    );
}

export default ViewWishlist;