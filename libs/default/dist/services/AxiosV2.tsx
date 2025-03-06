import axios, { AxiosRequestConfig, AxiosResponse, AxiosInstance } from "axios";
import { getSession } from "@/utils/session"


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

const AxiosV2 = () => {
  // const [loading, setLoading] = useState(false);

  /**
   * Custom apiRequest request function to make API calls with optional authorization, token refresh, and loading state management.
   * 
   * @param {boolean} params.setAuthznHeader - Whether to include the Authorization header in the request.
   * @param {string} params.url - The API endpoint
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
          ...headers,
        };
        // Set Authorization headers only when param is set and is a valid token
        if (setAuthznHeader && accessToken) {
          finalHeaders["Authorization"] = `Bearer ${accessToken}`;
        }
        // Create an Axios instance with custom headers and other configurations
        axiosInstance = axios.create({
          baseURL: url,
          headers: finalHeaders,
          // !TODO: Check this might be required in production only.
          // If so enable this when NODE_ENV is set to production.
          // withCredentials: sessionSource === "cookie",
        });

        // Execute the request
        return axiosInstance({
          method,
          url: url,
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

export default AxiosV2;