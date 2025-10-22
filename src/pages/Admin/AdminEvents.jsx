import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchEvents, createEvent } from "../../redux/slices/eventSlice";
// Assuming you have an enhanced Loader component
import Loader from "../../components/Loader/Loader";
import { toast } from "react-toastify";
import { CalendarPlus, Calendar, Image as ImageIcon } from "lucide-react";

const AdminEvents = () => {
  const dispatch = useDispatch();
  const { events, loading } = useSelector((state) => state.events);
  
  // Use a local state for creation loading status to disable the button
  const [isCreating, setIsCreating] = useState(false); 

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    location: "",
  });
  const [image, setImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setPreviewUrl(file ? URL.createObjectURL(file) : "");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { title, description, date, location } = formData;

    if (!title || !description || !date || !location) {
      toast.error("All fields are required!");
      return;
    }
    if (!image) {
      toast.error("Please upload an image.");
      return;
    }

    setIsCreating(true);
    
    const data = new FormData();
    data.append("title", title);
    data.append("description", description);
    data.append("date", date);
    data.append("location", location);
    data.append("image", image); 

    try {
      await dispatch(createEvent(data)).unwrap();
      toast.success("Event created successfully!");

      // Reset form on success
      setFormData({ title: "", description: "", date: "", location: "" });
      setImage(null);
      setPreviewUrl("");
      
      // Re-fetch list to show the new event
      dispatch(fetchEvents()); 
    } catch (err) {
      console.error("Event creation failed:", err);
      // Use the error message from the rejected promise if available
      const errorMessage = err.message || "Failed to create event. Please try again.";
      toast.error(errorMessage);
    } finally {
        setIsCreating(false);
    }
  };

  useEffect(() => {
    dispatch(fetchEvents());
  }, [dispatch]);

  // Assuming Loader handles full screen loading
  if (loading) return <Loader />;

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      <h2 className="text-4xl font-extrabold text-gray-900 border-b-4 border-indigo-500 pb-2 mb-10 max-w-7xl mx-auto">
        Event Management
      </h2>

      {/* Event Creation Form Card */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
        <div className="lg:col-span-1 bg-white p-6 rounded-xl shadow-xl h-fit border border-gray-200">
          <h3 className="text-2xl font-bold mb-4 flex items-center text-indigo-700">
            <CalendarPlus className="mr-2" size={24} /> Create New Event
          </h3>
          <p className="text-gray-500 mb-6">Fill in the details to schedule and publish a new company event.</p>
          
          {/* Image Preview Section */}
          <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Event Image Preview</label>
              <div className="w-full h-48 bg-gray-100 rounded-lg overflow-hidden flex items-center justify-center border border-dashed border-gray-300">
                  {previewUrl ? (
                      <img src={previewUrl} alt="Preview" className="w-full h-full object-cover" />
                  ) : (
                      <ImageIcon size={32} className="text-gray-400" />
                  )}
              </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="lg:col-span-2 bg-white p-8 rounded-xl shadow-xl space-y-6 border border-gray-200">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Title */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                    <input type="text" name="title" placeholder="Event Title" value={formData.title} onChange={handleChange} 
                        className="w-full border-gray-300 rounded-lg shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2.5" 
                        required 
                    />
                </div>
                {/* Location */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                    <input type="text" name="location" placeholder="Event Location" value={formData.location} onChange={handleChange} 
                        className="w-full border-gray-300 rounded-lg shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2.5" 
                        required 
                    />
                </div>
                {/* Date */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                    <input type="date" name="date" value={formData.date} onChange={handleChange} 
                        className="w-full border-gray-300 rounded-lg shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2.5" 
                        required 
                    />
                </div>
                {/* Image Upload */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Upload Image</label>
                    <input type="file" name="image" onChange={handleImageChange} 
                        className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100" 
                        accept="image/*" 
                        required={!image} // Only required if no image is selected yet
                    />
                </div>
            </div>

            {/* Description */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea name="description" placeholder="Event Description" value={formData.description} onChange={handleChange} 
                    className="w-full border-gray-300 rounded-lg shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2.5" 
                    rows={4} 
                    required 
                />
            </div>

            <button 
                type="submit" 
                className="w-full flex justify-center items-center bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition disabled:bg-indigo-400"
                disabled={isCreating}
            >
                {isCreating ? (
                    <>
                        <Loader2 className="animate-spin mr-3" size={20} /> Publishing...
                    </>
                ) : (
                    <>
                        <CalendarPlus className="mr-2" size={20} /> Create Event
                    </>
                )}
            </button>
        </form>
      </div>

      {/* Existing Events List */}
      <div className="max-w-7xl mx-auto">
        <h3 className="text-2xl font-bold mb-4 flex items-center text-gray-800">
            <Calendar className="mr-2 text-indigo-600" size={24} /> Existing Events
        </h3>
        
        {events.length > 0 ? (
          <div className="overflow-x-auto bg-white shadow-xl rounded-xl">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-600">Image</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-600">Title</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-600">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-600">Location</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-600 max-w-xs">Description</th>
                  {/* <th className="px-6 py-3 text-center text-xs font-semibold uppercase tracking-wider text-gray-600">Actions</th> */}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {events.map((event, index) => (
                  <tr key={event._id} className={index % 2 === 0 ? "bg-white hover:bg-gray-50" : "bg-gray-50 hover:bg-gray-100"}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <img src={event.image || "/placeholder.jpg"} alt={event.title} className="w-12 h-12 object-cover rounded-md shadow-md" />
                    </td>
                    <td className="px-6 py-4 font-medium text-gray-900">{event.title}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                        {new Date(event.date).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{event.location}</td>
                    <td className="px-6 py-4 text-sm text-gray-700 max-w-xs truncate">{event.description}</td>
                    {/* Placeholder for future Edit/Delete actions */}
                    {/* <td className="px-6 py-4 text-center">...</td> */}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center p-10 bg-white rounded-xl shadow-md">
            <p className="text-lg text-gray-500 font-medium">No events have been scheduled yet.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminEvents;