import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { updateSkills } from "../../../store/mechanicSlice";
import { useNavigate } from "react-router-dom";

const EditSkills = () => {
  const skills = useSelector((state) => state.mechanic.skills);
  const [skillInput, setSkillInput] = useState("");
  const [skillList, setSkillList] = useState(skills);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const addSkill = () => {
    if (skillInput.trim()) {
      setSkillList([...skillList, skillInput.trim()]);
      setSkillInput("");
    }
  };

  const removeSkill = (index) => {
    setSkillList(skillList.filter((_, i) => i !== index));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateSkills(skillList));
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
