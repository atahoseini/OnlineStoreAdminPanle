import React, { useEffect, useState } from 'react'

import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
} from '@coreui/react'
import { CustomTable } from 'src/custom-components/custom-grid/CustomTable';
import {customerServices} from 'src/services/customerService'
import { useNavigate } from 'react-router-dom';

const CustomerList = () => {
  
  const [data,setData]=React.useState([]);
  const navigate = useNavigate();
  
  const columns = React.useMemo(
    () => [
      {
        Header: 'کد مشتری',
        accessor: 'customerCode',
      },
      {
        Header: 'نام',
        accessor: 'firstName',
      },
      {
        Header: 'نام خانوادگی',
        accessor: 'lastName',
      },
      {
        Header: 'شماره تماس',
        accessor: 'mobile',
      },
      {
        Header: 'استان',
        accessor: 'provinceName',
      },
      {
        Header: 'شهر',
        accessor: 'cityName',
      },
    ],
  )

  // const data = React.useMemo(() => [
  //   {firstName:'ali',lastName:'rezaie',age:'25'},
  //   {firstName:'ali',lastName:'rezaie',age:'25'},
  //   {firstName:'ali',lastName:'rezaie',age:'25'},
  //   {firstName:'ali',lastName:'rezaie',age:'25'},
  // ]);

  React.useEffect(async() => {
    const result=await customerServices.getAll(1);
    setData(result);
  }, [])
   

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            لیست مشتریان
          </CCardHeader>
          <CCardBody>
            <CButton color='light' size='sm' onClick={()=> navigate('/sale/customers/add')}>
              افزودن جدید
            </CButton>
            <CustomTable columns={columns} data={data} />
           </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}
export default CustomerList