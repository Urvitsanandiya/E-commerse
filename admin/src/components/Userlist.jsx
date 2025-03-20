import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "./Navbar";

export default function Userlist() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get(`${API_URL}/api/users`)
      .then((res) => {
        setUsers(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching users:", err);
        setError("Failed to load users.");
        setLoading(false);
      });
  }, []);
  const API_URL =
    import.meta.env.VITE_API_URL ||
    (import.meta.env.MODE === "development"
      ? `http://localhost:5005`
      : `https://e-commerse-2jqj.onrender.com`);

  // Function to toggle status between "Pending" and "Delivered"
  const toggleStatus = async (userId, currentStatus) => {
    const newStatus = currentStatus === "Pending" ? "Delivered" : "Pending";

    try {
      await axios.put(`${API_URL}/api/users/status/${userId}`, {
        status: newStatus,
      });

      // Update local state with the new status
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user._id === userId ? { ...user, status: newStatus } : user
        )
      );
    } catch (error) {
      console.error("Error updating user status:", error);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="p-6">
        <h2 className="text-3xl font-bold text-teal-800 mb-8">User List</h2>

        {/* Display error message if fetching fails */}
        {error && <p className="text-coral-500">{error}</p>}

        {/* Show loading message */}
        {loading ? (
          <p className="text-teal-600">Loading users...</p>
        ) : (
          <div className="overflow-x-auto shadow-lg rounded-lg">
            <table className="w-full border border-teal-200 bg-gradient-to-r from-teal-50 to-gray-50">
              <thead>
                <tr className="bg-teal-100">
                  <th className="border p-3 text-left text-teal-800">
                    User Email
                  </th>
                  <th className="border p-3 text-left text-teal-800">
                    Username
                  </th>
                  <th className="border p-3 text-left text-teal-800">Status</th>
                  <th className="border p-3 text-left text-teal-800">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {users.length > 0 ? (
                  users.map((user) => (
                    <tr key={user._id} className="hover:bg-teal-50 transition">
                      <td className="border p-3 text-teal-800">{user.email}</td>
                      <td className="border p-3 text-teal-800">{user.name}</td>
                      <td className="border p-3">
                        <span
                          className={`px-3 py-1 rounded-full text-white text-sm font-semibold ${
                            user.status === "Pending"
                              ? "bg-yellow-300"
                              : "bg-green-300"
                          }`}
                        >
                          {user.status}
                        </span>
                      </td>
                      <td className="border p-3">
                        <button
                          className={`px-4 py-2 rounded text-white transition ${
                            user.status === "Pending"
                              ? "bg-green-200 hover:bg-green-300"
                              : "bg-yellow-200 hover:bg-yellow-300"
                          }`}
                          onClick={() => toggleStatus(user._id, user.status)}
                        >
                          {user.status === "Pending"
                            ? "Mark Delivered"
                            : "Mark Pending"}
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="text-center p-4 text-teal-800">
                      No users found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}

        {/* Mobile-friendly scroll hint */}
        <div className="text-teal-800 text-center mt-4 md:hidden">
          Scroll horizontally to see more →
        </div>
      </div>
    </div>
  );
}
