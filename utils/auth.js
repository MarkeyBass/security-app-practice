export function signJwt(payload) {
  /**
   * TODO:
   * SIGN JWT FLOW:
   * 1. Spread payload into JWT payload object
   * 2. Sign token with secret and expiration time
   * 3. Return signed JWT token string
   */
}

export function verifyJwt(token) {
  /**
   * TODO:
   * VERIFY JWT FLOW:
   * 1. Verify token with secret
   * 2. Return decoded payload if valid
   * 3. Throw error if invalid/expired (handled by caller)
   */
}

export function isAuthorized(user, resource) {
  /**
   * TODO:
   * IS AUTHORIZED FUNCTION FLOW:
   * 1. Check if resource doesn't have userId or user is admin or user has access to resource
   * 2. Return true if user is authorized
   * 3. Return false if user is not authorized
   */
}
