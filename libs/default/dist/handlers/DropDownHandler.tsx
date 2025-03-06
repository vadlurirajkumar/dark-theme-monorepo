import React from 'react';

type FormState = { [key: string]: any }; // Generic type for form data state

/**
 * Creates a reusable handler for updating form data dynamically.
 * @param {React.Dispatch<React.SetStateAction<FormState>>} setFormData - State setter function for form data
 * @returns {Function} - The handler function
 */
export const createDropdownChangeHandler = (
  setFormData: React.Dispatch<React.SetStateAction<FormState>>
) => {
  return (name: string, value: any) => {
    setFormData((prevState) => ({
      ...prevState,
      [name]: value, // Dynamically update the field
    }));
  };
};
