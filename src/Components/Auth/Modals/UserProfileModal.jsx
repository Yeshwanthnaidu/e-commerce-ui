import React, { useEffect, useState } from "react";
import { Modal, Button, Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { changePassword, getUserAddress } from '../../../actions'
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilePen } from "@fortawesome/free-solid-svg-icons";

import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

import AddUpdateAddressModal from "../../Product/Modals/AddUpdateAddressModal";

import { deleteAddress } from "../../../actions";

function UserProfileModal(props) {
  const dispatch = useDispatch()

  const [showChangePassword, setShowChangePassword] = useState(false)
  const [currentPassword, setCurrentPassWord] = useState('');
  const [newPassword, setNewPassword] = useState('')

  const [showAddAdressModal, setShowAddAddressModal] = useState(false);
  const [EditAddressData, setEditAddressData] = useState({})

  const userData = useSelector(state => state.mainSlice.userData)
  const userAddress = useSelector(state => state.mainSlice.userAddress)

  useEffect(() => {
    getUserAddress(userData.username, dispatch)
  }, [])

  const ChangeBtnClicked = () => {
    const data = { currentPassword, newPassword }
    changePassword(data).then(res => res?.status === 'Success' ? setShowChangePassword(false) : null).catch((error) => { console.error(error) })
  };

  const handleAddressRemoveBtn = (addressId) => {
    deleteAddress({ username: userData.username, addressId }, dispatch)
  }

  return (
    <>
      <Modal show={true}>
        <Modal.Header>
          <Modal.Title>Profile Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm="2">
                Name:
              </Form.Label>
              <Col sm="10">
                <Form.Control plaintext readOnly defaultValue={userData.name} />
              </Col>
              <Form.Label column sm="2">
                username:
              </Form.Label>
              <Col sm="10">
                <Form.Control plaintext readOnly defaultValue={userData.username} />
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm="2">
                Email:
              </Form.Label>
              <Col sm="10">
                <Form.Control plaintext readOnly defaultValue={userData.email} />
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3">
              <div className="d-flex" style={{ gap: '40px' }}>
                <Form.Label column sm="2">
                  Address:
                </Form.Label>
                <Button style={{ height: '25px', marginTop: '5px', display: 'flex', alignItems: 'center' }} onClick={() => { setShowAddAddressModal(true) }} variant="success">+</Button>
              </div>
              <div>
                {userAddress.length ? userAddress.map((address) => {
                  return <>
                    <Card>
                      <Card.Body style={{ display: 'grid', gridTemplateColumns: '15fr 1fr 1fr' }}>
                        <div className="d-flex" style={{ flexDirection: 'column', fontSize: '13px' }}>
                          <span style={{ fontSize: '15px', fontWeight: '600' }}>{address.firstName + ' ' + address.lastName}</span>
                          <span>{address.address} - {address.selectedCity}</span>
                          <span>{address.selectedState} - {address.pincode}</span>
                          <span>LandMark: {address.landmark}</span>
                          <span>Contact: {address.phoneNumber}</span>
                        </div>
                        <div style={{ display: 'flex', gap: '10px', flexDirection: 'column' }}>
                          <Button variant='warning' style={{ width: '40px' }} onClick={() => { setShowAddAddressModal(true), setEditAddressData(address) }}><FontAwesomeIcon icon={faFilePen} /></Button>
                          <Button variant="danger" style={{ width: '40px' }} onClick={() => { handleAddressRemoveBtn(address?._id) }}>X</Button>
                        </div>
                      </Card.Body>
                    </Card>
                  </>
                }) : <>No Address Found</>}
              </div>
            </Form.Group>
            {showChangePassword && <>
              <Card>
                <Card.Body style={{ display: 'grid', gridTemplateColumns: '10fr 1fr' }}>
                  <div>
                    <Form.Group as={Row} className="mb-3">
                      <Form.Label column sm="5">
                        Current Password
                      </Form.Label>
                      <Col sm="11">
                        <Form.Control type='password' onChange={(e) => { setCurrentPassWord(e.target.value) }} />
                      </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3">
                      <Form.Label column sm="5">
                        New Password
                      </Form.Label>
                      <Col sm="11">
                        <Form.Control type='password' onChange={(e) => { setNewPassword(e.target.value) }} />
                      </Col>
                    </Form.Group>
                    <Button variant="primary" onClick={ChangeBtnClicked}>
                      Update
                    </Button>
                  </div>
                  <div>
                    <Button variant="danger" onClick={() => { setShowChangePassword(false) }}>X</Button>
                  </div>
                </Card.Body>
              </Card>
            </>}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="primary"
            onClick={() => {
              props.setShowUserProfile(false);
            }}
          >
            close
          </Button>
          <Button variant="secondary" onClick={() => { setShowChangePassword(true) }}>
            Change Password
          </Button>
        </Modal.Footer>
      </Modal>
      {showAddAdressModal && <AddUpdateAddressModal Address={{ ...EditAddressData }} setShowAddAddressModal={setShowAddAddressModal} />}
    </>
  );
}

export default UserProfileModal;
