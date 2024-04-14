import { Button } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import moment from "moment/moment"
import { cancelOrder, generateReceipt } from "../../actions"
import { useSelector } from "react-redux"

const ViewOrder = (props) => {
    const navigate = useNavigate();

    const userData = useSelector(state => state.mainSlice.userData)
    
    const orderData = props.props;
    const shippingAddress = orderData?.shippingAddress

    const handleDownloadReceipt = async (orderId) => {
        await generateReceipt({ username: userData.username, orderId })
    }

    return (<>
        {props?.props?.id ?
            <div style={{ display: 'grid', gridTemplateColumns: '3fr 2fr' }}>
                <div>
                    <div style={{ marginBottom: '10px' }}>Product Details:</div>
                    <div style={{ display: 'grid', gridTemplateColumns: '2fr 3fr', gap: '30px' }}>
                        <div>
                            <img variant="top" src={orderData.image}
                                style={{
                                    display: 'block',
                                    height: '40vh',
                                    maxWidth: "100%",
                                    maxHeight: "50vh",
                                    objectFit: 'contain',
                                    border: '1px solid black',
                                    borderRadius: '20px'
                                }} />
                            <Button variant='light' style={{ marginTop: '20px', color: 'blue' }} onClick={() => { navigate(`/view_product/${orderData?.productId}`) }}>
                                View Details
                            </Button>
                        </div>
                        <div style={{ fontSize: '17px' }}>
                            <div style={{ display: 'grid', gridTemplateColumns: '5fr 1fr 10fr' }}>
                                <span>Order Id</span>
                                <span>:</span>
                                <span>{orderData?.id}</span>
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: '5fr 1fr 10fr' }}>
                                <span>Order Date</span>
                                <span>:</span>
                                <span>{moment(orderData?.orderedOn).format('DD-MM-YYYY')}</span>
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: '5fr 1fr 10fr' }}>
                                <span>Product Name</span>
                                <span>:</span>
                                <span>{orderData?.productName}</span>
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: '5fr 1fr 10fr' }}>
                                <span>Description</span>
                                <span>:</span>
                                <span>{orderData?.description}</span>
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: '5fr 1fr 10fr' }}>
                                <span>Coupon Code</span>
                                <span>:</span>
                                <span>{orderData?.couponCode}</span>
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: '5fr 1fr 10fr' }}>
                                <span>Quantity</span>
                                <span>:</span>
                                <span>{orderData?.buyingQuantity || 'Not Found'}</span>
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: '5fr 1fr 10fr' }}>
                                <span>Final Amount</span>
                                <span>:</span>
                                <span>{orderData?.finalPrice}</span>
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: '5fr 1fr 10fr' }}>
                                <span>Shipping Address:</span>
                                <span>:</span>
                                <div className="d-flex" style={{ fontSize: '15px', flexDirection: 'column', paddingBottom: '10px' }}>
                                    <span style={{ fontSize: '18px', fontWeight: '600' }}>{shippingAddress?.firstName + ' ' + shippingAddress?.lastName}</span>
                                    <span>{shippingAddress?.address} - {shippingAddress?.city}</span>
                                    <span>{shippingAddress?.state} - {shippingAddress?.pincode}</span>
                                    <span>LandMark: {shippingAddress?.landmark}</span>
                                </div>
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: '5fr 1fr 10fr' }}>
                                <span>Contact</span>
                                <span>:</span>
                                <span>{shippingAddress?.phoneNumber}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <div>
                        Track package:
                        <div>
                            {!props?.props?.cancelled ?
                                <div className="row px-3">
                                    <div className="col">
                                        <ul id="progressbar" >
                                            <li className={`${moment().format('DD-MM-YYYY') >= moment(orderData?.orderedOn).format('DD-MM-YYYY') ? 'active step0' : 'step0'}`} id="step1">PLACED</li>
                                            <li className={`${moment().format('DD-MM-YYYY') >= moment(orderData?.orderedOn).add(1, 'days').format('DD-MM-YYYY') ? 'active step0 text-center' : 'step0 text-center'}`} id="step2">SHIPPED</li>
                                            <li className={`${moment().format('DD-MM-YYYY') >= moment(orderData?.orderedOn).add(2, 'days').format('DD-MM-YYYY') ? 'active step0  text-muted text-right' : 'step0  text-muted text-right'}`} id="step3">DELIVERED</li>
                                        </ul>
                                    </div>
                                </div> :
                                <div>
                                    <div style={{ textAlign: 'center', fontSize: '60px', fontWeight: '600', color: 'red', paddingTop: '0px 20px 0px 40px' }}>
                                        CANCELLED
                                    </div>
                                </div>}
                        </div>

                    </div>
                    <div style={{ display: 'flex', justifyContent: "center" }}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', width: '40%' }}>
                            <Button variant="warning" onClick={() => { handleDownloadReceipt(orderData.id) }}>Download Receipt</Button>
                            {!orderData.cancelled && <Button variant="danger" onClick={() => { cancelOrder({ username: userData.username, orderId: orderData.id }) }}>Cancel</Button>}
                            <Button variant="dark" onClick={() => { window.open(`https://mail.google.com/mail/?view=cm&fs=1&tf=1&to=${orderData.sellerContact}`, '_blank') }}>Contact Seller</Button>
                        </div>
                    </div>
                </div>
            </div > : null
        }
    </>
    )
}

export default ViewOrder