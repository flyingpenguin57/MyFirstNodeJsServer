export interface CommonResult<T> {
    success: boolean;
    errorMessage?: string;
    data?: T;
}