import React, { useState, useEffect } from 'react';
import { Card, CardTitle, CardHeader, DropdownMenu, DropdownItem, DropdownToggle, UncontrolledButtonDropdown } from 'reactstrap';
import { ExternalLink, Printer, FileText, File, Clipboard, Copy } from 'react-feather';
import { useDispatch, useSelector } from 'react-redux';
import { getCoursePayment } from '../../../../redux/CoursePayment';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import * as XLSX from 'xlsx';
import DataTable from 'react-data-table-component';
import { ChevronDown } from 'react-feather';
import '@styles/react/apps/app-invoice.scss';
import '@styles/react/libs/tables/react-dataTable-component.scss';
import { columns } from './columns';

const InvoiceList = () => {
  // ** Store Vars
  const dispatch = useDispatch();
  const store = useSelector(state => state.user.selectUser);

  // ** States
  const [coursePayment, setCoursePayment] = useState([]); // State to hold course payments
  const course = useSelector(state => state.payment.selectUser);
  const user = useSelector(state => state.user.selectUser);

  useEffect(() => {
    const id = user.id;
    if (id) {
      dispatch(getCoursePayment(id));
    }
  }, [dispatch, user.id]);

  useEffect(() => {
    if (course) {
      setCoursePayment(course); // Set course payment when available
    }
  }, [course]);

  // ** Export to Excel
  const handleExportExcel = () => {
    const ws = XLSX.utils.json_to_sheet(coursePayment);  // Convert coursePayment to Excel sheet
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Invoices');
    XLSX.writeFile(wb, 'Invoices.xlsx');
  };

  // ** Export to PDF
  const handleExportPDF = () => {
    const input = document.getElementById('invoice-list');  // Get the invoice list element
    html2canvas(input).then(canvas => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF();
      pdf.addImage(imgData, 'PNG', 0, 0);
      pdf.save('Invoices.pdf');
    });
  };

  // ** Export to Image
  const handleExportImage = () => {
    const input = document.getElementById('invoice-list');  // Get the invoice list element
    html2canvas(input).then(canvas => {
      const imgData = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.href = imgData;
      link.download = 'Invoices.png';
      link.click();
    });
  };

  return (
    <div className='invoice-list-wrapper'>
      <Card>
        <CardHeader className='py-1'>
          <CardTitle tag='h4'>پرداختی ها</CardTitle>
          <UncontrolledButtonDropdown>
            <DropdownToggle color='secondary' outline caret>
              <ExternalLink className='font-small-4 me-50' />
              <span>خروجی</span>
            </DropdownToggle>
            <DropdownMenu end>
              <DropdownItem className='w-100' onClick={handleExportPDF}>
                <Printer className='font-small-4 me-50' />
                <span>PDF</span>
              </DropdownItem>
              <DropdownItem className='w-100' onClick={handleExportExcel}>
                <FileText className='font-small-4 me-50' />
                <span>Excel</span>
              </DropdownItem>
              <DropdownItem className='w-100' onClick={handleExportImage}>
                <File className='font-small-4 me-50' />
                <span>Image</span>
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledButtonDropdown>
        </CardHeader>

        {/* Add id to this div to capture it in the export functions */}
        <div id="invoice-list" className='invoice-list-dataTable react-dataTable'>
          <DataTable
            noHeader
            sortServer
            columns={columns}
            responsive={true}
            className='react-dataTable'
            data={coursePayment}
            sortIcon={<ChevronDown />}
            defaultSortField='invoiceId'
          />
        </div>
      </Card>
    </div>
  );
};

export default InvoiceList;
