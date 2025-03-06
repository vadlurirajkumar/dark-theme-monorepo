import React from 'react';
import PropTypes from 'prop-types';
import { Form, FormGroup } from 'react-bootstrap';

const InputDataList = ({
  id,
  label,
  placeholder,
  value,
  onChange,
  className = '',
  options = [],
}) => {

  // Handle the change event and pass the value back to the parent
  // const handleInputChange = (e) => {
  //   const selectedValue = e.target.value; // Get the selected or typed value
  //   setValue(selectedValue); // Pass the value back to the parent through the onChange prop
  // };

  return (
    <FormGroup controlId={id} className={className}>
      {/* Only render the label if it's a non-empty string */}
      {label && <Form.Label className='label-sm'>{label}</Form.Label>}
      <Form.Control
        type="text"
        size='lg'
        list={`${id}-datalist`} // Connect input to datalist
        placeholder={placeholder}
        value={value} // Controlled input
        onChange={(e) => onChange(e)}
        // onChange={handleInputChange} // Handle change event

      />
      <datalist id={`${id}-datalist`}>
        {options.map((option, index) => (
          <option key={index} value={option} />
        ))}
      </datalist>
    </FormGroup>
  );
};

InputDataList.propTypes = {
  id: PropTypes.string.isRequired, // Unique ID for the input and datalist
  label: PropTypes.string, // Optional label for the input
  placeholder: PropTypes.string, // Placeholder for the input
  value: PropTypes.string, // Controlled value for the input
  onChange: PropTypes.func, // Function to handle value changes
  className: PropTypes.string, // Optional class name
  options: PropTypes.arrayOf(PropTypes.string).isRequired, // Options for datalist
};

export default InputDataList;
