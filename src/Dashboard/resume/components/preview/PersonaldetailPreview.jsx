// import React from "react";

// function PersonaldetailPreview({ resumeInfo }) {
//   return (
//     <div>
//       <h2
//         className="text-xl font-bold text-center"
//         style={{
//           color: resumeInfo?.themeColor,
//         }}
//       >
//         {resumeInfo?.firstName} {resumeInfo?.lastName}
//       </h2>
//       <h2
//         className="font-medium text-center text-em"
//         style={{
//           color: resumeInfo?.themeColor,
//         }}
//       >
//         {resumeInfo?.jobTitle}
//       </h2>

//       <h2
//         className="text-xs font-normal text-center"
//         style={{
//           color: resumeInfo?.themeColor,
//         }}
//       >
//         {resumeInfo?.address}
//       </h2>
//       <div className="flex justify-between">
//         <h2 className="text-xs font-normal" 
//          style={{
//             color: resumeInfo?.themeColor,
//           }}
//         >{resumeInfo?.phone}</h2>
//         <h2 className="text-xs font-normal"
//          style={{
//             color: resumeInfo?.themeColor,
//           }}
//         >{resumeInfo?.email}</h2>


//       </div>
//       <hr className="border-[1.5px] my-2" 
//          style={{
//             borderColor: resumeInfo?.themeColor,
//           }}
//       />

//     </div>
//   );
// }

// export default PersonaldetailPreview;
function PersonaldetailPreview({ resumeInfo }) {
  const themeColor = resumeInfo?.themeColor || "#000"; // Fallback to black

  return (
    <div>
      <h2 className="text-xl font-bold text-center" style={{ color: themeColor }}>
        {resumeInfo?.firstName} {resumeInfo?.lastName}
      </h2>
      <h2 className="font-medium text-center" style={{ color: themeColor }}>
        {resumeInfo?.jobTitle}
      </h2>
      <h2 className="text-xs font-normal text-center" style={{ color: themeColor }}>
        {resumeInfo?.address}
      </h2>
      <div className="flex justify-between">
        <h2 className="text-xs font-normal" style={{ color: themeColor }}>
          {resumeInfo?.phone}
        </h2>
        <h2 className="text-xs font-normal" style={{ color: themeColor }}>
          {resumeInfo?.email}
        </h2>
      </div>
      <hr className="border-[1.5px] my-2" style={{ borderColor: themeColor }} />
    </div>
  );
}

export default PersonaldetailPreview;
