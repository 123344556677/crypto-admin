export const setLocalStorage = (key, value) => {
  return new Promise((resolve, reject) => {
    try {
      localStorage.setItem(key, value);
      resolve();
    } catch (error) {
      reject(error);
    }
  });
};
export const roundToOneDecimal = (value) => {
    if (!isNaN(value) && value.toString().includes('.')) {
      return Math.round(value * 10) / 10;
    }
    return value;
  };