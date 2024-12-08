// context/ResumeInfoContext.jsx
import { createContext, useState } from "react";

export const ResumeInfoContext = createContext(null);

export const ResumeInfoProvider = ({ children }) => {
  const [resumeInfo, setResumeInfo] = useState({
    firstName: '',
    lastName: '',
    jobTitle: '',
    address: '',
    phone: '',
    email: '',
    // themeColor: '#000000', // Add default theme color
    // Add any other fields you might have
  
  });

  return (
    <ResumeInfoContext.Provider value={{ resumeInfo, setResumeInfo }}>
      {children}
    </ResumeInfoContext.Provider>
  );
};
