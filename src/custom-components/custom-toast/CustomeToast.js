import React, { useRef, useState } from 'react'
import {
    CToast,
    CToastBody,
    CToastHeader,
    CToaster,
} from '@coreui/react'

const CustomeToast = ({ title, text, color }) => {
    const toaster = React.useRef();

    const MyToast = (
        <CToast title={title} color={color}>
            <CToastHeader closeButton>
                <strong className="me-auto">{title}</strong>
            </CToastHeader>
            <CToastBody>{text}</CToastBody>
        </CToast>
    );

    return (
        <>
            <CToaster ref={toaster} push={MyToast} placement="top-start" />
        </>
    )
}

export default CustomeToast
