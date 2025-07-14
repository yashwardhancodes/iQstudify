

"use client";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { IoIosPeople } from "react-icons/io";

const OperatorsPage = () => {
    const [operators, setOperators] = useState([]);
    const [error, setError] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedOperator, setSelectedOperator] = useState(null);
    const [loading, setLoading] = useState(true);
    console.log(operators, 'operators');

    useEffect(() => {
        fetchOperators();
    }, []);

    const fetchOperators = async () => {
        setLoading(true);
        try {
            const response = await axios.get('/api/admin/getoperator');
            console.log(response.data);

            setOperators(response.data);
        } catch (err) {
            setError(err.response?.data?.message || err.message);
        } finally {
            setLoading(false);
        }
    };


    const handleSave = async () => {
        try {
            const response = await axios.put('/api/superadmin/updateoperator', selectedOperator);
            toast.success('Operator updated successfully!', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            setIsModalOpen(false);
            fetchOperators();
        } catch (err) {
            const errorMessage = err.response?.data?.message || err.message || 'Failed to update operator';
            toast.error(errorMessage, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            setError(errorMessage);
        }
    };
    const handleDelete = async (operatorId) => {
        if (!window.confirm('Are you sure you want to delete this operator?')) return;

        try {
            const result = await toast.promise(
                axios.delete('/api/admin/deleteoperator', { data: { operatorId } }),
                {
                    pending: 'Deleting operator...',
                    success: 'Operator deleted successfully!',
                    error: 'Failed to delete operator'
                },
                {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                }
            );

            // ✅ Check if deleted operator is the one logged in and stored
            const storedOperator = JSON.parse(localStorage.getItem("operatorInfo"));
            if (storedOperator?.operatorId === operatorId) {
                localStorage.removeItem("operatorInfo");
                console.log("Removed operatorInfo from localStorage");
            }

            fetchOperators(); // Refresh operator list
        } catch (err) {
            const errorMessage = err.response?.data?.message || err.message || 'Failed to delete operator';
            toast.error(errorMessage, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            setError(errorMessage);
        }
    };


    // const handleDelete = async (operatorId) => {
    //     if (!window.confirm('Are you sure you want to delete this operator?')) return;

    //     try {
    //         const result = await toast.promise(
    //             axios.delete('/api/admin/deleteoperator', { data: { operatorId } }),
    //             {
    //                 pending: 'Deleting operator...',
    //                 success: 'Operator deleted successfully!',
    //                 error: 'Failed to delete operator'
    //             },
    //             {
    //                 position: "top-right",
    //                 autoClose: 3000,
    //                 hideProgressBar: false,
    //                 closeOnClick: true,
    //                 pauseOnHover: true,
    //                 draggable: true,
    //             }
    //         );
    //         fetchOperators();
    //     } catch (err) {
    //         const errorMessage = err.response?.data?.message || err.message || 'Failed to delete operator';
    //         toast.error(errorMessage, {
    //             position: "top-right",
    //             autoClose: 5000,
    //             hideProgressBar: false,
    //             closeOnClick: true,
    //             pauseOnHover: true,
    //             draggable: true,
    //             progress: undefined,
    //         });
    //         setError(errorMessage);
    //     }
    // };

    // ... (rest of your component code)

    // const handleDelete = async (operatorId) => {
    //     if (!window.confirm('Are you sure you want to delete this operator?')) return;

    //     try {
    //         await axios.delete('/api/admin/deleteoperator', { data: { operatorId } });
    //         toast.success('Operator deleted successfully!');
    //         fetchOperators();
    //     } catch (err) {
    //         setError(err.response?.data?.message || err.message);
    //     }
    // };

    const handleUpdate = (operator) => {
        console.log(operator);

        setSelectedOperator({
            ...operator,
            operatorId: operator._id,
            permissions: {
                addTitleCategory: operator.permissionId?.addTitleCategory || false,
                updateTitleCategory: operator.permissionId?.updateTitleCategory || false,
                addQuestion: operator.permissionId?.addQuestion || false,
                updateQuestion: operator.permissionId?.updateQuestion || false,
                addCategory: operator.permissionId?.addCategory || false,
                updateCategory: operator.permissionId?.updateCategory || false,
                addSubCategory: operator.permissionId?.addSubCategory || false,
                updateSubCategory: operator.permissionId?.updateSubCategory || false,
            }
        });
        setIsModalOpen(true);
    };

    // const handleSave = async () => {
    //     try {
    //         const response = await axios.put('/api/superadmin/updateoperator', selectedOperator);
    //         toast.success(response.data.message);
    //         setIsModalOpen(false);
    //         fetchOperators();
    //     } catch (err) {
    //         setError(err.response?.data?.message || err.message);
    //     }
    // };

    const handlePermissionChange = (permissionKey) => {
        setSelectedOperator((prev) => ({
            ...prev,
            permissions: {
                ...prev.permissions,
                [permissionKey]: !prev.permissions[permissionKey],
            },
        }));
    };

    return (
        <div className="container mx-auto    ">
   <div className="w-full  flex items-center justify-start py-4 shadow-md text-[rgba(7,43,120,1)]">
            <div className="flex items-center pl-6  h-10 space-x-3">
              <IoIosPeople className="text-4xl text-[rgba(239,156,1,1)" /> 
              <h1 className="text-xl  ">Operator Details</h1>
            </div>
          </div>
            {error && <p className="text-red-500">{error}</p>}

            <div className="overflow-x-auto mt-4  mx-auto !max-w-6xl">
                <table className="min-w-full bg-white border border-gray-200 shadow-md rounded-lg overflow-hidden text-sm sm:text-base">
  <thead className="bg-[rgba(239,156,1,1)] text-white">
    <tr>
      <th className="py-3 px-4 border">Name</th>
      <th className="py-3 px-4 border">Email</th>
      <th className="py-3 px-4 border">Password</th>
      <th className="py-3 px-4 border">Add TitleCategory</th>
      <th className="py-3 px-4 border">Update TitleCategory</th>
      <th className="py-3 px-4 border">Add Category</th>
      <th className="py-3 px-4 border">Update Category</th>
      <th className="py-3 px-4 border">Add Question</th>
      <th className="py-3 px-4 border">Update Question</th>
      <th className="py-3 px-4 border">Add SubCategory</th>
      <th className="py-3 px-4 border">Update SubCategory</th>
      <th className="py-3 px-4 border">Actions</th>
    </tr>
  </thead>
  <tbody>
    {loading ? (
      <tr>
        <td colSpan="12" className="text-center py-6">
          <div className="flex justify-center items-center space-x-2">
            <div className="w-5 h-5 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
            <span className="text-gray-600">Loading operators...</span>
          </div>
        </td>
      </tr>
    ) : operators.length === 0 ? (
      <tr>
        <td colSpan="12" className="text-center py-4 text-gray-500">No operators found</td>
      </tr>
    ) : (
      operators.map((operator) => (
        <tr key={operator._id} className="border-t hover:bg-gray-50 transition-all duration-200">
          <td className="py-2 px-4">{operator.name}</td>
          <td className="py-2 px-4">{operator.email}</td>
          <td className="py-2 px-4">{operator.password}</td>
          <td className="py-2 px-4 text-center">{operator.permissionId?.addTitleCategory ? '🟢' : '🔴'}</td>
          <td className="py-2 px-4 text-center">{operator.permissionId?.updateTitleCategory ? '🟢' : '🔴'}</td>
          <td className="py-2 px-4 text-center">{operator.permissionId?.addCategory ? '🟢' : '🔴'}</td>
          <td className="py-2 px-4 text-center">{operator.permissionId?.updateCategory ? '🟢' : '🔴'}</td>
          <td className="py-2 px-4 text-center">{operator.permissionId?.addQuestion ? '🟢' : '🔴'}</td>
          <td className="py-2 px-4 text-center">{operator.permissionId?.updateQuestion ? '🟢' : '🔴'}</td>
          <td className="py-2 px-4 text-center">{operator.permissionId?.addSubCategory ? '🟢' : '🔴'}</td>
          <td className="py-2 px-4 text-center">{operator.permissionId?.updateSubCategory ? '🟢' : '🔴'}</td>
          <td className="py-2 px-4 whitespace-nowrap flex gap-2 justify-center">
            <button
              onClick={() => handleUpdate(operator)}
              className="bg-[rgba(7,43,120,1)] hover:bg-blue-600 text-white py-1 px-3 rounded transition-all"
            >
              Update
            </button>
            <button
              onClick={() => handleDelete(operator._id)}
              className="bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded transition-all"
            >
              Delete
            </button>
          </td>
        </tr>
      ))
    )}
  </tbody>
</table>

            </div>

            {/* Modal */}
            {isModalOpen && selectedOperator && (
                <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center z-50 p-4">
                    <div className="bg-white p-6 rounded-lg max-w-md w-full">
                        <h2 className="text-xl font-bold mb-4">Update Operator</h2>

                        <label className="block text-sm font-medium">Name:</label>
                        <input
                            type="text"
                            value={selectedOperator.name}
                            onChange={(e) => setSelectedOperator({ ...selectedOperator, name: e.target.value })}
                            className="border p-2 w-full mb-4 rounded"
                        />

                        <label className="block text-sm font-medium">Email:</label>
                        <input
                            type="email"
                            value={selectedOperator.email}
                            onChange={(e) => setSelectedOperator({ ...selectedOperator, email: e.target.value })}
                            className="border p-2 w-full mb-4 rounded"
                        />

                        <h3 className="font-bold mb-2">Permissions</h3>
                        {Object.keys(selectedOperator.permissions).map((key) => (
                            <label key={key} className="flex items-center mb-2 text-sm">
                                <input
                                    type="checkbox"
                                    checked={selectedOperator.permissions[key]}
                                    onChange={() => handlePermissionChange(key)}
                                    className="mr-2"
                                />
                                {key}
                            </label>
                        ))}

                        <div className="mt-4 flex justify-end space-x-2">
                            <button onClick={handleSave} className="bg-blue-600 text-white py-2 px-4 rounded">Save</button>
                            <button onClick={() => setIsModalOpen(false)} className="bg-gray-400 text-white py-2 px-4 rounded">Cancel</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default OperatorsPage;
