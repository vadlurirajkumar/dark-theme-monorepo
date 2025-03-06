"use client";
import React, { useState, useEffect, useRef, KeyboardEvent } from "react";
import { FormControl, Badge, Dropdown, Spinner } from "react-bootstrap";
import useFetchData from "../../services/Axios";
import classNames from "classnames";

import { AxiosResponse } from 'axios'; // Make sure to import AxiosResponse
interface SearchResultItem {
  [key: string]: any;
}

interface SearchBarProps {
  placeholder?: string;
  size?: "xs" | "sm" | "md" | "lg"; // New size prop
  className?: string;
  searchTerm?: string;
  setSearchTerm?: (term: string) => void;
  dropdownEnabled?: boolean;
  apiUrl?: string;
  data?: SearchResultItem[] | ((term: string) => Promise<any[]>);
  serverSideSearch?: boolean;
  clientSearch?: boolean;
  searchUsingQueryParam?: boolean;
  searchUsingBody?: boolean;
  // dataKeyName?: string;
  dataKeyName?: string | string[];
  searchKey?: string;
  // Name of the attribute to be used as a query parameter or in body for server side search
  // defaults to searchKey and the query string will look like ?apiSearchKeyName=searchTerm
  apiSearchKeyName?: string | null;  
  setSelectedVal?: (val: any) => void;
  singleSelect?: boolean; // New prop for controlling single select
  // defaultSelected?: number;  // default value match data key name 
}

/**
 * SearchBar Component
 * 
 * A reusable and flexible search bar component with optional server-side or client-side search, 
 * multi-select or single-select support, and dynamic dropdown rendering.
 * 
 * @component
 * 
 * @param {string} [placeholder="Search"] - Placeholder text for the input field.
 * @param {"xs" | "sm" | "md" | "lg"} [size="lg"] - The size of the input field. Defaults to `lg`.
 * @param {string} [className] - Additional CSS classes to apply to the search bar container.
 * @param {string} [searchTerm=""] - The current search term entered by the user.
 * @param {(term: string) => void} [setSearchTerm=() => {}] - Callback to update the search term state.
 * @param {boolean} [dropdownEnabled=false] - Determines if the dropdown should be displayed.
 * @param {string} [apiUrl=""] - The API URL for server-side search.
 * @param {SearchResultItem[] | ((term: string) => Promise<any[]>)} [data] - Data source for the search results.
 *    Can be an array of items or a function that returns search results based on the search term.
 * @param {boolean} [serverSideSearch=true] - Enables server-side search functionality. Defaults to `true`.
 * @param {boolean} [clientSearch=false] - Enables client-side search functionality. Overrides `serverSideSearch`.
 * @param {boolean} [searchUsingQueryParam=false] - If `true`, the search term is sent as a query parameter.
 * @param {boolean} [searchUsingBody=true] - If `true`, the search term is sent in the request body. Default is `true`.
 * @param {string} [dataKeyName=""] - The key in the data object that holds the search result value.
 * @param {string} [searchKey=""] - The key in the data object used for search filtering.
 * @param {(val: any) => void} [setSelectedVal=() => {}] - Callback to update the selected values.
 * @param {boolean} [singleSelect=false] - If `true`, only a single value can be selected. Defaults to `false` (multi-select).
 * 
 * @returns {React.FC<SearchBarProps>} A functional component rendering a search bar with dynamic dropdown results.
 * 
 * @example
 * // Basic Usage
 * <SearchBar
 *   placeholder="Search for items"
 *   size="md"
 *   dropdownEnabled={true}
 *   apiUrl="/api/search"
 *   dataKeyName="name"
 *   searchKey="query"
 *   setSearchTerm={(term) => console.log(term)}
 *   setSelectedVal={(val) => console.log("Selected:", val)}
 * />
 * 
 * @example
 * // With Client-Side Search
 * <SearchBar
 *   clientSearch={true}
 *   data={[
 *     { id: 1, name: "Apple" },
 *     { id: 2, name: "Banana" },
 *   ]}
 *   dataKeyName="name"
 * />
 * 
 * @example
 * // Single Select Mode
 * <SearchBar
 *   singleSelect={true}
 *   dropdownEnabled={true}
 *   apiUrl="/api/search"
 *   dataKeyName="value"
 *   searchKey="term"
 * />
 * 
 * @example
 * // Custom Data Fetching
 * const fetchCustomData = async (term) => {
 *   const results = await fetch(`/api/items?search=${term}`).then(res => res.json());
 *   return results;
 * };
 * <SearchBar
 *   data={fetchCustomData}
 *   dataKeyName="label"
 * />
 */

