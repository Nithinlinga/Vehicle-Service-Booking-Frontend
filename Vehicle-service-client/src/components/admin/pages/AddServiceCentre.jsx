import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";

const ServiceCentreForm = () => {
    // Regex-based validation
    const validate = (values) => {
        const errors = {};
        const nameRegex = /^[A-Za-z0-9\s]{3,50}$/; // letters, numbers, spaces, 3-50 chars
        const locationRegex = /^.{5,100}$/; // any characters, 5-100 chars
        const contactRegex = /^[0-9+\- ]{7,15}$/; // digits, +, -, spaces, length 7-15

        if (!values.name) {
            errors.name = "Service centre name is required";
        } else if (!nameRegex.test(values.name)) {
            errors.name = "Name must be 3-50 characters (letters/numbers/spaces)";
        }

        if (!values.location) {
            errors.location = "Location is required";
        } else if (!locationRegex.test(values.location)) {
            errors.location = "Location must be 5-100 characters";
        }

        if (!values.contact) {
            errors.contact = "Contact is required";
        } else if (!contactRegex.test(values.contact)) {
            errors.contact = "Invalid contact number";
        }

        return errors;
    };

    const handleSubmit = (values) => {
        console.log("Form submitted:", values);
        // Call API here
    };

    return (
        <div className="flex justify-center items-center min-h-screen  p-4">
            <div className="w-full max-w-lg  shadow-xl rounded-lg p-6">
                <h2 className="text-2xl font-bold mb-6 text-center">
                    Service Centre Form
                </h2>

                <Formik
                    initialValues={{
                        name: "",
                        location: "",
                        contact: "",
                        rating: "4.5", // example default
                        feedback: "Great service!" // example default
                    }}
                    validate={validate}
                    onSubmit={handleSubmit}
                >
                    {() => (
                        <Form className="space-y-4">
                            {/* Service Centre Name */}
                            <div>
                                <label className="block text-gray-700 dark:text-gray-200 font-medium mb-1">
                                    Service Centre Name
                                </label>
                                <Field
                                    type="text"
                                    name="name"
                                    placeholder="Enter service centre name"
                                    className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded 
                                                bg-white dark:bg-gray-800 
                                                text-gray-900 dark:text-gray-100 
                                                focus:outline-none focus:ring-2 focus:ring-green-500"
                                />
                                <ErrorMessage
                                    name="name"
                                    component="div"
                                    className="text-red-500 text-sm mt-1"
                                />
                            </div>

                            {/* Location */}
                            <div>
                                <label className="block text-gray-700 dark:text-gray-200 font-medium mb-1">
                                    Location
                                </label>
                                <Field
                                    type="text"
                                    name="location"
                                    placeholder="Enter location"
                                    className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded 
                                            bg-white dark:bg-gray-800 
                                            text-gray-900 dark:text-gray-100 
                                            focus:outline-none focus:ring-2 focus:ring-green-500"
                                   />
                                <ErrorMessage
                                    name="location"
                                    component="div"
                                    className="text-red-500 text-sm mt-1"
                                />
                            </div>

                            {/* Contact */}
                            <div>
                                <label className="block text-gray-700 dark:text-gray-200 font-medium mb-1">
                                    Contact
                                </label>
                                <Field
                                    type="text"
                                    name="contact"
                                    placeholder="Enter contact number"
                                    className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded 
                                            bg-white dark:bg-gray-800 
                                            text-gray-900 dark:text-gray-100 
                                            focus:outline-none focus:ring-2 focus:ring-green-500"
                                />
                                <ErrorMessage
                                    name="contact"
                                    component="div"
                                    className="text-red-500 text-sm mt-1"
                                />
                            </div>

                            {/* Rating (Disabled) */}
                            <div>
                                <label className="block text-gray-700 dark:text-gray-200 font-medium mb-1">
                                    Rating
                                </label>
                                <Field
                                    type="text"
                                    name="rating"
                                    disabled
                                    className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded 
                                            bg-gray-100 dark:bg-gray-700 
                                            text-gray-500 dark:text-gray-400 
                                            cursor-not-allowed"
                                />
                            </div>

                            {/* Feedback (Disabled) */}
                            <div>
                                <label className="block text-gray-700 dark:text-gray-200 font-medium mb-1">
                                    Feedback
                                </label>
                                <Field
                                    as="textarea"
                                    name="feedback"
                                    disabled
                                    className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded 
                                    bg-gray-100 dark:bg-gray-700 
                                    text-gray-500 dark:text-gray-400 
                                    cursor-not-allowed"
                                />
                            </div>

                            {/* Submit Button */}
                            <div className="text-right flex justify-center">
                                <button
                                    type="submit"
                                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded shadow"
                                >
                                    Submit
                                </button>
                            </div>
                        </Form>

                    )}
                </Formik>
            </div>
        </div>
    );
};

export default ServiceCentreForm;
