

// function ExperiencePreview({ resumeInfo}) {
//     const themeColor = resumeInfo?.themeColor || "#000"; // Fallback to black
  
//     return (
//       <div className="my-6">
//         <h2 className="mb-2 text-sm font-bold text-center" style={{ color: themeColor }}>
//           Professional Experience
//         </h2>
//         <hr style={{ borderColor: themeColor }} />
  
//         {/* Only map through experiences if they exist */}
//         {resumeInfo?.Experience && resumeInfo.Experience.length > 0 ? (
//           resumeInfo.Experience.map((experience, index) => (
//             <div key={index} className="my-5">
//               <h2 className="text-sm font-bold" style={{ color: themeColor }}>
//                 {experience?.title}
//               </h2>
//               <h2 className="flex justify-between text-xs">
//                 {experience?.companyName}, {experience?.city}, {experience?.state}
//                 <span>
//                   {experience?.startDate} - {experience?.currentlyWorking ? "Present" : experience.endDate}
//                 </span>
//               </h2>
//               <div className="my-2 text-xs">
//                 {Array.isArray(experience?.workSummery) ? (
//                   experience.workSummery.map((summary, idx) => <p key={idx}>{summary}</p>)
//                 ) : (
//                   <div dangerouslySetInnerHTML={{ __html: experience?.workSummery }} />
//                 )}
//               </div>
//             </div>
//           ))
//         ) : (
//           <p className="text-xs text-center text-gray-500">No professional experience available</p>
//         )}
//       </div>
//     );
//   }
  
//   export default ExperiencePreview;
  
import React from "react";

function ExperiencePreview({ resumeInfo }) {
  const themeColor = resumeInfo?.themeColor || "#000"; // Fallback to black

  return (
      <div className="my-6">
          <h2 className="mb-2 text-sm font-bold text-center" style={{ color: themeColor }}>
              Professional Experience
          </h2>
          <hr style={{ borderColor: themeColor }} />

          {resumeInfo?.Experience && resumeInfo.Experience.length > 0 ? (
              resumeInfo.Experience.map((experience, index) => (
                  <div key={index} className="my-5">
                      <h2 className="text-sm font-bold" style={{ color: themeColor }}>
                          {experience?.title || 'Title Placeholder'}
                      </h2>
                      <h2 className="flex justify-between text-xs">
                          {experience?.companyName || 'Company'}, {experience?.city || 'City'}, {experience?.state || 'State'}
                          <span>
                              {experience?.startDate || 'Start Date'} -{' '}
                              {experience?.currentlyWorking ? 'Present' : experience?.endDate || 'End Date'}
                          </span>
                      </h2>
                      <div className="my-2 text-xs">
                          {experience?.workSummery ? (
                              <div dangerouslySetInnerHTML={{ __html: experience.workSummery }} />
                          ) : (
                              <p>No summary provided</p>
                          )}
                      </div>
                  </div>
              ))
          ) : (
              <p className="text-xs text-center text-gray-500">No professional experience available</p>
          )}
      </div>
  );
}

  export default ExperiencePreview;
  
  