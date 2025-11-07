import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MechanicServices from "../../services/MechanicServices";
import { toast } from "react-hot-toast";
import { useSelector } from "react-redux";

const EditProfile = () => {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    expertise: "",
    availability: "",
    rating: "",
  });
  
  const [skillInput, setSkillInput] = useState("");
  const [skillList, setSkillList] = useState([]);

  useEffect(() => {
    if (user?.id) {
      MechanicServices.getMechanic(user.id)
        .then((response) => {
          const {
            name,
            phone,
            address,
            expertise,
            availability,
            rating,
            skills,
          } = response.data;
          let parsedSkills = [];
          if (typeof skills === "string") {
            parsedSkills = skills
              .split(",")
              .map((s) => s.trim())
              .filter(Boolean);
          } else if (Array.isArray(skills)) {
            parsedSkills = skills.map((s) =>
              typeof s === "string" ? s : s?.skill_name ?? ""
            ).filter(Boolean);
          }

          setFormData({
            name: name ?? "",
            phone: phone ?? "",
            email: user.email ?? "",
            address: address ?? "",
            expertise: expertise ?? "",
            availability: availability ?? "",
            rating: rating ?? "",
          });

          setSkillList(parsedSkills);
        })
        .catch((error) => {
          console.error("Error fetching mechanic data:", error);
          toast.error("Failed to load profile data.");
        });
    }
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const addSkill = () => {
    const trimmed = skillInput.trim();
    if (!trimmed) return;
    if (skillList.includes(trimmed)) {
      toast.error("Skill already added");
      return;
    }
    setSkillList((prev) => [...prev, trimmed]);
    setSkillInput("");
  };

  const removeSkill = (index) => {
    setSkillList((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const regex = {
      name: /^[a-zA-Z]{2,50}$/,
      phone: /^\d{10}$/,
      address: /^[a-zA-Z0-9\s,.'-]{5,100}$/,
      expertise: /^[a-zA-Z\s]{2,50}$/,
    };

    if (!regex.name.test(formData.name)) {
      toast.error("Invalid name. Should contain only letters, 2 to 50 characters.");
      return;
    }

    if (!regex.phone.test(formData.phone)) {
      toast.error("Invalid phone number. Must be exactly 10 digits.");
      return;
    }

    if (!regex.address.test(formData.address)) {
      toast.error(
        "Invalid address. Must be 5 to 100 characters including letters, numbers, commas, apostrophes, dots, and spaces."
      );
      return;
    }

    if (!regex.expertise.test(formData.expertise)) {
      toast.error("Invalid expertise. Should contain only letters and spaces, 2 to 50 characters.");
      return;
    }

    const payload = {
      ...formData,
      id: user?.id,
      skills: skillList.join(", "),
    };

    MechanicServices.updateMechanic(payload)
      .then(() => {
        toast.success("Profile updated successfully!");
        navigate("/mechanic/profile");
      })
      .catch((err) => {
        console.error("Error updating profile:", err);
        toast.error("Failed to update profile.");
      });
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white dark:bg-slate-800 rounded-lg shadow-xl">
      <h2 className="text-2xl font-bold mb-4 text-cyan-600 dark:text-cyan-400">Edit Profile</h2>
      <form onSubmit={handleSubmit} className="space-y-4">

        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Name</label>
          <input
            id="name"
            name="name"
            type="text"
            placeholder="Enter Name"
            value={formData.name}
            onChange={handleInputChange}
            className="mt-1 w-full p-3 border rounded-lg dark:bg-slate-700 dark:text-white"
            required
          />
        </div>

        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Phone</label>
          <input
            id="phone"
            name="phone"
            type="text"
            placeholder="Enter Phone Number"
            value={formData.phone}
            onChange={handleInputChange}
            className="mt-1 w-full p-3 border rounded-lg dark:bg-slate-700 dark:text-white"
            required
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
          <input
            id="email"
            name="email"
            type="text"
            placeholder="Enter Email Address"
            value={formData.email}
            readOnly
            className="mt-1 w-full p-3 border rounded-lg dark:bg-slate-700 dark:text-white"
          />
        </div>
        <div>
          <label htmlFor="address" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Address</label>
          <input
            id="address"
            name="address"
            type="text"
            placeholder="Enter Address"
            value={formData.address}
            onChange={handleInputChange}
            className="mt-1 w-full p-3 border rounded-lg dark:bg-slate-700 dark:text-white"
            required
          />
        </div>

        <div>
          <label htmlFor="expertise" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Expertise</label>
          <input
            id="expertise"
            name="expertise"
            type="text"
            placeholder="Enter Expertise (e.g., Two-Wheelers, Four-Wheelers)"
            value={formData.expertise}
            onChange={handleInputChange}
            className="mt-1 w-full p-3 border rounded-lg dark:bg-slate-700 dark:text-white"
            required
          />
        </div>

        <div>
          <label htmlFor="availability" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Availability</label>
          <select
            id="availability"
            name="availability"
            value={formData.availability}
            onChange={handleInputChange}
            className="mt-1 w-full p-3 border rounded-lg dark:bg-slate-700 dark:text-white"
          >
            <option value="">Select Availability</option>
            <option value="AVAILABLE">Available</option>
            <option value="UNAVAILABLE">Not Available</option>
            <option value="ONLEAVE">On Leave</option>
          </select>
        </div>

        {/* Rating */}
        <div>
          <label htmlFor="rating" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Rating</label>
          <select
            id="rating"
            name="rating"
            value={formData.rating}
            onChange={handleInputChange}
            className="mt-1 w-full p-3 border rounded-lg dark:bg-slate-700 dark:text-white"
          >
            <option value="">Select Rating</option>
            <option value="EXCELLENT">Excellent</option>
            <option value="GOOD">Good</option>
            <option value="AVERAGE">Average</option>
            <option value="POOR">Poor</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Skills</label>
          <div className="flex gap-3 mb-3">
            <input
              type="text"
              placeholder="Add a new skill"
              value={skillInput}
              onChange={(e) => setSkillInput(e.target.value)}
              className="flex-1 p-3 border rounded-lg dark:bg-slate-700 dark:text-white"
            />
            <button
              type="button"
              onClick={addSkill}
              className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
            >
              Add
            </button>
          </div>

          {skillList.length === 0 ? (
            <p className="text-gray-500 dark:text-gray-400">No skills added yet.</p>
          ) : (
            <ul className="space-y-2">
              {skillList.map((skill, idx) => (
                <li
                  key={idx}
                  className="flex justify-between items-center bg-purple-50 dark:bg-slate-700 p-2 rounded"
                >
                  <span className="text-slate-800 dark:text-slate-200">{skill}</span>
                  <button
                    type="button"
                    onClick={() => removeSkill(idx)}
                    className="text-red-500 hover:text-red-700"
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        <button
          type="submit"
          className="px-6 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 dark:bg-cyan-500 dark:hover:bg-cyan-600"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default EditProfile;
