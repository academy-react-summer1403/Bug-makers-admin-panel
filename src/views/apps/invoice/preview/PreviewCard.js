import React from 'react';
import { Card, CardBody, CardText, Row, Col, Table, Button, Badge } from 'reactstrap';
import { jsPDF } from 'jspdf'; 
import html2canvas from 'html2canvas'; 
import * as XLSX from 'xlsx'; 

const PreviewCard = ({ data }) => {
  const filteredData = data?.find((el) => {
    const pathParts = window.location.pathname.split("/"); 
    const paymentIdFromPath = pathParts[pathParts.length - 1]; 
    return paymentIdFromPath === el.paymentId;
  });

  const handleExportPDF = () => {
    const input = document.getElementById('invoice-preview-card');
    html2canvas(input).then(canvas => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF();
      pdf.addImage(imgData, 'PNG', 0, 0);
      pdf.save(`invoice_${filteredData.paymentId}.pdf`);
    });
  };

  const handleExportExcel = () => {
    const ws = XLSX.utils.json_to_sheet([{
      paymentId: filteredData.paymentId,
      paid: filteredData.paid,
      peymentDate: filteredData.peymentDate,
      groupName: filteredData.groupName,
      courseUserId: filteredData.courseUserId,
      courseId: filteredData.courseId,
      accept: filteredData.accept ? 'Accepted' : 'Pending',
    }]);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Invoice');
    XLSX.writeFile(wb, `invoice_${filteredData.paymentId}.xlsx`);
  };

  const handleExportImage = () => {
    const input = document.getElementById('invoice-preview-card');
    html2canvas(input).then(canvas => {
      const imgData = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.href = imgData;
      link.download = `invoice_${filteredData.paymentId}.png`;
      link.click();
    });
  };

  return filteredData !== null ? (
    <Card className='invoice-preview-card' id='invoice-preview-card'>
      <CardBody className='invoice-padding pb-0'>
        {/* Header */}
        <div className='d-flex justify-content-between flex-md-row flex-column invoice-spacing mt-0'>
          <div>
            <h3 className='text-primary invoice-logo'>آکادمی بحر</h3>
          </div>
          <div className='mt-md-0 mt-2'>
            <h4 className='invoice-title'>
              پرداختی <span className='invoice-number'>#{filteredData.paymentId}</span>
            </h4>
            <div className='invoice-date-wrapper'>
              <p className='invoice-date-title'>تاریخ پرداخت :</p>
              <p className='invoice-date'>{filteredData.peymentDate}</p>
            </div>
            <div className='invoice-date-wrapper'>
              <p className='invoice-date-title'> : تاریخ انتشار</p>
              <p className='invoice-date'>{filteredData.insertDate}</p>
            </div>
          </div>
        </div>
      </CardBody>

      <hr className='invoice-spacing' />

      {filteredData.paymentInvoiceImage && (
        <CardBody className='invoice-padding'>
          <Row>
            <Col sm="12" className="text-center">
              <h6 className="mb-2">تصویر فاکتور پرداختی</h6>
              <img 
                src={filteredData.paymentInvoiceImage} 
                alt="Payment Invoice" 
                style={{ maxWidth: '100%', height: 'auto' }} 
              />
            </Col>
          </Row>
        </CardBody>
      )}

      <CardBody className='invoice-padding pt-0'>
        <Row className='invoice-spacing'>
          <Col className='p-0' xl='8'>
            <h6 className='mb-2'>اطلاعات بیشتر :</h6>
            <h6 className='mb-25'>نام گروه : {filteredData.groupName}</h6>
            <CardText className='mb-25'>آیدی دوره : {filteredData.courseUserId}</CardText>
            <CardText className='mb-25'>میدان خزر پژوهشگاه سپهر</CardText>
            <CardText className='mb-0'>Bahr@gmail.com</CardText>
          </Col>
          <Col className='p-0 mt-xl-0 mt-2' xl='4'>
            <h6 className='mb-2'>Payment Details:</h6>
            <Col className='d-flex ' style={{flexFlow:'column wrap'}}>
              <Badge color={filteredData?.accept ? 'success' : 'warning'}>
                {filteredData?.accept ? 'تایید شده' : 'در انتظار تایید'}
              </Badge>
              <span>مبلغ پرداختی : {filteredData?.paid}</span>
            </Col>
          </Col>
        </Row>
      </CardBody>


      <hr className='invoice-spacing' />

      {/* Buttons to Export */}
      <CardBody className='invoice-padding pt-0'>
        <Row>
          <Col sm='12' className='d-flex justify-content-between'>
            <Button color="primary" onClick={handleExportPDF}>خروجی PDF</Button>
            <Button color="secondary" onClick={handleExportExcel}>خروجی Excel</Button>
            <Button color="success" onClick={handleExportImage}>خروجی عکس</Button>
          </Col>
        </Row>
      </CardBody>
    </Card>
  ) : null;
};

export default PreviewCard;
