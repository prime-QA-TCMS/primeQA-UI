import { AxiosInstance } from 'axios';

/**
 * AxiosHelper: A reusable utility for handling API interactions.
 * @param apiInstance - The specific Axios instance to use.
 */
export class AxiosHelper {
    private axiosInstance: AxiosInstance;

    constructor(axiosInstance: AxiosInstance) {
        this.axiosInstance = axiosInstance;
    }

    // ✅ Generic GET Request
    async get<T>(url: string, params?: Record<string, any>): Promise<T | null> {
        try {
            const response = await this.axiosInstance.get<T>(url, { params });
            return response.data;
        } catch (error) {
            this.handleError(error);
            return null;
        }
    }

    // ✅ Generic POST Request
    async post<T>(url: string, data: any): Promise<T | null> {
        try {
            const response = await this.axiosInstance.post<T>(url, data);
            return response.data;
        } catch (error) {
            this.handleError(error);
            return null;
        }
    }

    // ✅ Generic PUT Request
    async put<T>(url: string, data: any): Promise<T | null> {
        try {
            const response = await this.axiosInstance.put<T>(url, data);
            return response.data;
        } catch (error) {
            this.handleError(error);
            return null;
        }
    }

    // ✅ Generic DELETE Request
    async delete<T>(url: string): Promise<T | null> {
        try {
            const response = await this.axiosInstance.delete<T>(url);
            return response.data;
        } catch (error) {
            this.handleError(error);
            return null;
        }
    }

    // ✅ Error Handling (Centralized)
    private handleError(error: any): void {
        console.error('API Error:', error);

        if (error.response) {
            alert(`Server Error: Please Try again later`);
            console.error('Error: ', error.response.data)
        } else if (error.request) {
            alert('No response from server. Please try again.');
        } else {
            alert(`Error: ${error.message}`);
        }
    }
}
