import { useEffect, useState } from "react";
import UserServices from "../../services/UserServices";

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const fetchUsers = async () => {
    try {
      const response = await UserServices.getAllUsers(); // returns all users for admin
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleEditClick = (user) => {
    setSelectedUser({ ...user });
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
  };

  const handleSave = async () => {
    try {
      await UserServices.updateUserProfile(selectedUser);
      await fetchUsers();
      handleModalClose();
    } catch (error) {
      console.error("Error updating user profile:", error);
    }
  };

  return (
    <div className="p-4 sm:p-6">
      <h2 className="text-2xl font-bold mb-6 text-center">Users List</h2>
      <div className="overflow-x-auto rounded-lg shadow hidden sm:block">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-900">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">#</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">Email</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">Phone</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-right text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            {users.map((u, i) => (
              <tr key={u.userId} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">{i + 1}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100">{u.firstName} {u.lastName}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300">{u.email}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300">{u.phone}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 text-xs font-semibold rounded-full ${u.status === "active" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                    {u.status === "active" ? "Active" : "inActive"}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button onClick={() => handleEditClick(u)} className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm shadow-sm">
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && selectedUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 w-full max-w-md mx-4">
            <h3 className="text-xl text-center font-bold mb-4 text-gray-900 dark:text-white">
              Edit User Status
            </h3>
            <div className="space-y-3">
              <input
                type="text"
                value={`${selectedUser.firstName} ${selectedUser.lastName}`}
                disabled
                className="w-full p-2 border rounded dark:bg-gray-700 cursor-not-allowed dark:text-white"
              />
              <input
                type="email"
                value={selectedUser.email}
                disabled
                className="w-full p-2 border rounded dark:bg-gray-700 cursor-not-allowed dark:text-white"
              />
              <input
                type="text"
                value={selectedUser.phone}
                disabled
                className="w-full p-2 border rounded dark:bg-gray-700 cursor-not-allowed dark:text-white"
              />
              <select
                value={selectedUser.status}
                onChange={(e) =>
                  setSelectedUser({
                    ...selectedUser,
                    status: e.target.value,
                  })
                }
                className="w-full p-2 border rounded dark:bg-gray-900 cursor-pointer dark:text-white"
              >
                <option value="active">Active</option>
                <option value="inActive">InActive</option>
              </select>
            </div>
            <div className="flex justify-end mt-6 space-x-2">
              <button
                onClick={handleModalClose}
                className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageUsers;