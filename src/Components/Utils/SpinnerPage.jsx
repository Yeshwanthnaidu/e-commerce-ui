import React, { useEffect, useState } from 'react';
import { Spinner } from 'react-bootstrap';


const SpinnerPage = () => {
    return (<div className="d-flex justify-content-center align-items-center" style={{ height: '100vh', position: 'fixed', width: '100vw', background: 'rgba(139, 139, 139, 0.48)' }}>
        <Spinner animation="border" role="status">
            <span className="sr-only">Loading...</span>
        </Spinner>
    </div>
    );
};

export default SpinnerPage;