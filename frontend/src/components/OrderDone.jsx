import { useNavigate } from "react-router-dom";

export default function OrderDone() {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center p-4">
      <div className="max-w-lg w-full bg-white shadow-md rounded-lg p-8 text-center">
        <h1 className="text-2xl font-semibold mb-4">Thank You!</h1>
        <p className="text-gray-600 mb-6">Your order has been successfully placed.</p>
        <button
          onClick={handleGoHome}
          className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition"
        >
          Go to Home
        </button>
      </div>
    </div>
  );
}