type AxiosProps = {
  useBaseUrl: boolean;
  url: string;
  method: "get" | "post" | "put" | "delete" | "patch";
  setAuthznHeader: boolean;
  sessionSource: "cookie" | "local-storage"; // Restrict sessionSource to specific string literals
  data?: any; // Optional data property
};

type KeyValue = {
  [key: string]: string | number | boolean; // Adjust types as needed
};

const SearchBar: React.FC<SearchBarProps> = ({
  placeholder = "Search",
  size = "lg", // Default size is 'lg'
  className,
  searchTerm = "",
  setSearchTerm = () => { },
  dropdownEnabled = false,
  apiUrl = "",
  data,
  serverSideSearch = true,
  clientSearch = false,
  searchUsingQueryParam = false,
  searchUsingBody = true,
  dataKeyName = "",
  searchKey = "",
  apiSearchKeyName = null,
  setSelectedVal = () => { },
  singleSelect = false, // Default value for singleSelect
}) => {

  // If clientSearch is enabled toggle server side search 
  serverSideSearch = clientSearch ? false : true;
  // If searchUsingQueryParam is true then toggle search using body to false
  searchUsingBody = searchUsingQueryParam ? false : true;

  const apiSearchableKeyName = apiSearchKeyName ? apiSearchKeyName : searchKey 
  const querystring = apiSearchableKeyName + "=" + searchTerm;
  const queryInBody: KeyValue = {[apiSearchableKeyName] : searchTerm};
  
  // Construct apiEndpoint including querystring
  let apiEndpoint = apiUrl;
  if (clientSearch) {
    apiEndpoint = apiUrl + "?" + querystring
  }
  

  const [searchResults, setSearchResults] = useState<SearchResultItem[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [isHovered, setIsHovered] = useState(false);
  const [selectedValues, setSelectedValues] = useState<
    Array<{ value: string; displayName?: string }>
  >([]);
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const { apiRequest } = useFetchData();
  const inputRef = useRef<HTMLInputElement>(null);


  const getKeyToUse = (key: string | string[]): string => {
    return Array.isArray(key) ? key[0] : key; // Use the first element if it's an array
  };

  const fetchSearchResults = async () => {
    setLoading(true);
    try {
      // if (!apiUrl) {
      //   console.error("API URL is not provided.");
      //   return;
      // }

      const options: AxiosProps = {
        useBaseUrl: false,
        url: apiEndpoint,
        method: searchUsingBody ? "post" : "get",
        setAuthznHeader: true,
        sessionSource: "cookie",
        data: serverSideSearch ? queryInBody: null
      };

      const response = await apiRequest(options);
      console.log("API Response:", response);

      if (!response) {
        throw new Error("No data received from API");
      }

      let filteredResults: SearchResultItem[] = [];
      if (Array.isArray(response.data)) {
        filteredResults = response.data.filter((item: SearchResultItem) => {
          const keyToUse = getKeyToUse(dataKeyName);
          return (
            (!searchTerm || item[keyToUse]?.toLowerCase().includes(searchTerm.toLowerCase())) &&
            !selectedValues.some((selected) => selected.value === item[keyToUse])
          );
        });
      } else if (response.data.items && Array.isArray(response.data.items)) {
        filteredResults = response.data.items.filter((item: SearchResultItem) => {
          const keyToUse = getKeyToUse(dataKeyName);
          return (
            (!searchTerm || item[keyToUse]?.toLowerCase().includes(searchTerm.toLowerCase())) &&
            !selectedValues.some((selected) => selected.value === item[keyToUse])
          );
        });
      } else {
        throw new Error("Unexpected response format");
      }

      setSearchResults(filteredResults || []);
    } catch (error) {
      console.error("Error fetching data:", error);
      setSearchResults([]);
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    if (isFocused && dropdownEnabled) {
      fetchSearchResults();
    } else {
      setSearchResults([]); // Clear results if not focused or dropdown disabled
    }
  }, [searchTerm, isFocused, dropdownEnabled, data, selectedValues]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value); // Update search term on input change
  };

  const handleSelect = (item: SearchResultItem) => {
    const selectedItem = {
      value: item[getKeyToUse(dataKeyName)], // Use the utility function here
      displayName: item[searchKey],
      ...item,
    };

    // For single select, set the selected item and clear the search results
    if (singleSelect) {
      setSelectedValues([selectedItem]); // Only allow one selected value
      setSearchResults([]); // Clear the search results to close the dropdown
      setIsFocused(false); // Close the dropdown
      setSelectedVal([selectedItem]); // Update selectedVal for single select
    } else {
      // For multi-select
      // setSelectedValues((prev: Array<{ value: string; displayName?: string }>) => [...prev, selectedItem]);
      setSelectedValues((prev) => [...prev, selectedItem]);
      //setSelectedVal((prev) => [...prev, selectedItem]); // Update selectedVal for multi-select
      setSelectedVal((prev: Array<{ value: string; displayName?: string }>) => [...prev, selectedItem]);

    }

    setSearchTerm(""); // Clear the search input
  };


  const handleRemove = (value: string) => {
    setSelectedValues((prev) => prev.filter((item) => item.value !== value));
    setSelectedVal((prev: any) => prev.filter((item: any) => item.value !== value));
  };

  const handleBackspace = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !searchTerm && selectedValues.length > 0) {
      handleRemove(selectedValues[selectedValues.length - 1].value);
    }
  };

  const handleInputFocus = () => {
    setIsFocused(true);
  };

  const handleInputBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    if (!e.relatedTarget || !e.relatedTarget.closest(".dropdown-item")) {
      setIsFocused(false);
    }
  };


  // Add dynamic classes for size
  const getSizeClass = () => {
    switch (size) {
      case "sm":
        return "form-control-sm";
      case "lg":
        return "form-control-lg";
      default:
        return ""; // Default medium size
    }
  };

  return (
    <div
      className={classNames(
        "position-relative",
        "p-2",
        "d-flex align-items-center gap-1 h-auto border-1",
        className
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        border: `1px solid ${isFocused ? "#0d6efd" : isHovered ? "black" : "#ced4da"}`,
      }}
    >
      {selectedValues.map((selected, index) => (
        <Badge
          key={index}
          pill
          bg="gray-200"
          text="gray-900"
          className="me-1 pe-auto text-center d-flex align-items-center"
          style={{ cursor: "pointer"}}
          onClick={() => handleRemove(selected.value)}
        >
          {selected.displayName || selected.value} <span className="ms-1">×</span>
        </Badge>
      ))}

      <FormControl
        ref={inputRef}
        type="text"
        placeholder={placeholder}
        value={searchTerm}
        onChange={handleInputChange}
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        onKeyDown={handleBackspace}
        className={classNames("border-0 mb-0 bg-transparent", getSizeClass())} // Apply dynamic size class
      />

      {isFocused && dropdownEnabled && (
        <Dropdown.Menu
          show
          className="w-100 p-0 shadow-lg mt-1"
          style={{ position: "absolute", top: "100%", left: "0%", zIndex: 1000 }}
        >
          {loading ? (
            <div className="d-flex justify-content-center py-2">
              <Spinner animation="border" />
            </div>
          ) : searchResults.length > 0 ? (
            searchResults.map((result, index) => (
              <Dropdown.Item
                key={index}
                onMouseDown={(e) => {
                  e.preventDefault(); // Prevent input from losing focus when selecting
                  handleSelect(result); // Handle the selection
                }}
                className="w-100 p-xs"
                style={{ cursor: "pointer" }}
              >
                {/* Dynamic rendering based on dataKeyName */}
                {(() => {
                  // Normalize `dataKeyName` to an array
                  const keysToDisplay = Array.isArray(dataKeyName)
                    ? dataKeyName
                    : [dataKeyName]; // Wrap single string in an array

                  // Build the display text dynamically
                  const displayText = keysToDisplay
                    .map((key) => result[key]) // Get the corresponding value for each key
                    .filter(Boolean) // Filter out undefined, null, or falsy values
                    .join(" - "); // Join values with a separator

                  return displayText || "Unknown Item"; // Fallback if no values are found
                })()}
              </Dropdown.Item>
            ))
          ) : (
            !loading && <Dropdown.Item disabled>No results found</Dropdown.Item>
          )}
        </Dropdown.Menu>
      )}

    </div>
  );
};

export default SearchBar;
