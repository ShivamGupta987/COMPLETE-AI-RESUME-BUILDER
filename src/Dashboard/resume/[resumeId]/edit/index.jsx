import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import FormSection from '../../components/FormSection';
import ResumePreview from '../../components/ResumePreview';
import { ResumeInfoContext } from '@/context/ResumeInfoContext';
import GlobalApi from './../../../../../Service/GlobalApi';
import dummy from '@/data/dummy';

function EditResume() {
  const { resumeId } = useParams();
  const [resumeInfo, setResumeInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (resumeId) {
      fetchResumeData(resumeId);
    } else {
      setResumeInfo(dummy);
      setIsLoading(false);
    }
  }, [resumeId]);

  const fetchResumeData = async (id) => {
    try {
      const response = await GlobalApi.GetResumeById(id);
      const fetchedData = response.data.data;

      // Merge with dummy data to ensure all properties are available
      setResumeInfo({ ...dummy, ...fetchedData });
    } catch (err) {
      console.error("Error fetching resume data:", err);
      setError("Failed to load resume data.");
      setResumeInfo(dummy); // Fallback to dummy if API call fails
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <ResumeInfoContext.Provider value={{ resumeInfo, setResumeInfo }}>
      <div className="grid grid-cols-1 gap-10 p-10 md:grid-cols-2">
        {/* Form Section */}
        <FormSection />

        {/* Preview Section */}
        <ResumePreview />
      </div>
    </ResumeInfoContext.Provider>
  );
}

export default EditResume;
