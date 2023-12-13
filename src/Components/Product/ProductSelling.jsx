import { useState } from "react";
import { Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { mainSliceActions } from "../../Store/MainSlice";
import ConfirmationModal from "./Modals/ConfirmationModal";

const ProductSellingPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [productName, setProductName] = useState("");
  const [description, setDescription] = useState("");
  const [typeNR, setTypeNR] = useState("new");
  const [price, setPrice] = useState("");
  const [discount, setDiscount] = useState(0);
  const [productType, setProductType] = useState("");
  const [manufacturer, setManudacturer] = useState("");
  const [images, setImages] = useState([]);
  const [techSpecs, settechSpecs] = useState([{ key: "", value: "" }]);
  const [stock, setStock] = useState();
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);

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
    setShowConfirmationModal(true);
  };

  return (
    <div>
      <div style={{ width: "98.9vw", display: "flex", justifyContent: "center" }}>
        <div className="productSellingMain">
          <h3 style={{ marginBottom: "10px" }}>
            <u>Product Selling Page</u>
          </h3>
          <div>
            <h4>Enter Product Details</h4>
          </div>
          <div>
            <InputGroup className="mb-3">
              <InputGroup.Text id="inputGroup-sizing-default">
                Product Name
              </InputGroup.Text>
              <Form.Control
                onChange={(e) => {
                  setProductName(e.target.value);
                }}
                aria-label="Default"
                aria-describedby="inputGroup-sizing-default"
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
                  setTypeNR("New");
                }}
                name="flexRadioDefault"
                id="flexRadioDefault1"
                checked
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
              <InputGroup.Text id="inputGroup-sizing-default">
                Manufacturer/Brand
              </InputGroup.Text>
              <Form.Control
                onChange={(e) => {
                  setManudacturer(e.target.value);
                }}
                aria-label="Default"
                aria-describedby="inputGroup-sizing-default"
              />
            </InputGroup>
          </div>
          <div>
            <div className="d-flex" style={{ gap: "10px" }}>
              {!!images.length &&
                images.map((image, index) => (
                  <div key={index} className="image-container">
                    <div>
                      <img
                        src={URL.createObjectURL(image)}
                        alt="preview"
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
              <InputGroup.Text id="inputGroup-sizing-default">
                Inventory Stock
              </InputGroup.Text>
              <Form.Control
                aria-label="Default"
                type="Number"
                onChange={(e) => {
                  setStock(e.target.value);
                }}
                aria-describedby="inputGroup-sizing-default"
              />
            </InputGroup>
            <InputGroup className="mb-3">
              <InputGroup.Text id="inputGroup-sizing-default">
                Price (Rs)
              </InputGroup.Text>
              <Form.Control
                aria-label="Default"
                type="Number"
                onChange={(e) => {
                  setPrice(e.target.value);
                }}
                aria-describedby="inputGroup-sizing-default"
              />
            </InputGroup>
            <InputGroup className="mb-3">
              <InputGroup.Text id="inputGroup-sizing-default">
                Discount (if any in %)
              </InputGroup.Text>
              <Form.Control
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
                confirm('Are you sure if you want to cancel') ? navigate('/') : null
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
        {showConfirmationModal && (
          <ConfirmationModal
            props={{
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
            setShowConfirmationModal={setShowConfirmationModal}
          />
        )}
      </div>
    </div>
  );
};

export default ProductSellingPage;
