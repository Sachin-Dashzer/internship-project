import { useNavigate } from "react-router-dom";
import React from "react";
import error from "../assets/error.jpg";

const NotFound = () => {
  const [timer, setTimer] = React.useState(7);
  const navigate = useNavigate();

  React.useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prevTimer) => prevTimer - 1);
    }, 1000);

    const timeout = setTimeout(() => {
      navigate("/", { replace: true });
    }, 7000);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="mb-6">
        <img
          className="w-96 h-auto object-contain"
          src={error}
          alt="Error"
        />
      </div>
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          No Result Found
        </h1>
        <p className="text-lg text-gray-600 mb-6">File Doesn't Exist</p>
        <h5 className="text-lg font-semibold text-gray-700">
          Redirecting to Homepage in{" "}
          <span className="text-blue-600">{timer} sec...</span>
        </h5>
      </div>
    </div>
  );
};

export default NotFound;
