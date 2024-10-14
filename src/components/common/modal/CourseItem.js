import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import moment from 'moment-jalaali';
import ImageTum from '../../../assets/images/icons/image.jpg'
import { Badge } from 'reactstrap';

const CourseItem = ({ title, imageUrl, lastUpdate, describe , StudentName , accept , reserverDate }) => {
  const [showFullDescription, setShowFullDescription] = useState(false);

  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };

  const Date = (date) => {
    if (!date) return 'تاریخ تولد وجود ندارد';
    return moment(date).format('jYYYY/jMM/jDD');
  };

  const isValidURL = (url) => {
    try {
      new URL(url);
      return true;
    } catch (_) {
      return false;
    }
  };
console.log(accept);
  return (
    <div 
    className="mb-3 d-flex  "
    style={{
      maxWidth: '100%',
      backgroundColor: '#fff',
      borderRadius: '10px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.5)', 
    }}>      
    <div className="w-100 ">
        <div className="col-md-4 w-100">
          <img
            src={isValidURL(imageUrl) ? imageUrl : ImageTum}
            className="img-fluid rounded-start"
            style={{ width: '100%', height: '300px' }}
          />
        </div>
        <div className="col-md-8">
          <div className="card-body">
          {describe ? (
              <>
                <p
                  className={`card-text mt-2 ${showFullDescription ? '' : 'text-truncate'}`}
                  style={{ maxHeight: showFullDescription ? 'none' : '3.6em', overflow: 'hidden' }}
                  onClick={toggleDescription}
                >
                  {describe}
                </p>
                {!showFullDescription && describe.length > 100 && (
                  <span onClick={toggleDescription} className="text-primary" style={{ cursor: 'pointer' }}>
                    توضیحات بیشتر
                  </span>
                )}
              </>
            ) : (
              <h5 className="card-subtitle text-muted">نام رزرو کننده : {StudentName}</h5> // در صورت نبود توضیحات
            )}
            {lastUpdate ? (
              <>
            <p className="card-text">
              <small className="text-muted">آخرین آپدیت: {Date(lastUpdate)}</small>
            </p>
            </>
            ) : (
              <p className="card-text">
              <small className="text-muted m-1"> تاریخ رزرو : {Date(reserverDate)}</small>
            </p>
            )}
            {accept ? (
              <Badge color={accept === true ? 'light-success' : 'light-danger'} className='m-1'>
                {accept === true ? 'تایید شده' : 'رد شده'}
              </Badge>
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseItem;
