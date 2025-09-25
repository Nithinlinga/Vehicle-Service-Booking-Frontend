import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { updateSkills } from "../../../store/mechanicSlice";
import { useNavigate } from "react-router-dom";
import MechanicSkill from "../../services/MechanicSkill";
import { toast } from "react-hot-toast";

const EditSkills = () => {
  const { isAuthenticated, user } = useSelector((state) => state.auth); 

  const [skillInput, setSkillInput] = useState("");
  // Local state for the list of skills
  const [skillList, setSkillList] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (user && user.id) {
      MechanicSkill.getAllSkills(user.id)
        .then((response) => {
          const fetchedSkills = response.data.map(skill => skill.skill_name);
          // 1. Update local state
          setSkillList(fetchedSkills);
          // 2. Also update Redux store
          dispatch(updateSkills(fetchedSkills));
        })
        .catch((error) => {
          console.error("Error fetching mechanic skills:", error);
        });
    }
  }, [user, dispatch]);

  const addSkill = () => {
    if (skillInput.trim()) {
      const newSkillData = {
        skill_id: user.id, // Ensure your API handles this correctly
        skill_name: skillInput.trim()
      };
      // ⚠️ Add to database first
      MechanicSkill.addSkill(newSkillData)
        .then((res) => {
          // ✅ If successful, then update the local state and Redux store
          const updatedList = [...skillList, skillInput.trim()];
          setSkillList(updatedList);
          dispatch(updateSkills(updatedList));
          setSkillInput(""); // Clear input on success
          toast.success("Skill added successfully");
          console.log(res);
        })
        .catch((err) => {
          console.error("Error adding skill:", err);
          toast.error("Failed to add skill.");
        });
    }
  };

  const removeSkill = (index) => {
    const skillToDelete = skillList[index];
    // ⚠️ Delete from database first
    MechanicSkill.deleteSkillByName(skillToDelete)
      .then((res) => {
        // ✅ If successful, then update the local state and Redux store
        const updatedList = skillList.filter((_, i) => i !== index);
        setSkillList(updatedList);
        dispatch(updateSkills(updatedList));
        toast.success("Skill removed successfully");
        console.log(res);
      })
      .catch((err) => {
        console.error("Error removing skill:", err);
        toast.error("Failed to remove skill.");
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // The Redux state is already updated in addSkill/removeSkill,
    // so just navigate
    navigate("/mechanic/profile");
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-slate-900 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-2xl bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-8 border border-gray-200 dark:border-slate-700 transition-all duration-300">
        <h2 className="text-3xl font-bold text-purple-700 dark:text-purple-300 mb-6 text-center">
          Update Your Skills
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Input + Add Button */}
          <div className="flex gap-3">
            <input
              type="text"
              placeholder="Add a new skill"
              value={skillInput}
              onChange={(e) => setSkillInput(e.target.value)}
              className="flex-1 px-4 py-3 border border-purple-300 dark:border-purple-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400 bg-white dark:bg-slate-700 text-slate-800 dark:text-slate-100 placeholder-gray-400 dark:placeholder-slate-400"
            />
            <button
              type="button"
              onClick={addSkill}
              className="px-5 py-3 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 dark:hover:bg-purple-500 transition"
            >
              Add
            </button>
          </div>

          {/* Skill List */}
          <div className="space-y-3">
            {skillList.length === 0 ? (
              <p className="text-gray-500 dark:text-slate-400 text-center">No skills added yet.</p>
            ) : (
              <ul className="space-y-2">
                {skillList.map((skill, index) => (
                  <li
                    key={index}
                    className="flex justify-between items-center bg-purple-100 dark:bg-slate-700 px-4 py-2 rounded-lg border border-purple-200 dark:border-purple-600"
                  >
                    <span className="text-purple-800 dark:text-purple-300 font-medium">{skill}</span>
                    <button
                      type="button"
                      onClick={() => removeSkill(index)}
                      className="text-red-400 hover:text-red-700 dark:hover:text-red-500 dark:font-bold"
                    >
                      Remove
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Submit Button */}
          <div className="text-center">
            <button
              type="submit"
              className="px-6 py-3 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 dark:hover:bg-purple-500 transition"
            >
              Save Skills
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditSkills;