// import { Input } from "@/components/ui/input";
// import React, { useEffect, useState, useContext } from "react";
// import { Rating } from "@smastrom/react-rating";
// import "@smastrom/react-rating/style.css";
// import { Button } from "@/components/ui/button";
// import { LoaderCircle } from "lucide-react";
// import { ResumeInfoContext } from "@/context/ResumeInfoContext";
// import { useParams } from "react-router-dom";
// import GlobalApi from "./../../../../../Service/GlobalApi";
// import { toast } from "sonner";

// const Skills = () => {
//   const [loading, setLoading] = useState(false);
//   const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
//   const { resumeId } = useParams();

//   // Initialize skillsList as an empty array to avoid map errors
//   const [skillsList, setSkillsList] = useState(resumeInfo?.skillsList || [{ name: "", rating: 0 }]);

//   // Load initial skills data when resumeInfo updates
//   useEffect(() => {
//     if (resumeInfo?.skillsList) {
//       setSkillsList(resumeInfo.skillsList);
//     }
//   }, [resumeInfo]);

//   const handleChange = (index, name, value) => {
//     const newEntries = skillsList.slice();
//     newEntries[index][name] = value;
//     setSkillsList(newEntries);
//   };

//   const addNewSkills = () => {
//     setSkillsList([...skillsList, { name: "", rating: 0 }]);
//   };

//   const removeNewSkills = () => {
//     if (skillsList.length > 1) {
//       setSkillsList(skillsList.slice(0, -1));
//     }
//   };

//   const onSave = () => {
//     setLoading(true);
//     const data = { data: { skills: skillsList.map(({ id, ...rest }) => rest) } };
//     GlobalApi.UpdateResumeDetail(resumeId, data)
//       .then((resp) => {
//         console.log(resp);
//         setLoading(false);
//         toast('Details updated');
//       })
//       .catch((error) => {
//         setLoading(false);
//         toast('Error updating details');
//       });
//   };

//   useEffect(() => {
//     setResumeInfo({ ...resumeInfo, skills: skillsList });
//   }, [skillsList]);

//   return (
//     <div className="p-5 mt-10 bg-white border-t-4 rounded-lg shadow-lg border-t-primary">
//       <h2 className="text-lg font-bold text-gray-800">Skills</h2>
//       <p className="text-gray-600">Add Your Top Professional Skills</p>
//       <div className="mt-4 space-y-4">
//         {skillsList.map((item, index) => (
//           <div key={index} className="flex justify-between mb-2 space-y-2 border rounded-lg">
//             <div>
//               <label className="text-xs text-gray-700">Name</label>
//               <Input
//                 name="name"
//                 value={item.name}
//                 onChange={(e) => handleChange(index, "name", e.target.value)}
//                 className="w-full p-2 border rounded-md"
//               />
//             </div>
//             <div>
//               <label className="text-xs text-gray-700">Rating</label>
//               <Rating
//                 style={{ maxWidth: 120 }}
//                 value={item.rating}
//                 onChange={(v) => handleChange(index, "rating", v)}
//               />
//             </div>
//           </div>
//         ))}
//       </div>
//       <div className="flex items-center justify-between mt-4">
//         <div className="flex gap-3">
//           <Button
//             variant="outline"
//             className="text-primary"
//             onClick={addNewSkills}
//           >
//             + Add New Skills
//           </Button>
//           <Button
//             variant="outline"
//             className="text-primary"
//             onClick={removeNewSkills}
//             disabled={skillsList.length <= 1}
//           >
//             - Remove
//           </Button>
//         </div>
//         <Button disabled={loading} onClick={onSave}>
//           {loading ? <LoaderCircle className="animate-spin" /> : "Save"}
//         </Button>
//       </div>
//     </div>
//   );
// };

// export default Skills;


import { Input } from "@/components/ui/input";
import React, { useEffect, useState, useContext } from "react";
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import { Button } from "@/components/ui/button";
import { LoaderCircle } from "lucide-react";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import { useParams } from "react-router-dom";
import GlobalApi from "./../../../../../Service/GlobalApi";
import { toast } from "sonner";

const Skills = () => {
  const [loading, setLoading] = useState(false);
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  const { resumeId } = useParams();

  // Initialize skillsList from resumeInfo or as an empty array
  const [skillsList, setSkillsList] = useState(resumeInfo?.skills || [{ name: "", rating: 0 }]);

  // Synchronize skillsList with resumeInfo when resumeInfo updates
  useEffect(() => {
    if (resumeInfo?.skills) {
      setSkillsList(resumeInfo.skills);
    }
  }, [resumeInfo]);

  const handleChange = (index, name, value) => {
    const updatedSkills = [...skillsList];
    updatedSkills[index][name] = value;
    setSkillsList(updatedSkills);
  };

  const addNewSkill = () => {
    setSkillsList([...skillsList, { name: "", rating: 0 }]);
  };

  const removeSkill = () => {
    if (skillsList.length > 1) {
      setSkillsList(skillsList.slice(0, -1));
    }
  };

  const onSave = () => {
    setLoading(true);
    const data = {
      data: {
        skills: skillsList.map(({ id, ...rest }) => rest),
      },
    };
    
    GlobalApi.UpdateResumeDetail(resumeId, data)
      .then((resp) => {
        setLoading(false);
        toast("Details updated!");
      })
      .catch((error) => {
        setLoading(false);
        toast("Error updating details");
      });
  };

  // Update resumeInfo context whenever skillsList changes
  useEffect(() => {
    setResumeInfo((prev) => ({
      ...prev,
      skills: skillsList,
    }));
  }, [skillsList]);

  return (
    <div className="p-5 mt-10 bg-white border-t-4 rounded-lg shadow-lg border-t-primary">
      <h2 className="text-lg font-bold text-gray-800">Skills</h2>
      <p className="text-gray-600">Add Your Top Professional Skills</p>
      <div className="mt-4 space-y-4">
        {skillsList.map((item, index) => (
          <div key={index} className="flex justify-between p-3 mb-2 space-y-2 border rounded-lg">
            <div>
              <label className="text-xs text-gray-700">Name</label>
              <Input
                name="name"
                value={item.name}
                onChange={(e) => handleChange(index, "name", e.target.value)}
                className="w-full p-2 border rounded-md"
              />
            </div>
            <div>
              <label className="text-xs text-gray-700">Rating</label>
              <Rating
                style={{ maxWidth: 120 }}
                value={item.rating}
                onChange={(v) => handleChange(index, "rating", v)}
              />
            </div>
          </div>
        ))}
      </div>
      <div className="flex items-center justify-between mt-4">
        <div className="flex gap-3">
          <Button variant="outline" className="text-primary" onClick={addNewSkill}>
            + Add New Skill
          </Button>
          <Button
            variant="outline"
            className="text-primary"
            onClick={removeSkill}
            disabled={skillsList.length <= 1}
          >
            - Remove
          </Button>
        </div>
        <Button disabled={loading} onClick={onSave}>
          {loading ? <LoaderCircle className="animate-spin" /> : "Save"}
        </Button>
      </div>
    </div>
  );
};

export default Skills;
