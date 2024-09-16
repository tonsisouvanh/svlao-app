import toast from 'react-hot-toast';
import moment from 'moment';
import bcrypt from 'bcryptjs';

export const checkRole = (role) => {
  const approvedRoles = ['admin', 'assistant', 'student'];

  if (approvedRoles.includes(role)) {
    return true;
  }

  return false;
};

export const getImageId = (passedUrl) => {
  const url = passedUrl.toString();
  let idValue = '';

  if (url.startsWith('https://drive.google.com/uc?export=view&id=')) {
    return url;
  }

  if (url.includes('open?id=')) {
    const parts = url.split('open?id=');
    idValue = parts[1] ? parts[1] : '';
  } else if (url.includes('file/d/')) {
    const start = url.indexOf('file/d/') + 7;
    const end = url.indexOf('/', start);
    idValue = url.substring(start, end);
  }

  return idValue !== '' ? 'https://drive.google.com/uc?export=view&id=' + idValue : '';
};

export const copyToClipboard = async (text) => {
  try {
    await navigator.clipboard.writeText(text);
    // setIsCopied(true);
    toast.success('Copied to clipboard');
  } catch (err) {
    console.error('Unable to copy to clipboard', err);
  }
};

// export const formatDate = (dateString) => {
//   var date = new Date(dateString);
//   return moment(date).format('YYYY-MM-DD');
// };

export const formatDateDDMMYYYY = (dateString) => {
  var date = new Date(dateString);
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();

  const formattedDate = `${day}-${month}-${year}`;
  return formattedDate;
};

// export const getYearOptions = () => {
//   const currentYear = new Date().getFullYear();
//   const years = [];
//   for (let i = currentYear; i <= currentYear + 10; i++) {
//     years.push(i);
//   }
//   return years;
// };

export const getYearOptions = () => {
  const currentYear = new Date().getFullYear();
  const years = [];
  const range = 10; // You can adjust this range as needed

  for (let i = currentYear - range; i <= currentYear + range; i++) {
    years.push(i);
  }

  return years;
};

export const userStatusColor = (userStatus) => {
  let color = '';
  switch (userStatus.trim()) {
    case 'pending':
      color = 'text-warning';
      break;
    case 'active':
      color = 'text-info';
      break;
    default:
      color = '';
      break;
  }
  return color;
};

export const replaceImage = (error, image) => {
  error.target.src = image;
};

export const extractFirstLetter = (inputString) => {
  // Check if the input string is not empty
  if (inputString && typeof inputString === 'string') {
    // Split the input string into words
    const words = inputString.split(' ');

    // Extract the first letter of each word and convert them to uppercase
    const initials = words.map((word) => word.charAt(0).toUpperCase());

    // Concatenate the initials to create the final string
    const resultString = initials.join('');

    return resultString;
  } else {
    // Handle the case when the input is invalid or empty
    return '';
  }
};

export const hashPassword = async (password) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
  } catch (error) {
    throw new Error('Error hashing password');
  }
};

// Function to format date to YYYY-MM-DD
export const formatDate = (dateString) => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};
