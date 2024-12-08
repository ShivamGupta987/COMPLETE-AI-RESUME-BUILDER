// import React from "react";

// // function EducationPreview({resumeInfo}) {
// //   return (
// //     <div className="my-6">
// //       <h2
// //         className="mb-2 text-sm font-bold text-center"
// //         style={{
// //           color: resumeInfo?.themeColor,
// //         }}
// //       >
// //         Education
// //       </h2>
// //       <hr style={{ borderColor: resumeInfo?.themeColor }} />


// //         {resumeInfo?.education.map((education,index)=>(
// //             <div key={index} className="my-5">
// //                 <h2 className="text-sm font-bold"
// //                  style={{
// //                     color: resumeInfo?.themeColor,
// //                   }}
// //                 >{education?.universityName}</h2>
// //                 <h2 className="flex justify-between text-xs">{education?.degree} in {education?.major}
// //                 <span>{education?.startDate} - {education?.endDate}</span>
// //                 </h2 >
// //                 <p className="my-2 text-xs">{education?.description}</p>

// //             </div>

// //         ))}

// //     </div>
// //   );
// // }

// // export default EducationPreview;
// function EducationPreview({ resumeInfo }) {
//   const themeColor = resumeInfo?.themeColor || "#000"; // Fallback to black if themeColor is undefined

//   return (
//     <div className="my-6">
//       <h2 className="mb-2 text-sm font-bold text-center" style={{ color: themeColor }}>
//         Education
//       </h2>
//       <hr style={{ borderColor: themeColor }} />

//       {resumeInfo?.education.map((education, index) => (
//         <div key={index} className="my-5">
//           <h2 className="text-sm font-bold" style={{ color: themeColor }}>
//             {education?.universityName}
//           </h2>
//           <h2 className="flex justify-between text-xs">
//             {education?.degree} in {education?.major}
//             <span>{education?.startDate} - {education?.endDate}</span>
//           </h2>
//           <p className="my-2 text-xs">{education?.description}</p>
//         </div>
//       ))}
//     </div>
//   );
// }

// export default EducationPreview;
function EducationPreview({ resumeInfo }) {
  const themeColor = resumeInfo?.themeColor || "#000"; // Fallback to black if themeColor is undefined

  return (
    <div className="my-6">
      <h2 className="mb-2 text-sm font-bold text-center" style={{ color: themeColor }}>
        Education
      </h2>
      <hr style={{ borderColor: themeColor }} />

      {resumeInfo?.education?.length > 0 ? (
        resumeInfo.education.map((education, index) => (
          <div key={index} className="my-5">
            <h2 className="text-sm font-bold" style={{ color: themeColor }}>
              {education?.universityName || "N/A"}
            </h2>
            <h2 className="flex justify-between text-xs">
              {education?.degree || "N/A"} in {education?.major || "N/A"}
              <span>{education?.startDate || "N/A"} - {education?.endDate || "N/A"}</span>
            </h2>
            <p className="my-2 text-xs">{education?.description || "N/A"}</p>
          </div>
        ))
      ) : (
        <p className="text-sm text-center">No education details available.</p>
      )}
    </div>
  );
}

export default EducationPreview;
