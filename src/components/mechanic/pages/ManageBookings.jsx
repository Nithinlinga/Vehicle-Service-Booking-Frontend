import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import BookingServices from "../../services/BookingServices";
import { toast } from 'react-hot-toast';
import MechanicServices from "../../services/MechanicServices";

const ManageBookings = () => {
    const { user } = useSelector((state) => state.auth);

    const [appointments, setAppointments] = useState([]);
    const [upcoming, setUpcoming] = useState([]);
    const [previous, setPrevious] = useState([]);
    const [cancelled, setCancelled] = useState([]);
    const [missed, setMissed] = useState([]);
    const [activeTab, setActiveTab] = useState("UPCOMING");

    const fetchAppointments = async () => {
        try {
            const mechanicResp = await MechanicServices.getMechanic(user.id);
            const response = await BookingServices.getBookingByCenterId(mechanicResp.data.centerId);
            setAppointments(response.data)
        } catch (error) {
            console.error("Error fetching appointments:", error);
            toast.error("Failed to load appointments.");
        }
    };

    useEffect(() => {
        if (user?.id && user?.role) {
            fetchAppointments();
        }
    }, [user]);

    useEffect(() => {
        const now = new Date();

        setUpcoming(
            appointments.filter((a) => {
                if (a.status !== "UPCOMING" || a.isVerified  !== "YES") return false;

                const bookingDateTime = new Date(`${a.bookingDate.split("T")[0]}T${a.timeslot}`);
                return bookingDateTime >= now; // only future upcoming
            })
        );

        setPrevious(appointments.filter((a) => a.status === "COMPLETED"));

        setCancelled(appointments.filter((a) => a.status === "CANCELLED"));

        setMissed(
            appointments.filter((a) => {
                const bookingDateTime = new Date(`${a.bookingDate.split("T")[0]}T${a.timeslot}`);

                return a.status === "UPCOMING" && bookingDateTime < now;
            })
        );
    }, [appointments]);


    const handleCompleted = async (id) => {
        try {
            const confirmed = globalThis.confirm("Are you sure you want to delete this Booking?");
            if (confirmed) {
                await BookingServices.updateBookingStatusById(id, "COMPLETED");
                toast.success("Booking Updated Successfully");
                fetchAppointments();
            }
        } catch (error) {
            console.error("Error deleting booking:", error);
            toast.error("Failed to delete booking.");
        }
    };

    // 👇 Helper to render appointments based on active tab
    const renderAppointments = (list, label, badgeColor) => {
        if (list.length === 0) {
            return <div className=" w-full  max-w-4xl bg-white dark:bg-gray-800 rounded-2xl shadow-2xl  h-[300px] overflow-y-auto flex justify-center">No {label} appointments.</div>;
        }
        return (
            <div className="space-y-4">
                {list.map((a) => (
                    <div
                        key={a.bookingId}
                        className="rounded-xl border-l-4 border-teal-500 bg-teal-50 dark:bg-teal-900/30 p-5 shadow flex flex-col md:flex-row md:items-center md:justify-between"
                    >
                        <div>
                            <div className="font-bold text-lg text-teal-800 dark:text-teal-200">
                                {a.vehicleName || a.vehicle}
                            </div>
                            <div className="text-gray-700 dark:text-gray-200">
                                <span className="font-semibold">Vehicle Registration number:</span> {a.registrationNumber}
                            </div>
                            <div className="text-gray-700 dark:text-gray-200">
                                <span className="font-semibold">Vehicle Type:</span> {a.vehicleType}
                            </div>
                            <div className="text-gray-700 dark:text-gray-200">
                                <span className="font-semibold">Service Center Name:</span> {a.centerName}
                            </div>
                            <div className="text-gray-700 dark:text-gray-200">
                                <span className="font-semibold">Date:</span> {a.bookingDate?.split("T")[0]} &nbsp;
                                <span className="font-semibold">Time:</span> {a.timeslot}
                            </div>
                            <div className="text-gray-700 dark:text-gray-200">
                                <span className="font-semibold">Verified:</span> {a.isVerified}
                            </div>
                        </div>
                        <div className="mt-3 md:mt-0 flex items-center flex-col gap-2">
                            <span className={`inline-block px-4 py-1 rounded-full ${badgeColor} text-white font-semibold text-sm mb-2`}>
                                {label}
                            </span>
                            {label === "Upcoming" && (
                                <button
                                    onClick={() => handleCompleted(a.bookingId)}
                                    className="bg-red-400 cursor-pointer hover:bg-red-600 text-white font-bold py-2 px-3 rounded-full shadow"
                                >
                                    Mark As Completed
                                </button>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        );
    };

    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-cyan-100 via-white to-teal-100 dark:from-gray-900 dark:via-gray-800 dark:to-teal-900 py-10">
            <div className="w-full m-2 max-w-4xl bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-10">
                <h2 className="text-3xl font-extrabold text-teal-700 dark:text-teal-300 mb-8 text-center">
                    All Appointments
                </h2>

                {/* 👇 Tabs */}
                <div className="flex justify-center mb-6 space-x-4">
                    <button
                        onClick={() => setActiveTab("UPCOMING")}
                        className={`px-4 py-2 rounded-full font-semibold ${activeTab === "UPCOMING" ? "bg-teal-600 text-white" : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                            }`}
                    >
                        Upcoming
                    </button>
                    <button
                        onClick={() => setActiveTab("COMPLETED")}
                        className={`px-4 py-2 rounded-full font-semibold ${activeTab === "COMPLETED" ? "bg-teal-600 text-white" : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                            }`}
                    >
                        Completed
                    </button>
                    <button
                        onClick={() => setActiveTab("CANCELLED")}
                        className={`px-4 py-2 rounded-full font-semibold ${activeTab === "CANCELLED" ? "bg-teal-600 text-white" : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                            }`}
                    >
                        Cancelled
                    </button>
                    <button
                        onClick={() => setActiveTab("MISSED")}
                        className={`px-4 py-2 rounded-full font-semibold ${activeTab === "MISSED" ? "bg-teal-600 text-white" : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                            }`}
                    >
                        Missed
                    </button>
                </div>

                {/* 👇 Render based on active tab */}
                {activeTab === "UPCOMING" && renderAppointments(upcoming, "Upcoming", "bg-teal-600")}
                {activeTab === "COMPLETED" && renderAppointments(previous, "Completed", "bg-green-400")}
                {activeTab === "CANCELLED" && renderAppointments(cancelled, "Cancelled", "bg-red-500")}
                {activeTab === "MISSED" && renderAppointments(missed, "Missed", "bg-red-500")}
            </div>
        </div>
    );
};

export default ManageBookings;