import { React, useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import Carousel from 'react-bootstrap/Carousel';
import { useDispatch, useSelector } from 'react-redux';

import { getProduct, userRatingToProduct, addToCart, addProductToWishlist, getImage } from '../../actions';
import { mainSliceActions } from '../../Store/MainSlice';

import notFOundImage from '../../assets/notfound.jpg'
import oopsPageNotFound from '../../assets/oopsPageNotFound.jpg'
import CategoryProductCards from './CategoryProductCards';

const ViewProduct = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [rating, setRating] = useState(0);
    const [review, setReview] = useState('');
    const [productData, setProductData] = useState({});
    const [showProductNotFound, setShowProductNotFound] = useState(false);

    //Login Status
    const loginStatus = useSelector(state => state.mainSlice.loginStatus)
    //user Data
    const userData = useSelector(state => state.mainSlice.userData)

    const { id } = useParams();

    useEffect(() => {
        const getProductData = async (productId) => {
            try {
                dispatch(mainSliceActions.showLoadingPage(true));
                const data = await getProduct(productId);
                setProductData(data);
                dispatch(mainSliceActions.showLoadingPage(false));
                setShowProductNotFound(false);
            } catch (error) {
                console.error('Error fetching product data:', error);
                dispatch(mainSliceActions.showLoadingPage(false));
                setShowProductNotFound(true);
            }
        };

        if (id) {
            getProductData(id);
        }
    }, [id, dispatch]);

    // user Rating
    const handleRateProduct = () => {
        const ratingData = { id: productData._id, starRating: rating, review, user: userData.name, username: userData.username }
        if (loginStatus && rating != 0 && productData._id) {
            userRatingToProduct(ratingData)
            setRating(0);
            setReview('');
        }
    }

    // Add to Cart
    const handleAddToCart = () => {
        if (loginStatus) {
            const AddProduct = { id: productData._id, username: userData.username };
            addToCart(AddProduct)
        } else {
            navigate('/login')
        }
    }

    const contactSellerBtnClicked = (sellerEmail) => {
        window.open(`https://mail.google.com/mail/?view=cm&fs=1&tf=1&to=${sellerEmail}`, '_blank')
    }

    const handleAddToWishlist = () => {
        if (loginStatus) {
            const AddProduct = { id: productData._id, username: userData.username };
            addProductToWishlist(AddProduct)
        } else {
            navigate('/login')
        }
    }

    const handleBuyNow = async (productId) => {
        if (loginStatus) {
            navigate(`/book_now/${productId}`)
        } else {
            navigate('/login')
        }
    }

    return (
        <>
            {productData?._id ?
                <div style={{ minHeight: '87.5vh', backgroundColor: 'white' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', padding: '25px' }}>
                        <div>
                            <Carousel fade style={{ border: 'solid black 2px', borderRadius: '10px', margin: '15px' }}>
                                {productData.images.map((imgUrl, index) => {
                                    return (
                                        <Carousel.Item key={index}>
                                            <img variant="top" src={getImage(imgUrl)} onClick={() => { window.open(getImage(imgUrl), '_blank') }}
                                                style={{
                                                    width: '100%',
                                                    display: 'block',
                                                    height: '65vh',
                                                    maxWidth: "100%",
                                                    maxHeight: "65vh",
                                                    objectFit: 'contain'
                                                }} />
                                        </Carousel.Item>
                                    )
                                })}
                            </Carousel>
                        </div>
                        <div style={{ padding: '15px' }}>
                            <div style={{ margin: '20px' }}>
                                <h3>
                                    <b>{productData.product_name}</b>
                                </h3>
                            </div>
                            <div style={{ margin: '20px' }}>
                                <h6>{productData.description}</h6>
                            </div>
                            <div style={{ margin: '20px', display: ' grid', gridTemplateColumns: '1fr 1fr 1fr' }}>
                                <div>
                                    <div style={{ paddingTop: '20px' }}>
                                        <div style={{ backgroundColor: "#ADD8E6", padding: '5px', width: '180px', borderRadius: '10px', textAlign: 'center' }}>
                                            Inventory Stock : {productData.inventory_stock}
                                        </div>
                                        <div style={{ backgroundColor: "#FFCCCB", padding: '5px', marginTop: '10px', width: '180px', borderRadius: '10px', textAlign: 'center' }}>
                                            Discount : {productData.discount}%
                                        </div>
                                        <div>
                                            <div style={{ display: 'flex', fontSize: '25px', marginTop: '10px', gap: '10px' }}>
                                                <b>Price: {Number(productData.price) - ((Number(productData.price) / 100) * Number(productData.discount))}/-</b>
                                                <s style={{ fontSize: '16px', marginTop: '10px' }}>{productData.price}</s>
                                            </div>
                                            <div style={{}}>
                                                <p style={{ textAlign: 'right', fontSize: '13px', marginRight: '40px' }}>(Incl. of All Taxes)</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='TechSpecs' style={{ marginTop: '20px' }}>
                                        <h5><b>Technical Specifications:</b></h5>
                                        <div style={{ display: 'grid', gridTemplateColumns: '4fr 1fr 5fr' }}>
                                            {JSON.parse(productData.techSpecifications[0]).map((spec, index) => {
                                                return (
                                                    <>
                                                        <h6>{spec.key}</h6>
                                                        <h6>:</h6>
                                                        <h6>{spec.value}</h6>
                                                    </>
                                                )
                                            })}
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <div style={{ display: 'flex', gap: '20px', alignContent: 'center', alignItems: 'center' }}>
                                        <div><b>User Ratings:</b></div>
                                        <div>
                                            {[...Array(5)].map((star, index) => {
                                                return (
                                                    <span key={index} style={{ color: Math.abs(productData.userRating) >= index + 1 ? 'RED' : 'grey', fontSize: '30px' }}>&#9733;</span>
                                                );
                                            })}
                                        </div>
                                    </div>
                                    {loginStatus && <>
                                        <div>
                                            <div><b>Add Review:</b></div>
                                            <div className="star-rating">
                                                {[...Array(5)].map((star, index) => {
                                                    index += 1;
                                                    return (
                                                        <button
                                                            type="button"
                                                            key={index}
                                                            className={index <= rating ? "on" : "off"}
                                                            onClick={() => setRating(index)}
                                                            style={{ fontSize: '30px' }}
                                                        >
                                                            <span className="star">&#9733;</span>
                                                        </button>
                                                    );
                                                })}
                                            </div>
                                            <div>
                                                <textarea value={review} onChange={(e) => { setReview(e.target.value) }} style={{ width: '90%', height: '12.8vh' }}></textarea>
                                            </div>
                                        </div>
                                        <div>
                                            <Button onClick={handleRateProduct} style={{ backgroundColor: 'gold', color: 'black' }} size='sm'>Submit Review</Button>
                                        </div>
                                    </>}
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', alignItems: 'center' }}>
                                    <div><Button style={{ backgroundColor: 'gold', color: 'black', width: '30vh' }} size='md' onClick={() => { handleBuyNow(productData._id) }}>Buy Now</Button></div>
                                    <div><Button style={{ backgroundColor: 'gold', color: 'black', width: '30vh' }} onClick={handleAddToCart} size='md'>Add to Cart</Button></div>
                                    <div><Button style={{ backgroundColor: 'gold', color: 'black', width: '30vh' }} onClick={handleAddToWishlist} size='md'>Add to Wishlist</Button></div>
                                    <div><Button style={{ backgroundColor: 'gold', color: 'black', width: '30vh' }} onClick={() => { contactSellerBtnClicked(productData.SellerContact) }} size='md'>Contact Seller</Button></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div style={{ backgroundColor: 'bisque', borderRadius: '20px', padding: '25px', height: '30vh', overflowY: 'scroll', margin: '20px' }}>
                            <div>
                                <b>User Reviews:</b>
                            </div>
                            <div style={{ padding: '10px', borderRadius: '5px' }}>
                                {productData.reviews.length > 0 ?
                                    <>
                                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 3fr 2fr', alignItems: 'center', textAlign: 'start' }}>
                                            {productData.reviews.map(review => {
                                                return <>
                                                    <b>{review.user}:</b>
                                                    <div>{review.review}</div>
                                                    <div>
                                                        {[...Array(5)].map((star, index) => {
                                                            return (
                                                                <span key={index} style={{ color: Math.abs(Number(review.starRating)) >= index + 1 ? 'RED' : 'grey', fontSize: '30px' }}>&#9733;</span>
                                                            );
                                                        })}
                                                    </div>
                                                </>
                                            })}
                                        </div>
                                    </> :
                                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                                        <b>No Reviews Yet</b>
                                    </div>
                                }

                            </div>
                        </div>
                    </div>
                    <div style={{ padding: '10px' }}>
                        <div style={{ padding: '25px' }}>
                            <b>Suggessted Products</b>
                        </div>
                        <>
                            <CategoryProductCards category={productData.product_type} />
                        </>
                    </div>
                </div> : <></>}
            {showProductNotFound && <img src={oopsPageNotFound} style={{ width: '98.9vw' }} />}
        </>
    )
}

export default ViewProduct