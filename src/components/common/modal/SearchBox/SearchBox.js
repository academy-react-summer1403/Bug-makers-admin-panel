const SearchBox = ({ width, placeHolder, icon, value, onChange }) => {
    return (
      <input
        type="text"
        className="form-control"
        style={{ width: '160px' }} 
        placeholder={placeHolder}
        value={value} 
        onChange={onChange} 
      />
    );
  };
  
  export default SearchBox;
  