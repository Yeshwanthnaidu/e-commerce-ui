import { useState } from "react";
import { Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

import { mainSliceActions } from "../../Store/MainSlice";
import ConfirmationModal from "./Modals/ConfirmationModal";

const ProductSellingPage = () => {
  const dispatch = useDispatch();

  const [productName, setProductName] = useState("");
  const [Description, setDescription] = useState("");
  const [typeNR, setTypeNR] = useState("new");
  const [price, setPrice] = useState("");
  const [discount, setDiscount] = useState(0);
  const [productType, setProductType] = useState("");
  const [manufacturer, setManudacturer] = useState("");
  const [images, setImages] = useState([]);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);

  const handleImageChange = (e) => {
    const selectedImages = Array.from(e.target.files);
    if (selectedImages.length > 1)
      return toast.error("Please Select 1 file only");
    setImages(selectedImages.map((image) => URL.createObjectURL(image)));
  };

  const handleRemoveImage = (index) => {
    const newImages = [...images];
    newImages.splice(index, 1);
    setImages(newImages);
  };

  const onHandleSubmit = () => {
    if (
      !productName ||
      !Description ||
      !typeNR ||
      !price ||
      !discount ||
      !productType ||
      !manufacturer ||
      !images
    ) {
      return toast.error("Please Provide all the Details");
    }
    if (discount > 99) setDiscount(99);
    if (discount < 1) setDiscount(1);
    setShowConfirmationModal(true);
  };

  return (
    <div>
      <div style={{ width: "98vw", display: "flex", justifyContent: "center" }}>
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
            <label>Type:- (New/Refurbished):-</label>
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
                        src={image}
                        alt="preview"
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
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
            <label className="form-label">Please Choose Image</label>
            <input
              onChange={handleImageChange}
              className="form-control"
              type="file"
              id="formFileMultiple"
            />
          </div>
          <div className="d-flex" style={{ gap: "30px" }}>
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
                dispatch(mainSliceActions.showsellingModal(false));
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
              Description,
              typeNR,
              price,
              discount,
              productType,
              manufacturer,
              images,
            }}
            setShowConfirmationModal={setShowConfirmationModal}
          />
        )}
      </div>
    </div>
  );
};

export default ProductSellingPage;
