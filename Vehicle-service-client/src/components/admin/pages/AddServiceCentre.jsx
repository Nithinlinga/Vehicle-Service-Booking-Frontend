import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import { useParams, useNavigate } from "react-router-dom";
import ServiceCenterServices from "../../services/ServiceCenterServices";

const ServiceCentreForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = Boolean(id);

  const [initialValues, setInitialValues] = useState({
    name: "",
    location: "",
    contact: "",
    rating: 4.5,
    feedback: "Great service!"
  });

  // Fetch data for edit mode
  useEffect(() => {
    const fetchServiceCentre = async () => {
      try {
        if (isEditMode) {
          const response = await ServiceCenterServices.getServiceCenterById(id);
          const sc = response.data;
          console.log(sc.name)
          setInitialValues({
            name: sc.name || "",
            location: sc.location || "",
            contact: sc.contact || "",
            rating: sc.rating || 4.5,
            feedback: sc.feedback || ""
          });
        }
      } catch (error) {
        console.error("Error fetching service centre:", error);
      }
    };
    fetchServiceCentre();
  }, [id, isEditMode]);

  // Validation
  const validate = (values) => {
    const errors = {};
    const nameRegex = /^[A-Za-z0-9\s]{3,50}$/;
    const locationRegex = /^.{5,100}$/;
    const contactRegex = /^[0-9+\- ]{7,15}$/;

    if (!values.name) errors.name = "Service centre name is required";
    else if (!nameRegex.test(values.name))
      errors.name = "Name must be 3-50 characters (letters/numbers/spaces)";

    if (!values.location) errors.location = "Location is required";
    else if (!locationRegex.test(values.location))
      errors.location = "Location must be 5-100 characters";

    if (!values.contact) errors.contact = "Contact is required";
    else if (!contactRegex.test(values.contact))
      errors.contact = "Invalid contact number";

    return errors;
  };

  // Formik hook
  const formik = useFormik({
    enableReinitialize: true,
    initialValues,
    validateOnBlur: true,
    validateOnChange: false,
    validate,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        if (isEditMode) {
          await ServiceCenterServices.updateServiceCenter(id, values);
        } else {
          await ServiceCenterServices.addServiceCenter(values);
        }
        navigate("/admin/manage-service-centers", { replace: true });
      } catch (error) {
        console.error("Error saving service centre:", error);
      } finally {
        setSubmitting(false);
      }
    }
  });

  return (
    <div className="flex justify-center items-center min-h-screen p-4">
      <div className="w-full max-w-lg shadow-xl rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-6 text-center">
          {isEditMode ? "Edit Service Centre" : "Add Service Centre"}
        </h2>

        <form onSubmit={formik.handleSubmit} className="space-y-4">
          {/* Name */}
          <div>
            <label className="block font-medium mb-1">Service Centre Name</label>
            <input
              type="text"
              name="name"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.name}
              className="w-full p-2 border rounded"
              aria-invalid={Boolean(formik.touched.name && formik.errors.name)}
            />
            {formik.touched.name && formik.errors.name && (
              <div className="text-red-500 text-sm">{formik.errors.name}</div>
            )}
          </div>

          {/* Location */}
          <div>
            <label className="block font-medium mb-1">Location</label>
            <input
              type="text"
              name="location"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.location}
              className="w-full p-2 border rounded"
              aria-invalid={Boolean(formik.touched.location && formik.errors.location)}
            />
            {formik.touched.location && formik.errors.location && (
              <div className="text-red-500 text-sm">{formik.errors.location}</div>
            )}
          </div>

          {/* Contact */}
          <div>
            <label className="block font-medium mb-1">Contact</label>
            <input
              type="text"
              name="contact"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.contact}
              className="w-full p-2 border rounded"
              aria-invalid={Boolean(formik.touched.contact && formik.errors.contact)}
            />
            {formik.touched.contact && formik.errors.contact && (
              <div className="text-red-500 text-sm">{formik.errors.contact}</div>
            )}
          </div>

          {/* Rating */}
          <div>
            <label className="block font-medium mb-1">Rating</label>
            <input
              type="text"
              name="rating"
              value={formik.values.rating}
              disabled
              className="w-full p-2 border rounded bg-gray-400 cursor-not-allowed"
            />
          </div>

          {/* Feedback */}
          <div>
            <label className="block font-medium mb-1">Feedback</label>
            <textarea
              name="feedback"
              value={formik.values.feedback}
              disabled
              className="w-full p-2 border rounded bg-gray-400 cursor-not-allowed"
            />
          </div>

          {/* Submit */}
          <div className="text-right">
            <button
              type="submit"
              disabled={formik.isSubmitting}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
            >
              {isEditMode ? "Update" : "Add"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ServiceCentreForm;
