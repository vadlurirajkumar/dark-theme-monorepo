
import axios, { AxiosRequestConfig, AxiosResponse, AxiosInstance } from "axios";
// import { jwtVerify, JWTPayload } from "jose"; // Import from jose
// import { getSession } from "@/utils/session";

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL as string;

interface AxiosProps extends AxiosRequestConfig {
  /** */
  setAuthznHeader: boolean;
  sessionSource: "local-storage" | "cookie";
  url: string;
  method: "get" | "post" | "put" | "delete" | "patch";
  data?: any;
  headers?: Record<string, string>;
}

interface TokenObject {
  access: string;
  refresh?: string;
}

// Utility function to get token from storage
const getTokenfromStorage = (): TokenObject | null => {
  const storedToken = JSON.parse(localStorage.getItem("userToken") || "null");
  if (storedToken && storedToken['access']) {
    return storedToken as TokenObject;
  }
  return null;
};


// Helper function to decode and verify token expiration
const isTokenExpired = async (token: string): Promise<boolean> => {
  try {
    const { payload }: { payload: JWTPayload } = await jwtVerify(token, new TextEncoder().encode("your-secret"));
    return payload.exp ? payload.exp * 1000 < Date.now() : true; // Check if expiration exists and has passed
  } catch (error) {
    return true; // If the token can't be verified or decoded, treat it as expired
  }
};

// Utility function to refresh the token
const refreshAccessToken = async (): Promise<string | null> => {
  try {
    const refreshToken = localStorage.getItem("refreshToken");
    if (!refreshToken) throw new Error("No refresh token found.");

    const response = await axios.post(`${baseUrl}/auth/refresh-token`, { token: refreshToken });
    const { accessToken, refreshToken: newRefreshToken } = response.data;

    // Store the new tokens
    localStorage.setItem("userToken", JSON.stringify(accessToken));
    localStorage.setItem("refreshToken", newRefreshToken);

    return accessToken; // Return new access token
  } catch (error) {
    // If refresh fails, clear tokens and return null
    localStorage.removeItem("userToken");
    localStorage.removeItem("refreshToken");
    return null;
  }
};

const useFetchData = () => {
  // const [loading, setLoading] = useState(false);

  /**
   * Custom apiRequest request function to make API calls with optional authorization, token refresh, and loading state management.
   * 
   * @param {boolean} params.setAuthznHeader - Whether to include the Authorization header in the request.
   * @param {string} params.url - The API endpoint relative to the base URL.
   * @param {"local-storage" | "cookie"} params.sessionSource - The source of the session token, either from local storage or cookies.
   * @param {"get" | "post" | "put" | "delete" | "patch"} params.method - The HTTP method to use for the request.
   * @param {any} [params.data] - Optional data to send with the request, applicable for POST, PUT, PATCH requests.
   * @param {Record<string, string>} [params.headers] - Optional custom headers to be added to the request.
   * 
   * @returns {Promise<AxiosResponse | void>} - Returns a Promise that resolves with the Axios response or rejects with an error.
   */
  const apiRequest = async ({ setAuthznHeader = false, url, sessionSource, method, data, headers = {} }: AxiosProps): Promise<AxiosResponse | void> => {
    // setLoading(true);

    return new Promise(async (resolve, reject) => {
      let axiosInstance: AxiosInstance = axios;

      // Function to execute the API request
      const executeRequest = async (accessToken: string | null = null) => {
        const finalHeaders: Record<string, string> = {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          // "Access-Control-Allow-Credentials": "true",
          ...headers,
        };
        // Set Authorization headers only when param is set and is a valid token
        // console.log('setting authz header' + accessToken);
        if (setAuthznHeader && accessToken) {
          finalHeaders["Authorization"] = `Bearer ${accessToken}`;
        }
        // Create an Axios instance with custom headers and other configurations
        axiosInstance = axios.create({
          baseURL: baseUrl,
          headers: finalHeaders,
          // !TODO: Check this might be required in production only.
          // If so enable this when NODE_ENV is set to production.
          // withCredentials: sessionSource === "cookie",
        });

        // Execute the request
        return axiosInstance({
          method,
          url: `${baseUrl}/${url}`,
          data,
        });
      };

      try {
        let token: TokenObject | null = null;
        // Get the token from the sessionSource
        //!TODO: Add interceptor logic here
        if (setAuthznHeader) {
          if (sessionSource === "local-storage") {
            // console.log("Reading session information from local storage")
            token = getTokenfromStorage();
            // Proceed with the request
            const response = await executeRequest(token?.access);
            resolve(response);
          } else if (sessionSource === "cookie") {
            // console.log("Readding session information from cookie")
            token = getSession();
            const response = await executeRequest(token?.access);
            resolve(response);
          }

        } else {
          // Unauthenticated requests such as login and register etc.
          const response = await executeRequest();
          resolve(response);
        }

        // Check if token is expired using `jose`
        // if (token && token?.access && await isTokenExpired(token['access'])) {
        //   // Try to refresh the token
        //   const newToken = await refreshAccessToken();
        //   if (!newToken['access']) {
        //     // If refresh token is also expired, reject with a 401 error
        //     throw { response: { status: 401, message: "Session expired. Please log in again." } };
        //   }
        // }        
      } catch (err: any) {
        if (err.response?.status === 401 || err.response?.status === 403) {
          // Handle unauthorized or forbidden access (refresh token failed)
          console.error("Unauthorized or Forbidden", err);
        }
        reject(err);
      } finally {
        // setLoading(false);
      }
    });
  };

  return { apiRequest };
};

export default useFetchData;
