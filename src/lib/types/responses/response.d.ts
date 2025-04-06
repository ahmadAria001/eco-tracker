/**
 * Generic success response structure.
 */
export type SuccessResponse<T> = {
    success: true;
    data: T;
};

/**
 * Generic error response structure.
 */
export type ErrorResponse = {
    success: false;
    error: string;
};

/**
 * Union type for standard API responses.
 */
export type ApiResponse<T> = SuccessResponse<T> | ErrorResponse;

/**
 * Pagination metadata returned in response.
 */
export type PaginationMeta = {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
};
