/**
 * Cookie utility functions for EcoSwarm
 * Provides secure cookie management for authentication and user preferences
 */

// Cookie configuration
const COOKIE_CONFIG = {
  domain: window.location.hostname,
  path: '/',
  secure: window.location.protocol === 'https:',
  sameSite: 'Strict'
};

/**
 * Set a cookie
 * @param {string} name - Cookie name
 * @param {string} value - Cookie value
 * @param {number} days - Expiry in days (default: 7)
 * @param {object} options - Additional options
 */
export const setCookie = (name, value, days = 7, options = {}) => {
  try {
    const expires = new Date();
    expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
    
    const cookieOptions = {
      ...COOKIE_CONFIG,
      ...options,
      expires: expires.toUTCString()
    };

    let cookieString = `${encodeURIComponent(name)}=${encodeURIComponent(value)}`;
    cookieString += `; expires=${cookieOptions.expires}`;
    cookieString += `; path=${cookieOptions.path}`;
    
    if (cookieOptions.domain && cookieOptions.domain !== 'localhost') {
      cookieString += `; domain=${cookieOptions.domain}`;
    }
    
    if (cookieOptions.secure) {
      cookieString += '; secure';
    }
    
    cookieString += `; SameSite=${cookieOptions.sameSite}`;
    
    document.cookie = cookieString;
    console.log(`Cookie set: ${name}`);
    return true;
  } catch (error) {
    console.error('Error setting cookie:', error);
    return false;
  }
};

/**
 * Get a cookie value
 * @param {string} name - Cookie name
 * @returns {string|null} Cookie value or null
 */
export const getCookie = (name) => {
  try {
    const nameEQ = encodeURIComponent(name) + '=';
    const cookies = document.cookie.split(';');
    
    for (let i = 0; i < cookies.length; i++) {
      let cookie = cookies[i].trim();
      if (cookie.indexOf(nameEQ) === 0) {
        const value = cookie.substring(nameEQ.length);
        return decodeURIComponent(value);
      }
    }
    return null;
  } catch (error) {
    console.error('Error getting cookie:', error);
    return null;
  }
};

/**
 * Delete a cookie
 * @param {string} name - Cookie name
 */
export const deleteCookie = (name) => {
  try {
    setCookie(name, '', -1);
    console.log(`Cookie deleted: ${name}`);
    return true;
  } catch (error) {
    console.error('Error deleting cookie:', error);
    return false;
  }
};

/**
 * Check if a cookie exists
 * @param {string} name - Cookie name
 * @returns {boolean}
 */
export const hasCookie = (name) => {
  return getCookie(name) !== null;
};

/**
 * Get all cookies as an object
 * @returns {object} All cookies
 */
export const getAllCookies = () => {
  try {
    const cookies = {};
    const cookieStrings = document.cookie.split(';');
    
    cookieStrings.forEach(cookie => {
      const [name, value] = cookie.trim().split('=');
      if (name && value) {
        cookies[decodeURIComponent(name)] = decodeURIComponent(value);
      }
    });
    
    return cookies;
  } catch (error) {
    console.error('Error getting all cookies:', error);
    return {};
  }
};

/**
 * Clear all cookies
 */
export const clearAllCookies = () => {
  try {
    const cookies = getAllCookies();
    Object.keys(cookies).forEach(name => {
      deleteCookie(name);
    });
    console.log('All cookies cleared');
    return true;
  } catch (error) {
    console.error('Error clearing cookies:', error);
    return false;
  }
};

// Auth-specific cookie functions
export const authCookies = {
  /**
   * Set authentication token in cookie
   * @param {string} token - JWT token
   */
  setToken: (token) => {
    return setCookie('auth_token', token, 7, { httpOnly: false });
  },

  /**
   * Get authentication token from cookie
   * @returns {string|null}
   */
  getToken: () => {
    return getCookie('auth_token');
  },

  /**
   * Delete authentication token
   */
  deleteToken: () => {
    return deleteCookie('auth_token');
  },

  /**
   * Set user data in cookie
   * @param {object} user - User object
   */
  setUser: (user) => {
    return setCookie('user_data', JSON.stringify(user), 7);
  },

  /**
   * Get user data from cookie
   * @returns {object|null}
   */
  getUser: () => {
    const userData = getCookie('user_data');
    if (userData) {
      try {
        return JSON.parse(userData);
      } catch (error) {
        console.error('Error parsing user data:', error);
        return null;
      }
    }
    return null;
  },

  /**
   * Delete user data
   */
  deleteUser: () => {
    return deleteCookie('user_data');
  },

  /**
   * Check if user is authenticated (has valid token)
   * @returns {boolean}
   */
  isAuthenticated: () => {
    return hasCookie('auth_token');
  },

  /**
   * Clear all auth cookies
   */
  clearAuth: () => {
    authCookies.deleteToken();
    authCookies.deleteUser();
    console.log('Auth cookies cleared');
  }
};

// Preference cookies
export const preferenceCookies = {
  /**
   * Set theme preference
   * @param {string} theme - 'light' or 'dark'
   */
  setTheme: (theme) => {
    return setCookie('theme', theme, 365);
  },

  /**
   * Get theme preference
   * @returns {string} 'light' or 'dark'
   */
  getTheme: () => {
    return getCookie('theme') || 'light';
  },

  /**
   * Set language preference
   * @param {string} lang - Language code (e.g., 'en', 'fr')
   */
  setLanguage: (lang) => {
    return setCookie('language', lang, 365);
  },

  /**
   * Get language preference
   * @returns {string}
   */
  getLanguage: () => {
    return getCookie('language') || 'en';
  },

  /**
   * Set notification preference
   * @param {boolean} enabled
   */
  setNotifications: (enabled) => {
    return setCookie('notifications_enabled', enabled.toString(), 365);
  },

  /**
   * Get notification preference
   * @returns {boolean}
   */
  getNotifications: () => {
    const value = getCookie('notifications_enabled');
    return value === 'true';
  }
};

// Session management
export const sessionCookies = {
  /**
   * Create a session
   * @param {string} sessionId
   */
  create: (sessionId) => {
    return setCookie('session_id', sessionId, 0.0416); // 1 hour (1/24 of a day)
  },

  /**
   * Get session ID
   * @returns {string|null}
   */
  get: () => {
    return getCookie('session_id');
  },

  /**
   * Destroy session
   */
  destroy: () => {
    return deleteCookie('session_id');
  }
};

// Consent cookies (GDPR compliance)
export const consentCookies = {
  /**
   * Set cookie consent
   * @param {object} consent - {analytics: boolean, marketing: boolean, necessary: boolean}
   */
  setConsent: (consent) => {
    return setCookie('cookie_consent', JSON.stringify(consent), 365);
  },

  /**
   * Get cookie consent
   * @returns {object|null}
   */
  getConsent: () => {
    const consent = getCookie('cookie_consent');
    if (consent) {
      try {
        return JSON.parse(consent);
      } catch (error) {
        return null;
      }
    }
    return null;
  },

  /**
   * Check if user has given consent
   * @returns {boolean}
   */
  hasConsent: () => {
    return hasCookie('cookie_consent');
  }
};

export default {
  setCookie,
  getCookie,
  deleteCookie,
  hasCookie,
  getAllCookies,
  clearAllCookies,
  authCookies,
  preferenceCookies,
  sessionCookies,
  consentCookies
};
