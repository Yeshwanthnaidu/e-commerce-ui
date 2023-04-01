import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { mainSliceActions } from "../../../Store/MainSlice";
import { createProduct } from '../../../actions'

function ConfirmationModal(props) {
  const dispatch = useDispatch();

  const PublishAd = () => {
    createProduct(props);
  };

  return (
    <>
      <Modal show={true}>
        <Modal.Header>
          <Modal.Title>Confrim Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1.2fr 2fr",
              gap: "30px",
            }}
          >
            <div>Product Name : </div>
            <div>{props.props.productName}</div>
            <div>Description:</div>
            <div> {props.props.productName}</div>
            <div>Type (N/R) :</div>
            <div>{props.props.typeNR}</div>
            <div>Product Type :</div>
            <div>{props.props.productType}</div>
            <div>Manufacturer/Brand :</div>
            <div>{props.props.manufacturer}</div>
            <div>Price :</div>
            <div>{props.props.price}</div>
            <div>Discount:</div>
            <div> {props.props.discount}</div>
            <div>Image:</div>
            <div>
              {props.props.images.map((image, i) => {
                return <>
                  <img
                    key={i}
                    src={image}
                    alt="Product Image"
                    width="250"
                  />
                </>
              })}
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => {
              props.setShowConfirmationModal(false);
            }}
          >
            Back to Edit
          </Button>
          <Button variant="primary" onClick={PublishAd}>
            Publish
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ConfirmationModal;
