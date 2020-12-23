export function isEmptyObject(value) {
  if (value === null) {
    return true;
  }

  if (typeof value === 'object') {
    return Object.keys(value).length === 0;
  } else if (Array.isArray(value)) {
    return value.length === 0;
  }

  return true;
}
