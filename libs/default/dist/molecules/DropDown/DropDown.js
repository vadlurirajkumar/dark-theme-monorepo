"use client";
import React, { useState, useEffect, useMemo, useCallback } from "react";
import { Dropdown, FormCheck } from "react-bootstrap";
import SearchBar from "../../atoms/SearchBar/SearchBar"; // Make sure SearchBar is implemented correctly
import Icon from "../../atoms/Icon/Icon";
import classNames from "classnames";


const NewDropdown = ({
  size = "lg",
  variant = "white",
  bsPrefix,
  dropdownHeader,
  options = [],
  selectedOptions,
  setSelectedOptions,
  enableSelectAll = false,
  allowMultiple = false,
  imgSrc,
  label,
  enableSearch = false,
  optionKey = "key",
  optionValue = "value",
  optionDisplay = "displayKey",
  borderless = false,
  searchT,
  setSearchT
}) => {
  const [isDropdownActive, setIsDropdownActive] = useState(false);
  const [hoveringBorder, setHoveringBorder] = useState(false);
  const [filterData, setFilterData] = useState()
  // Filter options based on search term
  const filteredOptions = useMemo(() => {
    return options.filter((option) => {
      const displayText = option[optionDisplay]?.toLowerCase();
      setFilterData(displayText)
      if (searchT?.length > 0) {
        return displayText?.includes(searchT?.toLowerCase());
      } else {
        return displayText
      }
    });
  }, [options, optionDisplay]);

  // Handle dropdown toggle
  const handleDropdownToggle = (isOpen) => {
    setIsDropdownActive(isOpen);
  };

  // Handle multiple selection
  const handleMultipleSelection = useCallback(
    (option) => {
      setSelectedOptions((prevSelected) => {
        const optionId = option[optionKey];
        const isSelected = prevSelected.some(
          (selected) => selected[optionKey] === optionId
        );
        return isSelected
          ? prevSelected.filter((selected) => selected[optionKey] !== optionId)
          : [...prevSelected, option];
      });
    },
    [setSelectedOptions, optionKey]
  );

  // Handle single selection
  const handleSingleSelection = useCallback(
    (option) => {
      setIsDropdownActive(false);
      setSelectedOptions([option]);
    },
    [setSelectedOptions]
  );

  // Handle "Select All" functionality
  const handleSelectAll = useCallback(() => {
    if (selectedOptions.length === options.length) {
      setSelectedOptions([]);
    } else {
      setSelectedOptions(options);
    }
  }, [options, selectedOptions, setSelectedOptions]);

  // Default display value for the selected options
  const selectedDisplay = useMemo(() => {
    if (selectedOptions.length === 0) return dropdownHeader;

    const maxDisplayLength = 6;
    const displayKeys = selectedOptions.map((option) => {
      return typeof option === "object" ? option[optionDisplay] : option;
    });

    const displayText = displayKeys.join(", ");

    return `${displayText.length > maxDisplayLength && !borderless
      ? displayText.slice(0, maxDisplayLength) + "..."
      : displayText
      }${selectedOptions.length > 1 ? ` (+${selectedOptions.length - 1})` : ""}`;
  }, [selectedOptions, dropdownHeader, borderless]);


  return (
    <Dropdown
      bsPrefix={classNames(
        bsPrefix,
        "dropdown"
      )}
      
      show={isDropdownActive}
      onToggle={handleDropdownToggle}
      onMouseEnter={() => setHoveringBorder(true)}
      onMouseLeave={() => setHoveringBorder(false)}
    >
      <Dropdown.Toggle
        size={size}
        variant={variant}
      >
        <label className={classNames(
          { "text-gray-600": selectedOptions.length !== 0 },
        )}>
            {/* `p-0 ${selectedOptions.length === 0 ? "text_lightGrey" : "text-black"}` */}
          {imgSrc && <img src={imgSrc} alt="" className="mx-2 my-0 p-0" />}
          {label && selectedOptions.length > 0 && `${label}: `}
          {selectedDisplay}
        </label>
        <Icon
          type={"feather"}
          name={isDropdownActive ? "ChevronDown" : "ChevronDown"}
          size={"16"}
          color={"black"}
          className={""}
        />
      </Dropdown.Toggle>

      <Dropdown.Menu>
        {enableSearch && (
          <div className="m-1">
            <SearchBar searchTerm={searchT} setSearchTerm={setSearchT} data={filterData} dropdownEnabled={false} apiUrl={false} internalApi={false} />
          </div>
        )}

        {enableSelectAll && (
          <Dropdown.Item as="button" onClick={handleSelectAll}>
            <FormCheck type="checkbox" checked={selectedOptions.length === options.length} />
            <span>Select All</span>
          </Dropdown.Item>
        )}

        {filteredOptions.length > 0 ? (
          filteredOptions.map((option, index) => {
            const displayText = option[optionDisplay];
            const isSelected = selectedOptions.some(
              (selected) => selected[optionKey] === option[optionKey]
            );

            return (
              <Dropdown.Item
                as="button"
                key={index}
                onClick={() => (allowMultiple ? handleMultipleSelection(option) : handleSingleSelection(option))}
                // className="d-flex gap-2"
              >
                {allowMultiple && (
                  <FormCheck type="checkbox" checked={isSelected} onChange={() => { }} />
                )}
                <span>{displayText}</span>
              </Dropdown.Item>
            );
          })
        ) : (
          <Dropdown.Item disabled>No options available</Dropdown.Item>
        )}
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default NewDropdown;
