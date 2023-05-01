import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { createProduct } from '../../../actions'
import { useNavigate } from "react-router-dom";

function ConfirmationModal(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector(state => state.mainSlice.userData)

  const PublishAd = () => {
    createProduct(props, props.setShowConfirmationModal, navigate, userData);
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
              gridTemplateColumns: "1.3fr 2fr",
              gap: "30px",
            }}
          >
            <div style={{fontWeight: '600'}}>Product Name : </div>
            <div>{props.props.productName}</div>
            <div style={{fontWeight: '600'}}>Description:</div>
            <div> {props.props.description}</div>
            <div style={{fontWeight: '600'}}>Type (N/R) :</div>
            <div>{props.props.typeNR}</div>
            <div style={{fontWeight: '600'}}>Product Type :</div>
            <div>{props.props.productType}</div>
            <div style={{fontWeight: '600'}}>Manufacturer/Brand :</div>
            <div>{props.props.manufacturer}</div>
            <div style={{fontWeight: '600'}}>Inventory Stock:</div>
            <div>{props.props.stock}</div>
            <div style={{fontWeight: '600'}}>Price :</div>
            <div>{props.props.price}</div>
            <div style={{fontWeight: '600'}}>Discount:</div>
            <div> {props.props.discount}</div>
            <div style={{fontWeight: '600'}}>Technical Specifications:</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 2fr', gap: '10px' }}>
              {props.props.techSpecs.map(spec => {
                return <>
                  <div style={{wordWrap: 'break-word', fontWeight: '600'}}>{spec.key} :</div>
                  <div style={{wordWrap: 'break-word'}}>{spec.value}</div>
                </>
              })}
            </div>
            <div style={{fontWeight: '600'}}>Images:</div>
            <div>
              {props.props.images.map((image, i) => {
                return <div key={i}>
                  <img
                    src={URL.createObjectURL(image)}
                    alt="Product Image"
                    width="250"
                  />
                </div>
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
