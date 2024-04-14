import React, { useEffect, useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { getMyAds } from '../../actions';
import EditProduct from '../Product/EditProduct';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { mainSliceActions } from '../../Store/MainSlice';

function MyAds() {
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const [adData, setAdData] = useState([]);
    const [editProductData, setEditProductData] = useState({});
    const [showEditProduct, setShowEditProduct] = useState(false);

    useEffect(() => {
        const getAdData = async () => {
            try {
                dispatch(mainSliceActions.showLoadingPage(true))
                setAdData(await getMyAds())
                dispatch(mainSliceActions.showLoadingPage(false))
            } catch (error) {
                dispatch(mainSliceActions.showLoadingPage(false))
            }
        }
        getAdData();
    }, [showEditProduct])

    const navigateToProduct = (id) => {
        navigate(`/view_product/${id}`)
    }

    return (
        <div style={{ minHeight: '87.5vh' }}>
            <div style={{ margin: '10px', display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr', cursor: 'pointer' }}>
                {!showEditProduct && adData && adData.map((product, index) => {
                    return (
                        <Card style={{ width: '18rem', marginTop: '10px' }} key={index}>
                            <Carousel fade>
                                {product.images.map((imgUrl, index) => {
                                    return (
                                        <Carousel.Item onClick={() => { navigateToProduct(product.id) }} key={index}>
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
                            <div style={{ display: 'flex', gap: '10px', margin: '10px' }}>
                                <Button onClick={() => { navigateToProduct(product.id) }}>View</Button>
                                <Button onClick={() => { setEditProductData(product), setShowEditProduct(true) }}>Edit</Button>
                            </div>
                        </Card>
                    )
                })}
            </div>
            {showEditProduct && <EditProduct id={editProductData.id} setShowEditProduct={setShowEditProduct} />}
        </div>
    )

}

export default MyAds