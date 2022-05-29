import React from 'react'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import {authenticationServices} from 'src/services/authenticationServices'
import { useNavigate } from "react-router-dom";
 import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'

const Login = () => {
  const navigate = useNavigate()

  const { register, handleSubmit, watch, formState: { errors } } = useForm();

  const userLogin = async(data) =>{
    const result = await authenticationServices.login(data);
    if(data)
    {
       navigate('/', {replace : true});
    }
    alert(JSON.stringify(result));
  } 

  
  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={8}>
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm onSubmit={handleSubmit(userLogin)}>
                    <h1>ورود</h1>
                    <p className="text-medium-emphasis">ورود به حساب کاربری</p>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput 
                        {...register("userName", { required: true })}
                        autoComplete="Username"
                        placeholder="نام کاربری"
                      />
                      {errors.userName && <span>فیلد ضروری</span>}

                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        {...register("password", { required: true })}
                        type="password"
                        placeholder="رمز عبور"
                        autoComplete="current-password"
                      />
                      {errors.password && <span>فیلد ضروری</span>}

                    </CInputGroup>
                    <CRow>
                      <CCol xs={6}>
                        <CButton type="submit" color="primary" className="px-4">
                          ورود
                        </CButton>
                      </CCol>
                      <CCol xs={6} className="text-right">
                        <CButton color="link" className="px-0">
                          فراموشی رمز عبور?
                        </CButton>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
              <CCard className="text-white bg-primary py-5" style={{ width: '44%' }}>
                <CCardBody className="text-center">
                  <div>
                    <h2>ثبت نام</h2>
                    <p>
                      آشنایی با فروشگاه مرکزی و امکانات آن
                    </p>
                    <Link to="/register">
                      <CButton color="primary" className="mt-3" active tabIndex={-1}>
                        ثبت نام!
                      </CButton>
                    </Link>
                  </div>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Login
