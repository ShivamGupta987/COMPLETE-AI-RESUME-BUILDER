// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";
// import { ResumeInfoContext } from "@/context/ResumeInfoContext";
// import { LoaderCircle } from "lucide-react";
// import React, { useContext, useEffect, useState, useRef } from "react";
// import { useParams } from "react-router-dom";
// import GlobalApi from "./../../../../../Service/GlobalApi";
// import { toast } from "sonner";

// const Education = () => {
//   const [loading, setLoading] = useState(false);
//   const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
//   const params = useParams();
//   const isMounted = useRef(false); // Track if component has mounted
//   const educationalListRef = useRef(null); // Reference to avoid re-renders

//   const [educationalList, setEducationalList] = useState([
//     {
//       universityName: "",
//       degree: "",
//       major: "",
//       startDate: "",
//       endDate: "",
//       description: "",
//     },
//   ]);

//   // Load initial education data only once
//   useEffect(() => {
//     if (!isMounted.current && resumeInfo?.education?.length) {
//       setEducationalList(resumeInfo.education);
//       educationalListRef.current = resumeInfo.education;
//       isMounted.current = true;
//     }
//   }, [resumeInfo]);

//   const handleChange = (index, event) => {
//     const { name, value } = event.target;
//     const updatedList = [...educationalList];
//     updatedList[index][name] = value;
//     setEducationalList(updatedList);
//     educationalListRef.current = updatedList; // Sync ref to avoid re-renders
//   };

//   const addEducation = () => {
//     setEducationalList([
//       ...educationalList,
//       {
//         universityName: "",
//         degree: "",
//         major: "",
//         startDate: "",
//         endDate: "",
//         description: "",
//       },
//     ]);
//   };

//   const removeEducation = () => {
//     if (educationalList.length > 1) {
//       const updatedList = educationalList.slice(0, -1);
//       setEducationalList(updatedList);
//       educationalListRef.current = updatedList;
//     }
//   };

//   const onSave = () => {
//     setLoading(true);
//     const data = { data: { education: educationalList.map(({ id, ...rest }) => rest) } };

//     GlobalApi.UpdateResumeDetail(params.resumeId, data)
//       .then(() => {
//         setLoading(false);
//         toast("Details updated");
//       })
//       .catch(() => {
//         setLoading(false);
//         toast("Error updating details");
//       });
//   };

//   // Only update resumeInfo when educationalList changes after mounting
//   useEffect(() => {
//     if (isMounted.current && JSON.stringify(educationalListRef.current) !== JSON.stringify(educationalList)) {
//       setResumeInfo((prevInfo) => ({
//         ...prevInfo,
//         education: educationalList,
//       }));
//       educationalListRef.current = educationalList; // Sync ref to prevent repeated updates
//     }
//   }, [educationalList, setResumeInfo]);

//   return (
//     <div className="p-6 mt-10 border-t-4 rounded-lg shadow-lg border-t-primary">
//       <h2 className="mb-2 text-lg font-bold">Education</h2>
//       <p className="mb-4">Add Your Education details</p>

//       {educationalList.map((item, index) => (
//         <div key={index} className="mb-6">
//           <div className="grid grid-cols-1 gap-4 mb-4 md:grid-cols-2">
//             <div>
//               <label className="block text-sm font-medium text-gray-700">University Name</label>
//               <Input
//                 name="universityName"
//                 value={item.universityName}
//                 onChange={(e) => handleChange(index, e)}
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-700">Degree</label>
//               <Input
//                 name="degree"
//                 value={item.degree}
//                 onChange={(e) => handleChange(index, e)}
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-700">Major</label>
//               <Input
//                 name="major"
//                 value={item.major}
//                 onChange={(e) => handleChange(index, e)}
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-700">Start Date</label>
//               <Input
//                 type="date"
//                 name="startDate"
//                 value={item.startDate}
//                 onChange={(e) => handleChange(index, e)}
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-700">End Date</label>
//               <Input
//                 type="date"
//                 name="endDate"
//                 value={item.endDate}
//                 onChange={(e) => handleChange(index, e)}
//               />
//             </div>
//             <div className="col-span-2">
//               <label className="block text-sm font-medium text-gray-700">Description</label>
//               <Textarea
//                 name="description"
//                 value={item.description}
//                 onChange={(e) => handleChange(index, e)}
//               />
//             </div>
//           </div>
//         </div>
//       ))}

