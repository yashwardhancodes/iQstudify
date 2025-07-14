"use client";

import axios from "axios";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Loader from "@/app/components/Loader";
import { useRouter } from 'next/navigation';
import { Pencil, Trash2 } from "lucide-react";

const EditModal = ({ isOpen, onClose, onSave, initialValue = '', type }) => {
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.20)" }} // 3% opacity
    >
      <div className="bg-[#EF9C01] p-6 rounded-lg w-[90%] max-w-md shadow-xl text-white">
        <h2 className="text-lg font-semibold mb-4">Edit {type}</h2>
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="w-full p-2 rounded bg-white border border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 text-[rgba(7,43,120,1)]"
        />
        <div className="mt-4 flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded bg-white text-[rgba(7,43,120,1)]"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              if (value.trim()) onSave(value);
              onClose();
            }}
            className="px-4 py-2 rounded bg-[rgba(7,43,120,1)] hover:[rgba(7,43,120,10)] text-white"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>

  );
};

const Page = () => {
  const router = useRouter();

  const [titles, setTitles] = useState([]);
  const [activeTitle, setActiveTitle] = useState(null);
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState(null);
  const [subcategories, setSubcategories] = useState([]);
  const [subcategoryLoading, setSubcategoryLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [editModal, setEditModal] = useState({ open: false, type: '', id: '', value: '' });

  useEffect(() => {
    const fetchTitles = async () => {
      try {
        const titleRes = await axios.get("/api/admin/getalltitlecategory");
        const titleList = titleRes.data || [];
        setTitles(titleList);

        if (titleList.length > 0) {
          const firstTitleId = titleList[0]._id;
          setActiveTitle(firstTitleId);
          await fetchCategories(firstTitleId, true);
        }
      } catch (error) {
        console.error("Error fetching title categories:", error);
      } finally {
        setInitialLoading(false);
      }
    };

    fetchTitles();
  }, []);

  const fetchCategories = async (titleId, autoSelectFirst = false) => {
    try {
      const res = await axios.get(`/api/admin/getallcategory?titleCategory=${titleId}`);
      const categoryList = res.data.categories || res.data.data || [];
      setCategories(categoryList);

      if (autoSelectFirst && categoryList.length > 0) {
        const firstCategory = categoryList[0];
        setActiveCategory(firstCategory._id);
        await fetchSubcategories(firstCategory._id);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
      setCategories([]);
    }
  };

  const fetchSubcategories = async (categoryId) => {
    setSubcategoryLoading(true);
    try {
      const res = await axios.get(`/api/admin/getallsubcategory?id=${categoryId}`);
      setSubcategories(res.data.subcategories || []);
    } catch (err) {
      console.error("Error fetching subcategories:", err);
      setSubcategories([]);
    } finally {
      setSubcategoryLoading(false);
    }
  };

  const handleDeleteTitle = async (id) => {
    try {
      await axios.delete(`/api/admin/title/${id}`);
      setTitles(prev => prev.filter(t => t._id !== id));
    } catch (err) {
      console.error("Failed to delete title:", err);
    }
  };

  const handleDeleteCategory = async (id) => {
    try {
      await axios.delete(`/api/admin/category/${id}`);
      setCategories(prev => prev.filter(c => c._id !== id));
      setSubcategories([]);
    } catch (err) {
      console.error("Failed to delete category:", err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/admin/subcategory/${id}`);
      setSubcategories(prev => prev.filter(s => s._id !== id));
    } catch (err) {
      console.error("Failed to delete subcategory:", err);
    }
  };

  const handleSaveEdit = async (value) => {
    try {
      const { id, type } = editModal;
      if (type === 'Title Category') {
        await axios.put(`/api/admin/title/${id}`, { title: value });
        setTitles(prev => prev.map(t => t._id === id ? { ...t, title: value } : t));
      } else if (type === 'Category') {
        await axios.put(`/api/admin/category/${id}`, { name: value });
        setCategories(prev => prev.map(c => c._id === id ? { ...c, name: value } : c));
      } else if (type === 'Subcategory') {
        await axios.put(`/api/admin/subcategory/${id}`, { name: value });
        setSubcategories(prev => prev.map(s => s._id === id ? { ...s, name: value } : s));
      }
    } catch (err) {
      console.error("Failed to update", err);
    }
  };

  if (initialLoading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <Loader />
      </div>
    );
  }

  return (
    <div className="p-2">
      {/* Titles */}
      <div className="flex gap-4 overflow-x-scroll hide-scrollbar mb-6">
        {titles.map((title, index) => (
          <div key={index} className="flex items-center gap-2 min-w-max">
            <div
              onClick={() => {
                setActiveTitle(title._id);
                setCategories([]);
                setSubcategories([]);
                setActiveCategory(null);
                fetchCategories(title._id, true);
              }}
              className={`cursor-pointer p-2 text-sm flex-1 ${activeTitle === title._id
                ? "text-black border-b-2 border-b-blue-500 font-medium"
                : "text-gray-600 hover:text-black"}`}
            >
              {title.title}
            </div>
            <div className="flex items-center gap-1 pr-2">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setEditModal({ open: true, type: 'Title Category', id: title._id, value: title.title });
                }}
                className="text-yellow-500 hover:text-yellow-600"
                title="Edit Title"
              >
                <Pencil size={16} />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleDeleteTitle(title._id);
                }}
                className="text-red-500 hover:text-red-600"
                title="Delete Title"
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="flex">
        {/* Categories Sidebar */}
        <div className="p-4 bg-[#072B78] h-[calc(100vh-127px)] w-[20vw] overflow-y-scroll">
          <h2 className="mb-2 text-white">Categories</h2>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTitle}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              {categories.length > 0 ? (
                categories.map((cat) => (
                  <div
                    key={cat._id}
                    className={`flex items-center justify-between px-3 py-2 rounded mb-2 transition-[0.5s] cursor-pointer ${activeCategory === cat._id ? "bg-[#EF9C01] text-white" : "text-white hover:bg-[#EF9C01]"}`}
                  >
                    <span
                      onClick={() => {
                        setActiveCategory(cat._id);
                        fetchSubcategories(cat._id);
                      }}
                      className="flex-1"
                    >
                      {cat.name}
                    </span>
                    <div className="flex gap-1 ml-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setEditModal({ open: true, type: 'Category', id: cat._id, value: cat.name });
                        }}
                        className="text-yellow-300 hover:text-yellow-100"
                        title="Edit Category"
                      >
                        <Pencil size={16} />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteCategory(cat._id);
                        }}
                        className="text-red-300 hover:text-red-100"
                        title="Delete Category"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-sm text-gray-400">Select a title to view categories</p>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Subcategories Area */}
        <div className="flex-1 bg-[#74CDFF26] p-4 h-[calc(100vh-127px)] overflow-y-scroll">
          <h2 className="font-semibold mb-2">Subcategories</h2>

          {subcategoryLoading ? (
            <Loader />
          ) : (
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCategory}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
              >
                {subcategories.length > 0 ? (
                  subcategories.map((sub) => (
                    <motion.div
                      key={sub._id}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3 }}
                      className="p-4 bg-white rounded shadow cursor-pointer"
                    >
                      <div className="flex items-center justify-between">
                        <span
                          onClick={() => router.push(`/testsection/${sub._id}`)}
                          className="text-lg font-medium flex-1 text-left"
                        >
                          {sub.name}
                        </span>
                        <div className="flex gap-2 ml-4">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setEditModal({ open: true, type: 'Subcategory', id: sub._id, value: sub.name });
                            }}
                            className="text-yellow-500 hover:text-yellow-600"
                            title="Edit Subcategory"
                          >
                            <Pencil size={18} />
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDelete(sub._id);
                            }}
                            className="text-red-500 hover:text-red-600"
                            title="Delete Subcategory"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))
                ) : (
                  <p className="text-sm text-gray-500 col-span-3">No subcategories found.</p>
                )}
              </motion.div>
            </AnimatePresence>
          )}
        </div>
      </div>

      {/* Edit Modal */}
      <EditModal
        isOpen={editModal.open}
        onClose={() => setEditModal({ ...editModal, open: false })}
        initialValue={editModal.value}
        type={editModal.type}
        onSave={handleSaveEdit}
      />
    </div>
  );
};

export default Page;
