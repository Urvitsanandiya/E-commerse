import { useNavigate } from "react-router-dom";

export default function OrderDone() {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-teal-50 to-gray-50 flex justify-center items-center p-4">
      <div className="max-w-lg w-full bg-gradient-to-r from-teal-100 to-gray-100 shadow-lg rounded-lg p-8 text-center">
        <h1 className="text-3xl font-semibold text-teal-800 mb-6">Thank You!</h1>
        <p className="text-gray-600 mb-8">
          Your order has been successfully placed.
        </p>
        <button
          onClick={handleGoHome}
          className="bg-teal-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-teal-700 transition"
        >
          Go to Home
        </button>
      </div>
    </div>
  );
}