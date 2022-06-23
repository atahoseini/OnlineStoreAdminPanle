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
  CSpinner,
} from '@coreui/react'
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import reactTable from 'react-table';
import { cityServices } from 'src/services/cityService'
import { customerServices } from 'src/services/customerService'
import CustomeToast from 'src/custom-components/custom-toast/CustomeToast'



const CustomerInfo = () => {

  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const [provinces, setProvinces] = useState([]);
  const [cities, setCities] = useState([]);
  const [showToast, setShowToast] = useState(false);
  const [teatsInfo, setTeatsInfo] = useState({ title: '', text: '', color: 'light' });
  const [isLoading, setIsLoading] = useState(false);

  const save = async (data) => {
    setIsLoading(true);
    await customerServices.insert(data);
    setTeatsInfo({ title: 'افزودن مشتری جدید انجام شد', text: 'انجام شد', color: 'success' });
    setShowToast(true);
    setIsLoading(fail);
    //alert('insert success');
    navigate('./')
  }


  React.useEffect(async () => {
    // const resultProvinces= await cityServices.getProvince();
    setProvinces(await cityServices.getProvince());
  }, [])

  const getCities = async (id) => {
    // alert(id);
    // const result=await cityServices.getWithProvinceId(id);
    // alert(JSON.stringify(result));
    setCities(await cityServices.getWithProvinceId(id));
  }

  return (
    <>
      {showToast ? <CustomeToast {...teatsInfo} /> : null}
      <CRow>
        <CCol xs={12}>
          <CCard className="mb-4">
            <CCardHeader>
              مشخصات مشتریان
              <CButton color='light' size='sm' onClick={() => navigate('/sale/customers')}>
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
                        <option key={item.id} value={item.id}>{item.title}</option>
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
                        <option key={item.id} value={item.id}>{item.title}</option>
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
                  <CFormInput {...register("email")} />
                </CCol>
                <CCol xs={8}>
                  <CFormLabel>آدرس</CFormLabel>
                  <CFormInput {...register("address")} />
                </CCol>
                <CCol xs={12}>
                  <CButton type="submit" disabled={isLoading}>
                    {isLoading ? <CSpinner className='ml-2' component="span" size="sm" aria-hidden="true" /> : null }
                    ذخیره</CButton>
                </CCol>
              </CForm>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  )
}


export default CustomerInfo