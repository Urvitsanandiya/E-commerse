import { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "./Sidebar";

export default function Userlist() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:5005/api/users")
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

  // Function to toggle status between "Pending" and "Delivered"
  const toggleStatus = async (userId, currentStatus) => {
    const newStatus = currentStatus === "Pending" ? "Delivered" : "Pending";

    try {
      await axios.put(`http://localhost:5005/api/users/status/${userId}`, {
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
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-6 md:ml-64">
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-5">User List</h2>

          {/* Display error message if fetching fails */}
          {error && <p className="text-red-500">{error}</p>}

          {/* Show loading message */}
          {loading ? (
            <p className="text-gray-500">Loading users...</p>
          ) : (
            <div className="overflow-x-auto shadow-md rounded-lg">
              <table className="w-full border border-gray-300 bg-white">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="border p-3 text-left">User Email</th>
                    <th className="border p-3 text-left">Username</th>
                    <th className="border p-3 text-left">Status</th>
                    <th className="border p-3 text-left">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.length > 0 ? (
                    users.map((user) => (
                      <tr key={user._id} className="hover:bg-gray-100">
                        <td className="border p-3">{user.email}</td>
                        <td className="border p-3">{user.name}</td>
                        <td className="border p-3">
                          <span
                            className={`px-3 py-1 rounded-full text-white text-sm font-semibold ${
                              user.status === "Pending"
                                ? "bg-yellow-500"
                                : "bg-green-500"
                            }`}
                          >
                            {user.status}
                          </span>
                        </td>
                        <td className="border p-3">
                          <button
                            className={`px-3 py-1 rounded text-white transition ${
                              user.status === "Pending"
                                ? "bg-green-500 hover:bg-green-600"
                                : "bg-yellow-500 hover:bg-yellow-600"
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
                      <td colSpan="4" className="text-center p-4 text-gray-500">
                        No users found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}

          {/* Mobile-friendly scroll hint */}
          <div className="text-gray-500 text-center mt-4 md:hidden">
            Scroll horizontally to see more →
          </div>
        </div>
      </div>
    </div>
  );
}
