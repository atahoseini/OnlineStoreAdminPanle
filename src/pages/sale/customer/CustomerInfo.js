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
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import reactTable from 'react-table';
import { cityServices } from 'src/services/cityService'
import { customerServices } from 'src/services/customerService'
import CustomeToast from 'src/custom-components/custom-toast/CustomeToast'



const CustomerInfo = () => {


  let {id} = useParams();
  const navigate = useNavigate();
  const [provinces, setProvinces] = useState([]);
  const [cities, setCities] = useState([]);
  const [showToast, setShowToast] = useState(false);
  const [teatsInfo, setTeatsInfo] = useState({ title: '', text: '', color: 'light' });
  const [isLoading, setIsLoading] = useState(false);
  const [editCustomer, setEditCustomer] = useState({});
  const { register, handleSubmit, watch, formState: { errors },reset } = useForm({
      defaultValues: editCustomer,   
  });

  // const { register, handleSubmit,reset } = useForm({
  //   defaultValues: customer,
  // });

  const save = async (data) => {

    setIsLoading(true);
    if(id){
      await customerServices.update(data,id);
      setTeatsInfo({ title: 'بروزرسانی اطلاعات مشتری  انجام شد', text: 'انجام شد', color: 'success' });
    }
    else{
      await customerServices.insert(data);
      setTeatsInfo({ title: 'افزودن مشتری جدید انجام شد', text: 'انجام شد', color: 'success' });
    }
    setShowToast(true);
    setIsLoading(false);
    //alert('insert success');
    navigate('./')
  }


  React.useEffect(async () => {
    // const resultProvinces= await cityServices.getProvince();
     setProvinces(await cityServices.getProvince());
    if(id){
      getCustomerInfo(id);
    }
  }, [])


  const getCustomerInfo = async (id) => {
     const customer= await customerServices.get(id);
     await getCities(customer.provinceId);
     setEditCustomer(customer);
     reset(editCustomer);
    }
  
  
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
              اطلاعات مشتریان {id}
              <CButton color='light' size='sm' onClick={() => navigate('/sale/customers')}>
                بازگشت به لیست
              </CButton>
            </CCardHeader>
            <CCardBody>

              <CForm className="row g-3" onSubmit={handleSubmit(save)}>
                <CCol md={4}>
                  <CFormLabel>کد مشتری</CFormLabel>
                  <CFormInput defaultValue={editCustomer.customerCode} type="text" {...register("customerCode")} />
                </CCol>
                <CCol md={4}>
                  <CFormLabel>نام</CFormLabel>
                  <CFormInput   defaultValue={editCustomer.firstName} {...register("firstName")} />
                </CCol>
                <CCol xs={4}>
                  <CFormLabel>نام خانوادگی</CFormLabel>
                  <CFormInput defaultValue={editCustomer.lastName}  {...register("lastName")} />
                </CCol>
                <CCol md={4}>
                  <CFormLabel>استان</CFormLabel>
                  <CFormSelect  {...register("province")} onChange={e => getCities(e.target.value)}>
                  debugger;
                    <option>انتخاب کنید...</option>
                    {
                      provinces.map(item =>
                        editCustomer.provinceId==item.id ? <option selected key={item.id} value={item.id}>{item.title}</option> :
                        <option key={item.id} value={item.id}>{item.title}</option>
                      )
                    }
                  </CFormSelect>
                </CCol>
                <CCol md={4}>
                  <CFormLabel>شهر</CFormLabel>
                  <CFormSelect   {...register("cityId")}>
                    <option>انتخاب کنید...</option>
                    {
                      cities.map(item =>
                        editCustomer.cityId==item.id ? <option selected key={item.id} value={item.id}>{item.title}</option> :
                        <option key={item.id} value={item.id}>{item.title}</option>
                      )
                    }
                  </CFormSelect>
                </CCol>
                <CCol xs={4}>
                  <CFormLabel>موبایل</CFormLabel>
                  <CFormInput defaultValue={editCustomer.mobile}  {...register("mobile")} />
                </CCol>
                <CCol xs={4}>
                  <CFormLabel>ایمیل</CFormLabel>
                  <CFormInput   {...register("email")} />
                </CCol>
                <CCol xs={8}>
                  <CFormLabel>آدرس</CFormLabel>
                  <CFormInput  defaultValue={editCustomer.address} {...register("address")} />
                </CCol>
                <CCol xs={12}>
                  <CButton type="submit" disabled={isLoading}>
                    {isLoading ? <CSpinner className='ml-2' component="span" size="sm" aria-hidden="true" /> : null }
                    ذخیره 
                  </CButton>
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