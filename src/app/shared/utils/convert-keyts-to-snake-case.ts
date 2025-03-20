/* eslint-disable @typescript-eslint/no-explicit-any */
function camelToSnake(str: string): string {
  return str.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`);
}

export function convertKeysToSnakeCase(obj: any): any {
  if (Array.isArray(obj)) {
    return obj.map(item => convertKeysToSnakeCase(item));
  } else if (obj !== null && typeof obj === 'object') {
    const newObj: any = {};
    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        const snakeKey = camelToSnake(key);
        newObj[snakeKey] = convertKeysToSnakeCase(obj[key]);
      }
    }
    return newObj;
  }
  return obj;
}
