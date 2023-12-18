import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { getImage, proxy } from "../../actions";
import notFoundImage from '../../assets/notfound.jpg';

import { mainSliceActions } from "../../Store/MainSlice";
import EditConfirmationModal from "./Modals/EditConfirmationModal";

const EditProduct = (props) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [productName, setProductName] = useState(props.props.product_name);
    const [description, setDescription] = useState(props.props.description);
    const [typeNR, setTypeNR] = useState(props.props.type_new_or_refurbished);
    const [price, setPrice] = useState(props.props.price);
    const [discount, setDiscount] = useState(props.props.discount);
    // const [prevImages, setPrevImages] = useState([...props.props.images])
    const [images, setImages] = useState([]); // props.props.images
    const [productType, setProductType] = useState(props.props.product_type);
    const [manufacturer, setManudacturer] = useState(props.props.manufacturer);
    const [techSpecs, settechSpecs] = useState(JSON.parse(props.props.techSpecifications[0]));
    const [stock, setStock] = useState(props.props.inventory_stock);

    const [showEditConfirmationModal, setShowEditConfirmationModal] = useState(false);

    // function to handle adding a new key-value pair
    const handleAdd = () => {
        const values = [...techSpecs];
        values.push({ key: "", value: "" });
        settechSpecs(values);
    };

    // function to handle removing a key-value pair
    const handleRemove = (index) => {
        const values = [...techSpecs];
        values.splice(index, 1);
        settechSpecs(values);
    };

    // function to handle editing a key-value pair
    const handleEdit = (index, key, value) => {
        const values = [...techSpecs];
        values[index].key = key;
        values[index].value = value;
        settechSpecs(values);
    };

    // function to render the key-value input fields
    const rendertechSpecs = () => {
        return techSpecs.map((kv, index) => (
            <div className="d-flex" style={{ gap: '10px', alignItems: 'center', marginLeft: '10px' }} key={`${index}`}>
                <span>{index + 1}</span>
                <input
                    className="p-1"
                    style={{ width: '20vw', margin: '10px', borderRadius: '5px' }}
                    type="text"
                    placeholder="Enter Specification Name"
                    value={kv.key}
                    onChange={(e) => handleEdit(index, e.target.value, kv.value)}
                />
                <input
                    className="p-1"
                    style={{ width: '30vw', margin: '10px', borderRadius: '5px' }}
                    type="text"
                    placeholder="Enter Specification Value"
                    value={kv.value}
                    onChange={(e) => handleEdit(index, kv.key, e.target.value)}
                />
                <button className="btn btn-danger mr-2" type="button" onClick={() => handleRemove(index)}>Remove</button>
            </div>
        ));
    };

    const handleImageChange = (e) => {
        const selectedImages = Array.from(e.target.files);
        if (selectedImages.length > 2)
            return toast.error("Please Select 2 files only");
        setImages(selectedImages)
    };

    const handleRemoveImage = (index) => {
        const newImages = [...images];
        newImages.splice(index, 1);
        setImages(newImages);
    };

    const onHandleSubmit = () => {
        if (
            !productName ||
            !description ||
            !typeNR ||
            !price ||
            !discount ||
            !productType ||
            !manufacturer ||
            !images ||
            !techSpecs ||
            !stock
        ) {
            return toast.error("Please Provide all the Details");
        }
        if (discount > 99) setDiscount(99);
        if (discount < 1) setDiscount(1);
        setShowEditConfirmationModal(true);
    };

    return (
        <div>
            <div style={{ width: "90vw", display: "flex", justifyContent: "center", marginTop: '-1%', marginLeft: '5%', zIndex: '10' }}>
                <div className="productSellingMain" style={{ borderRadius: '10px', backgroundColor: 'white' }}>
                    <h3 style={{ marginBottom: "10px" }}>
                        <u>Product Edit Page</u>
                    </h3>
                    <div>
                        <h4>Enter Product Details</h4>
                    </div>
                    <div>
                        <InputGroup className="mb-3">
                            <InputGroup.Text>
                                Product Name
                            </InputGroup.Text>
                            <Form.Control
                                onChange={(e) => {
                                    setProductName(e.target.value);
                                }}
                                aria-label="Default"
                                aria-describedby="inputGroup-sizing-default"
                                value={productName}
                            />
                        </InputGroup>
                    </div>
                    <div>
                        <div className="form-group">
                            <label>Description</label>
                            <textarea
                                onChange={(e) => {
                                    setDescription(e.target.value);
                                }}
                                className="form-control rounded-0"
                                id="exampleFormControlTextarea2"
                                rows="3"
                                value={description}
                            ></textarea>
                        </div>
                    </div>
                    <div className="d-flex" style={{ gap: "30px" }}>
                        <label>Type (New/Refurbished):-</label>
                        <div className="form-check">
                            <input
                                className="form-check-input"
                                type="radio"
                                onChange={() => {
                                    setTypeNR("new");
                                }}
                                name="flexRadioDefault"
                                id="flexRadioDefault1"
                                checked={typeNR == 'new'}
                            />
                            <label className="form-check-label">New</label>
                        </div>
                        <div className="form-check">
                            <input
                                className="form-check-input"
                                type="radio"
                                onChange={() => {
                                    setTypeNR("Refurbished");
                                }}
                                checked={typeNR == 'Refurbished'}
                                name="flexRadioDefault"
                                id="flexRadioDefault2"
                            />
                            <label className="form-check-label">Refurbished</label>
                        </div>
                    </div>
                    <div>
                        <label>product type</label>
                        <select
                            className="form-select form-select-sm"
                            aria-label=".form-select-sm example"
                            value={productType}
                            onChange={(e) => {
                                setProductType(e.target.value);
                            }}
                        >
                            <option>Select</option>
                            <option value="office_laptops">Laptops</option>
                            <option value="gaming_laptops">Gaming Laptops</option>
                            <option value="monitor">Monitor</option>
                            <option value="processor">Processor</option>
                            <option value="ram">RAM</option>
                            <option value="ssd">SSD/Hard Drives</option>
                            <option value="smps">SMPS</option>
                            <option value="cabinet">Cabinet</option>
                            <option value="graphics_card">Graphics Card</option>
                            <option value="others">
                                others (sound/video Capture Cards){" "}
                            </option>
                            <option value="mouse">Mouse</option>
                            <option value="keyboard">KeyBoard</option>
                            <option value="cooling_systems">Cooling Systems</option>
                            <option value="web_cam">Web Cam</option>
                            <option value="accessories">Computer/Laptop Accessoires</option>
                            <option value='gamepads'>Gamepads</option>
                            <option value='speakers'>Speakers</option>
                        </select>
                    </div>
                    <div>
                        <InputGroup className="mb-3">
                            <InputGroup.Text>
                                Manufacturer/Brand
                            </InputGroup.Text>
                            <Form.Control
                                value={manufacturer}
                                onChange={(e) => {
                                    setManudacturer(e.target.value);
                                }}
                                aria-label="Default"
                                aria-describedby="inputGroup-sizing-default"
                            />
                        </InputGroup>
                    </div>
                    <div>
                        Previous Images (New Images Replace these Images if Added):
                        <div>
                            {props.props.images.map((image, index) => {
                                return (
                                    <img src={getImage(image)} id={index} alt="Previous Image"
                                        width="150"
                                        style={{
                                            maxWidth: "100px",
                                            maxHeight: "100px",
                                            objectFit: "contain",
                                            margin: "5px",
                                        }} />
                                )
                            })}
                        </div>
                    </div>
                    <div>
                        <div className="d-flex" style={{ gap: "10px" }}>
                            {!!images.length &&
                                images.map((image, index) => (
                                    <div key={index} className="image-container">
                                        <div>
                                            <img
                                                src={URL.createObjectURL(image)}
                                                alt="Product Image"
                                                width="250"
                                                style={{
                                                    maxWidth: "200px",
                                                    maxHeight: "200px",
                                                    objectFit: "contain",
                                                    margin: "5px",
                                                }}
                                            />
                                            <button
                                                style={{ margin: "5px" }}
                                                onClick={() => handleRemoveImage(index)}
                                            >
                                                Remove
                                            </button>
                                        </div>
                                    </div>
                                ))}
                        </div>
                        <label className="form-label">Please Choose Images</label>
                        <input
                            onChange={handleImageChange}
                            className="form-control"
                            type="file"
                            multiple
                            id="formFileMultiple"
                        />
                    </div>
                    <div>
                        <div className="d-flex" style={{ alignItems: 'Center', gap: '10px' }}>
                            <label>Product Technical Specifications</label>
                            <Button style={{ backgroundColor: 'green', color: "white" }} type="button" variant="outline-success" onClick={() => handleAdd()}>Add</Button>
                        </div>
                        <div>
                            {rendertechSpecs()}
                        </div>
                    </div>
                    <div className="d-flex" style={{ gap: "30px" }}>
                        <InputGroup className="mb-3">
                            <InputGroup.Text>
                                Inventory Stock
                            </InputGroup.Text>
                            <Form.Control
                                value={stock}
                                aria-label="Default"
                                type="Number"
                                onChange={(e) => {
                                    setStock(e.target.value);
                                }}
                                aria-describedby="inputGroup-sizing-default"
                            />
                        </InputGroup>
                        <InputGroup className="mb-3">
                            <InputGroup.Text>
                                Price (Rs)
                            </InputGroup.Text>
                            <Form.Control
                                value={price}
                                aria-label="Default"
                                type="Number"
                                onChange={(e) => {
                                    setPrice(e.target.value);
                                }}
                                aria-describedby="inputGroup-sizing-default"
                            />
                        </InputGroup>
                        <InputGroup className="mb-3">
                            <InputGroup.Text>
                                Discount (if any in %)
                            </InputGroup.Text>
                            <Form.Control
                                value={discount}
                                aria-label="Default"
                                type="Number"
                                min={1}
                                max={99}
                                onChange={(e) => {
                                    setDiscount(e.target.value);
                                }}
                                aria-describedby="inputGroup-sizing-default"
                            />
                        </InputGroup>
                    </div>
                    <div className="d-flex" style={{ justifyContent: "flex-end" }}>
                        <button
                            className="btn btn-danger mr-2"
                            onClick={() => {
                                confirm('Are you sure if you want to cancel') ? props.setShowEditProduct(false) : null
                            }}
                        >
                            Cancel
                        </button>
                        <Button variant="outline-success" onClick={onHandleSubmit}>
                            Submit Details
                        </Button>
                    </div>
                </div>
            </div>
            <div>
                {showEditConfirmationModal && (
                    <EditConfirmationModal
                        props={{
                            id: props.props._id,
                            productName,
                            description,
                            typeNR,
                            price,
                            discount,
                            productType,
                            manufacturer,
                            images,
                            techSpecs,
                            stock
                        }}
                        setShowEditConfirmationModal={setShowEditConfirmationModal}
                        setShowEditProduct={props.setShowEditProduct}
                    />
                )}
            </div>
        </div>
    );
};

export default EditProduct;