//       <div className="flex items-center justify-between mt-4">
//         <div className="flex gap-3">
//           <Button variant="outline" className="text-primary" onClick={addEducation}>
//             + Add More Education
//           </Button>
//           <Button
//             variant="outline"
//             className="text-primary"
//             onClick={removeEducation}
//             disabled={educationalList.length <= 1}
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

// export default Education;

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import { LoaderCircle } from "lucide-react";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import GlobalApi from "./../../../../../Service/GlobalApi";
import { toast } from "sonner";

const Education = () => {
  const [loading, setLoading] = useState(false);
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  const params = useParams();

  const [educationalList, setEducationalList] = useState([
    {
      universityName: "",
      degree: "",
      major: "",
      startDate: "",
      endDate: "",
      description: "",
    },
  ]);

  // Initialize education data if available
  useEffect(() => {
    if (resumeInfo?.education?.length) {
      setEducationalList(resumeInfo.education);
    }
  }, [resumeInfo]);

  const handleChange = (index, event) => {
    const { name, value } = event.target;
    const updatedList = [...educationalList];
    updatedList[index][name] = value;
    setEducationalList(updatedList);

    // Update resumeInfo for live changes
    setResumeInfo((prevInfo) => ({
      ...prevInfo,
      education: updatedList,
    }));
  };

  const addEducation = () => {
    setEducationalList([
      ...educationalList,
      {
        universityName: "",
        degree: "",
        major: "",
        startDate: "",
        endDate: "",
        description: "",
      },
    ]);
  };

  const removeEducation = () => {
    if (educationalList.length > 1) {
      const updatedList = educationalList.slice(0, -1);
      setEducationalList(updatedList);
      setResumeInfo((prevInfo) => ({
        ...prevInfo,
        education: updatedList,
      }));
    }
  };

  const onSave = () => {
    setLoading(true);
    const data = { data: { education: educationalList } };

    GlobalApi.UpdateResumeDetail(params.resumeId, data)
      .then(() => {
        setLoading(false);
        toast("Details updated");
      })
      .catch(() => {
        setLoading(false);
        toast("Error updating details");
      });
  };

  return (
    <div className="p-6 mt-10 border-t-4 rounded-lg shadow-lg border-t-primary">
      <h2 className="mb-2 text-lg font-bold">Education</h2>
      <p className="mb-4">Add Your Education details</p>

      {educationalList.map((item, index) => (
        <div key={index} className="mb-6">
          <div className="grid grid-cols-1 gap-4 mb-4 md:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-gray-700">University Name</label>
              <Input
                name="universityName"
                value={item.universityName}
                onChange={(e) => handleChange(index, e)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Degree</label>
              <Input
                name="degree"
                value={item.degree}
                onChange={(e) => handleChange(index, e)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Major</label>
              <Input
                name="major"
                value={item.major}
                onChange={(e) => handleChange(index, e)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Start Date</label>
              <Input
                type="date"
                name="startDate"
                value={item.startDate}
                onChange={(e) => handleChange(index, e)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">End Date</label>
              <Input
                type="date"
                name="endDate"
                value={item.endDate}
                onChange={(e) => handleChange(index, e)}
              />
            </div>
            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700">Description</label>
              <Textarea
                name="description"
                value={item.description}
                onChange={(e) => handleChange(index, e)}
              />
            </div>
          </div>
        </div>
      ))}

      <div className="flex items-center justify-between mt-4">
        <div className="flex gap-3">
          <Button variant="outline" className="text-primary" onClick={addEducation}>
            + Add More Education
          </Button>
          <Button
            variant="outline"
            className="text-primary"
            onClick={removeEducation}
            disabled={educationalList.length <= 1}
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

export default Education;
