import React from 'react'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CButton,
} from '@coreui/react'
import { CustomTable } from 'src/custom-components/custom-grid/CustomTable'
import { customerServices } from 'src/services/customerService'
import { useNavigate } from 'react-router-dom';
import CustomBootstrapTable from 'src/custom-components/custom-grid/CustomBootstrapTable'
import  CIcon from '@coreui/icons-react';
import * as icon from '@coreui/icons';
import Swal from 'sweetalert2'

const CustomerList = () => {
  const [data, setData] = React.useState([]);
  const [currentPage, setPage] = React.useState(1);
  const [sizePerPage, setSizePerPage] = React.useState(1);
  const [totalSize, setTotalSize] = React.useState(1);
  const navigate = useNavigate();

  const columns = React.useMemo(
    () => [
      {
        text: 'ردیف',
        dataField: 'id',
      },
      {
        text: 'کد مشتری',
        dataField: 'customerCode',
      },
      {
        text: 'نام',
        dataField: 'firstName',
      },
      {
        text: 'نام خانوادگی',
        dataField: 'lastName',
      },
      {
        text: 'شماره تماس',
        dataField: 'mobile',
      },
      {
        text: 'استان',
        dataField: 'provinceName',
      },
      {
        text: 'شهر',
        dataField: 'cityName',
      }, 
      {
        dataField: 'inStock',
        text: 'In Stock',
        formatter: (cellContent, row) => (
          <div>
            <CButton onClick={() => navigate('/sale/customers/edit/' + row.id)} color='light' size="sm" shape="rounded-pill">
              <CIcon icon={icon.cilPencil} size="me-2"/>
            </CButton>

            
            <CButton onClick={async () => await removeItem(row.id)} color='danger' size="sm" shape="rounded-pill">
              <CIcon icon={icon.cilDelete} size="me-2"/>
            </CButton>
          </div>
        )
      },
    ],
  );

  React.useEffect(async () => {
    await getData();
  }, [])

  const getData = async (page = 1, itemCount = 2) => {
    const result = await customerServices.getAll({ page, itemCount });
    setData(result.data);
    setPage(result.page);
    setSizePerPage(result.sizePerPage);
    setTotalSize(result.totalSize);
  }

  const removeItem = async (id) => {

    Swal.fire({
      title: 'در صورت حذف قابل بازیابی نمی باشد',
      showCancelButton: true,
      confirmButtonText: `تایید`,
      cancelButtonText: `انصراف`,
    }).then(async (result) => {
      if (result.isConfirmed) {
        await customerServices.delete(id);
        await getData(currentPage, sizePerPage);
      }
    })
  }

  const handleTableChange = async (type, { page, sizePerPage }) => {
    await getData(page, sizePerPage);
  }

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            لیست مشتریان
          </CCardHeader>
          <CCardBody>
            <CButton color="light" size="sm" onClick={() => navigate("/sale/customers/add")}>
              افزودن آیتم جدید
            </CButton>
            <CustomBootstrapTable
              columns={columns}
              data={data}
              page={currentPage}
              sizePerPage={sizePerPage}
              totalSize={totalSize}
              onTableChange={handleTableChange}
            />
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default CustomerList
