import storage from "Api/firebase";
import { getDownloadURL, ref, uploadString } from "firebase/storage";

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

  export const toBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

export const uploadImageToFirebase = async (base64Video) => {
  const fileName = Date.now() + '.jpg';
  const fileRef = ref(storage, fileName);

  try {
    const snapshot = await uploadString(fileRef, base64Video, 'data_url');
    console.log('Uploaded a blob or file!', snapshot);

    // Get the URL of the uploaded image location
    const url = await getDownloadURL(fileRef);
    console.log(url, "Firebase URL");

    return url;
  } catch (error) {
    console.error("Error uploading image to Firebase:", error);
    throw error; // Optionally re-throw the error for handling elsewhere
  }
};