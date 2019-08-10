export interface IJWTUser {
  id: string;
  email: string;
  roles: Array<{ id: string, value: string }>;
}

/**
 * @param  {string} key Куки, который ищем
 * @returns string
 */
export function getCookie(key: string): string {
  const allCookies = document.cookie.split(';');
  for (const cookie of allCookies) {
    const kvPair = cookie.split('=');
    if (kvPair[0].trim() === key) {
      return decodeURIComponent(kvPair[1]);
    }
  }
  return '';
}

/** Очищаем куки */
export function deleteCookie(key: string) {
  document.cookie = key + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}

interface ICookieOptions {
  maxAge?: number;
  expires?: string | Date;
  path?: string;
  domain?: string;
  secure?: boolean;
}

/**
 * Sets a value for given cookie key
 * @param key ID for the value
 * @param value Raw value to be stored
 * @param [options] maxAge / expires / path / domain / secure
 * @returns string
 */
export function putCookie(key: string, value: string, options?: ICookieOptions): string {
  let cookieString = `${key}=${value};`;

  if (options) {
    if (options.maxAge) {
      cookieString += ` maxAge=${options.maxAge};`;
    } else if (options.expires instanceof Date) {
      cookieString += ` expires=${options.expires.toUTCString()};`;
    } else if (!options.expires) {
      cookieString += ` expires=${options.expires};`;
    }
    if (options.path) {
      cookieString += ` path=${options.path};`;
    }
    if (options.domain) {
      cookieString += ` domain=${options.domain};`;
    }
    if (options.secure) {
      cookieString += ` ;secure`;
    }
  }

  document.cookie = cookieString;
  return document.cookie;
}

/**
 * Возращает payload jwt
 * @returns object
 */
export function parseJWT(jwt: string = getCookie('JWT')): IJWT | null {
  if (jwt) {
    try {
      const base64 = jwt.split('.')[1].replace(/-/g, '+').replace(/_/g, '/');
      return JSON.parse(decodeURIComponent(escape(window.atob(base64))));
    } catch (e) {
      return null;
    }
  }
  return null;
}

/**
 * Удаление JWT cookie
 */
export function removeJWT() {
  document.cookie = 'JWT=;path=/;expires=Thu, 01 Jan 1970 00:00:00 GMT';
  document.cookie = 'refresh_token=;path=/;expires=Thu, 01 Jan 1970 00:00:00 GMT';
}

export interface IJWT extends IJWTUser {
  /** Время истечения токена */
  exp: number;
  /** Время создания токена */
  iat: number;
}
