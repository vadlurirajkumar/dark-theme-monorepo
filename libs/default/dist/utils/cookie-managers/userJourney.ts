// In user journey across pages, preserve the tab/section information on each page.
// When the user comes back to the same page, take to the tab/section where they were previously.
// The page section information is saved in a cookie and used to set the default tab/section

import Cookies from 'js-cookie';

// Define the cookie key for tab information storage
// !TODO: This env setting didn't work. Instead the cookie name is always pageInfo.
const PAGE_INFO_COOKIE_NAME = process.env.REACT_APP_COOKIE_TAB_MANAGER || 'pageInfo';

// Define types for functions
type TabData = Record<string, string>; // Mapping of uriPath to tabName

// Retrieve the active tab for a specific page URI
export function getSectionFromCookie(uriPath: string): string | null {
  try {
    const cookieValue = Cookies.get(PAGE_INFO_COOKIE_NAME);
    if (cookieValue) {
      const tabData: TabData = JSON.parse(cookieValue);
      return tabData[uriPath] || null;
    }
    return null;
  } catch (error) {
    console.error('Failed to parse tab cookie:', error);
    return null;
  }
}

// Set the active tab for a specific page URI
export function setSectionInCookie(uriPath: string, section: string): void {
  try {
    const cookieValue = Cookies.get(PAGE_INFO_COOKIE_NAME);
    const tabData: TabData = cookieValue ? JSON.parse(cookieValue) : {};
    tabData[uriPath] = section;
    Cookies.set(PAGE_INFO_COOKIE_NAME, JSON.stringify(tabData), { 
      expires: 7,
      secure: process.env.NODE_ENV === 'production', // Only secure in production
      sameSite: 'Strict',
      path: '/'
     }); // Set cookie with 7-day expiration
  } catch (error) {
    console.error('Failed to set tab in cookie:', error);
  }
}
