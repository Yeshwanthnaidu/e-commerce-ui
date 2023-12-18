import { Button } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import moment from "moment/moment"
import { cancelOrder, getImage, generateReceipt } from "../../actions"
import { useSelector } from "react-redux"

const ViewOrder = (props) => {
    const navigate = useNavigate();

    const shippingAddress = JSON.parse(props?.props?.shippingAddress)
    const userData = useSelector(state => state.mainSlice.userData)

    const handleDownloadReceipt = async (orderId) => {
        await generateReceipt({username: userData.username, orderId })
    }

    return (<>
        {props?.props?._id ?
            <div style={{ display: 'grid', gridTemplateColumns: '3fr 2fr' }}>
                <div>
                    <div style={{ marginBottom: '10px' }}>Product Details:</div>
                    <div style={{ display: 'grid', gridTemplateColumns: '2fr 3fr', gap: '30px' }}>
                        <div>
                            <img variant="top" src={getImage(props?.props?.productImage)}
                                style={{
                                    display: 'block',
                                    height: '40vh',
                                    maxWidth: "100%",
                                    maxHeight: "50vh",
                                    objectFit: 'contain',
                                    border: '1px solid black',
                                    borderRadius: '20px'
                                }} />
                            <Button variant='light' style={{ marginTop: '20px', color: 'blue' }} onClick={() => { navigate(`/view_product/${props?.props?.productId}`) }}>
                                View Details
                            </Button>
                        </div>
                        <div style={{ fontSize: '17px' }}>
                            <div style={{ display: 'grid', gridTemplateColumns: '5fr 1fr 10fr' }}>
                                <span>Order Id</span>
                                <span>:</span>
                                <span>{props?.props?._id}</span>
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: '5fr 1fr 10fr' }}>
                                <span>Order Date</span>
                                <span>:</span>
                                <span>{props?.props?.orderDate}</span>
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: '5fr 1fr 10fr' }}>
                                <span>Product Name</span>
                                <span>:</span>
                                <span>{props?.props?.product_name}</span>
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: '5fr 1fr 10fr' }}>
                                <span>Description</span>
                                <span>:</span>
                                <span>{props?.props?.description}</span>
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: '5fr 1fr 10fr' }}>
                                <span>Coupon Code</span>
                                <span>:</span>
                                <span>{props?.props?.couponCode}</span>
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: '5fr 1fr 10fr' }}>
                                <span>Final Amount</span>
                                <span>:</span>
                                <span>{props?.props?.finalPrice}</span>
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: '5fr 1fr 10fr' }}>
                                <span>Shipping Address:</span>
                                <span>:</span>
                                <div className="d-flex" style={{ fontSize: '15px', flexDirection: 'column', paddingBottom: '10px' }}>
                                    <span style={{ fontSize: '18px', fontWeight: '600' }}>{shippingAddress.firstName + ' ' + shippingAddress.lastName}</span>
                                    <span>{shippingAddress.address} - {shippingAddress.selectedCity}</span>
                                    <span>{shippingAddress.selectedState} - {shippingAddress.pincode}</span>
                                    <span>LandMark: {shippingAddress.landmark}</span>
                                </div>
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: '5fr 1fr 10fr' }}>
                                <span>Contact</span>
                                <span>:</span>
                                <span>{shippingAddress.phoneNumber}</span>
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
                                            <li className={`${moment().format('DD-MM-YYYY') >= moment(props.props.orderDate).format('DD-MM-YYYY') ? 'active step0' : 'step0'}`} id="step1">PLACED</li>
                                            <li className={`${moment().format('DD-MM-YYYY') >= moment(props.props.orderDate).add(1, 'days').format('DD-MM-YYYY') ? 'active step0 text-center' : 'step0 text-center'}`} id="step2">SHIPPED</li>
                                            <li className={`${moment().format('DD-MM-YYYY') >= moment(props.props.orderDate).add(2, 'days').format('DD-MM-YYYY') ? 'active step0  text-muted text-right' : 'step0  text-muted text-right'}`} id="step3">DELIVERED</li>
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
                            <Button variant="warning" onClick={() => {handleDownloadReceipt(props?.props?._id)}}>Download Receipt</Button>
                            {!props?.props?.cancelled && <Button variant="danger" onClick={() => { cancelOrder({ username: userData.username, orderId: props?.props?._id }) }}>Cancel</Button>}
                            <Button variant="dark" onClick={() => { window.open(`https://mail.google.com/mail/?view=cm&fs=1&tf=1&to=${props?.props?.sellerContact}`, '_blank') }}>Contact Seller</Button>
                        </div>
                    </div>
                </div>
            </div > : null
        }
    </>
    )
}

export default ViewOrder