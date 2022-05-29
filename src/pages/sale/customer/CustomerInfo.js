import React, { useState } from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CForm,
  CFormLabel,
  CFormInput,
  CFormCheck,
  CFormSelect,
} from '@coreui/react'
 import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import reactTable from 'react-table';
import {cityServices} from 'src/services/cityService'

const CustomerInfo = () => {

  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const [provinces,setProvinces]=useState([]);
  const [cities,setCities]=useState([]);

  const save =(data)=> {
    // await customerServices.insert(data);
    // alert('insert success');
    // navigate('sales/customers')
    alert(data);
  }
  React.useEffect(async() => {
    const result=await cityServices.getProvinces();
    setProvinces(result);
  }, []) 

  const getCities = async(id) => {
    alert(id);
    const result=await cityServices.getWithProvinceId(id);
    setCities(result);
  }  

  return (
     <CRow>
      <CCol xs={12}>yarn
        <CCard className="mb-4">
          <CCardHeader>
            مشخصات مشتریان
            <CButton  color='light' size='sm' onClick={()=> navigate('/sale/customers')}>
              بازگشت به لیست
            </CButton>
          </CCardHeader>
          <CCardBody>

            <CForm className="row g-3" onSubmit={handleSubmit(save)}>
                  <CCol md={4}>
                    <CFormLabel>کد مشتری</CFormLabel>
                    <CFormInput {...register("customerCode")} />
                  </CCol>
                  <CCol md={4}>
                    <CFormLabel>نام</CFormLabel>
                    <CFormInput {...register("firstName")} />
                  </CCol>
                  <CCol xs={4}>
                    <CFormLabel>نام خانوادگی</CFormLabel>
                    <CFormInput {...register("lastName")} />
                  </CCol>
                  <CCol md={4}>
                    <CFormLabel>استان</CFormLabel>
                    <CFormSelect {...register("province")} onChange={e => getCities(e.target.value)}>
                      <option>انتخاب کنید...</option>
                      {
                        provinces.map(item =>
                          <option key={item.id} value={item.id}>{item.titel}</option>
                        )
                      }
                    </CFormSelect>

                  {/* <CFormLabel>استان</CFormLabel>
                  <CFormSelect  {...register("provinceId")} onChange={e => getCitites(e.target.value)}>
                    <option>انتخاب کنید</option>
                    {
                      provinces.map(item =>
                        customer.provinceId == item.id ? <option selected key={item.id} value={item.id}>{item.title}</option> :
                        <option key={item.id} value={item.id}>{item.title}</option>
                      )
                    }
                  </CFormSelect> */}
                  </CCol>
                  <CCol md={4}>
                    <CFormLabel>شهر</CFormLabel>
                    <CFormSelect {...register("cityId")}>
                    <option>انتخاب کنید...</option>
                      {
                        cities.map(item =>
                          <option key={item.id} value={item.id}>{item.titel}</option>
                        )
                      }
                    </CFormSelect>
                  </CCol>
                  <CCol xs={4}>
                    <CFormLabel>موبایل</CFormLabel>
                    <CFormInput {...register("mobile")} />
                  </CCol>
                  <CCol xs={4}>
                    <CFormLabel>ایمیل</CFormLabel>
                    <CFormInput {...register("email")}/>
                  </CCol>
                  <CCol xs={8}>
                    <CFormLabel>آدرس</CFormLabel>
                    <CFormInput {...register("address")}/>
                  </CCol>
                  <CCol xs={12}>
                    <CButton type="submit">ذخیره</CButton>
                  </CCol>
              </CForm>
           </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}
            

export default CustomerInfo