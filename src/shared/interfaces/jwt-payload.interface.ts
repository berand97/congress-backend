/**
 * JwtPayload.
 *
 * @export
 * @interface JwtPayload
 */
export interface JwtPayload<T> {
    data: T;
    iat: number;
    exp: string;
    refreshToken: string;
}
