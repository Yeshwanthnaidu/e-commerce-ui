import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { changePassword } from '../../../actions'
import { useNavigate } from "react-router-dom";

import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

function UserProfileModal(props) {
  const [showChangePassword, setShowChangePassword] = useState(false)
  const [currentPassword, setCurrentPassWord] = useState('');
  const [newPassword, setNewPassword] = useState('')

  const userData = useSelector(state => state.mainSlice.userData)

  const ChangeBtnClicked = () => {
    const data = { currentPassword, newPassword }
    changePassword(data).then(res => res?.status === 'Success' ? setShowChangePassword(false) : null).catch((error) => { console.error(error) })
  };

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
            {showChangePassword && <>
              <Form.Group as={Row} className="mb-3">
                <Form.Label column sm="2">
                  Current Password
                </Form.Label>
                <Col sm="10">
                  <Form.Control type='password' onChange={(e) => { setCurrentPassWord(e.target.value) }} />
                </Col>
              </Form.Group>
              <Form.Group as={Row} className="mb-3">
                <Form.Label column sm="2">
                  Previous Password
                </Form.Label>
                <Col sm="10">
                  <Form.Control type='password' onChange={(e) => { setNewPassword(e.target.value) }} />
                </Col>
              </Form.Group>
              <Button variant="primary" onClick={ChangeBtnClicked}>
                Update
              </Button>
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
    </>
  );
}

export default UserProfileModal;
