import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCareers,
  createCareer,
  updateCareer,
  deleteCareer,
  clearCareerState,
} from "../../redux/slices/careerSlice";
import { toast } from "react-toastify";
import { PlusCircle, Edit, Trash2, Briefcase, MapPin, Clock, Loader2, X, CheckCircle } from "lucide-react";

const AdminCareers = () => {
  const dispatch = useDispatch();
  const { careers = [], loading, error, success } = useSelector((state) => state.careers);

  const [showModal, setShowModal] = useState(false);
  const [editingCareer, setEditingCareer] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    location: "",
    type: "",
    description: "",
    isActive: true,
  });

  // Load careers and clear state on unmount
  useEffect(() => {
    dispatch(fetchCareers());
    return () => dispatch(clearCareerState());
  }, [dispatch]);

  // Show notifications and reset form/modal on success/error
  useEffect(() => {
    if (error) {
        toast.error(error);
        setIsSubmitting(false);
    }
    if (success) {
        toast.success(success);
        // Dispatch fetchCareers to refresh the list after a successful action
        dispatch(fetchCareers()); 
        if (isSubmitting) {
            setShowModal(false);
            setEditingCareer(null);
            setFormData({ title: "", location: "", type: "", description: "", isActive: true });
            setIsSubmitting(false);
        }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error, success, dispatch]); 


  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    if (editingCareer) {
      dispatch(updateCareer({ id: editingCareer._id, updates: formData }));
    } else {
      dispatch(createCareer(formData));
    }
    // The state reset now happens in the useEffect upon success.
  };

  const handleEdit = (career) => {
    setEditingCareer(career);
    setFormData({
      title: career.title,
      location: career.location,
      type: career.type,
      description: career.description,
      isActive: career.isActive,
    });
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingCareer(null);
    setFormData({ title: "", location: "", type: "", description: "", isActive: true });
    setIsSubmitting(false);
  }

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this career? This action is irreversible.")) {
      dispatch(deleteCareer(id));
    }
  };

  // --- RENDERING ---
  
  const JobStatusBadge = ({ isActive }) => (
    <span
      className={`px-3 py-1 text-xs font-semibold rounded-full ${
        isActive
          ? "bg-teal-100 text-teal-800"
          : "bg-red-100 text-red-800"
      }`}
    >
      {isActive ? "Active" : "Inactive"}
    </span>
  );

  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <div className="max-w-6xl mx-auto bg-white shadow-xl rounded-xl p-6 border border-gray-200">
        
        {/* Header */}
        <div className="flex justify-between items-center mb-8 pb-4 border-b border-gray-200">
          <h1 className="text-3xl font-bold text-gray-900 flex items-center">
            <Briefcase size={28} className="mr-3 text-indigo-600" /> Manage Job Openings
          </h1>
          <button
            onClick={() => {handleCloseModal(); setShowModal(true);}}
            className="flex items-center bg-indigo-600 text-white px-5 py-2.5 rounded-lg font-semibold hover:bg-indigo-700 transition shadow-md"
          >
            <PlusCircle size={20} className="mr-2" />
            Add New Job
          </button>
        </div>

        {/* Content Area */}
        {loading ? (
          <div className="flex justify-center items-center py-12 text-lg text-indigo-600">
            <Loader2 className="animate-spin mr-3" size={24} /> Loading career listings...
          </div>
        ) : (
          <div className="space-y-4">
            {careers.length === 0 ? (
                <div className="text-center py-10 text-gray-500 bg-gray-50 rounded-lg border border-dashed border-gray-300">
                    No job openings currently listed.
                </div>
            ) : (
                careers.map((career) => (
                    <div
                        key={career._id}
                        className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 flex justify-between items-start transition duration-200 hover:shadow-lg"
                    >
                        <div className="flex-grow">
                            <h2 className="text-2xl font-bold text-gray-900 mb-1">{career.title}</h2>
                            <div className="flex items-center text-sm text-gray-600 space-x-4 mb-3">
                                <span className="flex items-center">
                                    <MapPin size={14} className="mr-1 text-indigo-500" /> {career.location}
                                </span>
                                <span className="flex items-center">
                                    <Clock size={14} className="mr-1 text-indigo-500" /> {career.type}
                                </span>
                                <JobStatusBadge isActive={career.isActive} />
                            </div>
                            <p className="text-gray-700 leading-relaxed max-w-4xl line-clamp-2">{career.description}</p>
                        </div>
                        <div className="flex flex-col gap-2 ml-6 flex-shrink-0">
                            <button
                                onClick={() => handleEdit(career)}
                                className="p-2 text-indigo-600 rounded-full hover:bg-indigo-50 transition"
                                title="Edit Job"
                            >
                                <Edit size={20} />
                            </button>
                            <button
                                onClick={() => handleDelete(career._id)}
                                className="p-2 text-red-600 rounded-full hover:bg-red-50 transition"
                                title="Delete Job"
                            >
                                <Trash2 size={20} />
                            </button>
                        </div>
                    </div>
                ))
            )}
          </div>
        )}

        {/* Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-gray-900 bg-opacity-70 flex justify-center items-center z-50 p-4">
            <div className="bg-white p-8 rounded-xl w-full max-w-lg relative shadow-2xl">
              <h2 className="text-2xl font-bold mb-6 text-gray-900 border-b pb-2">
                {editingCareer ? "Edit Job Opening" : "Add New Job Opening"}
              </h2>
              
              <button
                type="button"
                onClick={handleCloseModal}
                className="absolute top-4 right-4 p-2 text-gray-500 rounded-full hover:bg-gray-100 hover:text-gray-700 transition"
              >
                <X size={24} />
              </button>

              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="Job Title (e.g., Senior Software Engineer)"
                  className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 transition"
                  required
                />
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="Location (e.g., Nairobi, Kenya)"
                  className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 transition"
                  required
                />
                <input
                  type="text"
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  placeholder="Type (e.g., Full-time, Contract, Internship)"
                  className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 transition"
                  required
                />
                <textarea
                  name="description"
                  rows="4"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Detailed Job Description"
                  className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 resize-none transition"
                  required
                />
                <div className="flex items-center gap-2 pt-2">
                  <input
                    type="checkbox"
                    id="isActive"
                    name="isActive"
                    checked={formData.isActive}
                    onChange={handleChange}
                    className="h-5 w-5 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                  />
                  <label htmlFor="isActive" className="text-gray-700 font-medium select-none">
                    Set as Active (Visible on careers page)
                  </label>
                </div>

                <div className="flex justify-end gap-3 pt-4">
                  <button
                    type="button"
                    onClick={handleCloseModal}
                    className="px-6 py-2.5 rounded-lg border border-gray-300 text-gray-700 font-medium hover:bg-gray-100 transition"
                    disabled={isSubmitting}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex items-center px-6 py-2.5 rounded-lg bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition disabled:bg-indigo-400"
                  >
                    {isSubmitting ? (
                        <Loader2 size={20} className="animate-spin mr-2" />
                    ) : (
                        <CheckCircle size={20} className="mr-2" />
                    )}
                    {editingCareer ? "Update Job" : "Create Job"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminCareers;