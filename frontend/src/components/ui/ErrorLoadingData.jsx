import { FaExclamationTriangle } from 'react-icons/fa';

const ErrorLoadingData = ({ message = 'Error loading data, please try to refresh' }) => {
  return (
    <div className="flex h-64 items-center justify-center">
      <div className="flex flex-col items-center">
        <span className="mb-4 text-4xl text-gray-500">
          <FaExclamationTriangle />
        </span>
        <p className="text-lg text-gray-500">{message}</p>
      </div>
    </div>
  );
};

export default ErrorLoadingData;
