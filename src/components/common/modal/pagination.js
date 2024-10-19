import React from 'react';
import { Pagination as BootstrapPagination } from 'react-bootstrap';

const Pagination = ({ pageCount, handlePageClick, currentPage }) => {
  const handlePageChange = (selectedPage) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    handlePageClick({ selected: selectedPage - 1 }); // Adjust for zero-based index
  };

  return (
    <BootstrapPagination className="justify-content-center mt-4">
      <BootstrapPagination.Prev 
        onClick={() => handlePageChange(currentPage > 0 ? currentPage : 0)} 
        disabled={currentPage === 0} 
        className="pagination-button" 
      />
      {[...Array(pageCount)].map((_, index) => (
        <BootstrapPagination.Item 
          key={index} 
          active={index === currentPage} 
          onClick={() => handlePageChange(index + 1)} // Convert to 1-based index for display
          className={`pagination-item ${index === currentPage ? 'active' : ''}`}
        >
          {index + 1}
        </BootstrapPagination.Item>
      ))}
      <BootstrapPagination.Next 
        onClick={() => handlePageChange(currentPage < pageCount - 1 ? currentPage + 2 : pageCount)} 
        disabled={currentPage === pageCount - 1} 
        className="pagination-button" 
      />
    </BootstrapPagination>
  );
};

export default Pagination;
