import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import { Input } from "@/components/ui/input";
import React, { useContext, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useParams } from "react-router-dom";
import GlobalApi from "./../../../../../Service/GlobalApi";
import { LoaderCircle } from "lucide-react";
import { toast } from "sonner";


function PersonalDetails({ enableNext }) {
  const params = useParams();

  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    console.log(params);
  }, [params]);

  const handleInputChange = (e) => {
    enableNext(false);
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    setResumeInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const onSave = (e) => {
    // Prevent screen refresh
    e.preventDefault();
    setLoading(true);
    const data = { data: formData };
    
    
    // Ensure `resumeId` exists before making the API request
    if (params?.resumeId) {
      GlobalApi.UpdateResumeDetail(params.resumeId, data)
        .then((resp) => {
          console.log("Response:", resp); 
          enableNext(true); // Enable the "Next" button after successful save
          setLoading(false); // Stop the loading spinner
          toast.success("Details updated successfully"); // Notify user
        })
        .catch((error) => {
          console.error("Error updating resume:", error); // Log the error
          setLoading(false); // Stop the loading spinner
          toast.error("Error updating details"); 
        });
    } else {
      console.error("Resume ID is missing.");
      setLoading(false);
      toast.error("Resume ID is missing.");
    }
  };

  return (
    <div className="p-5 mt-10 border-t-4 rounded-lg shadow-lg border-t-primary">
      <h2 className="text-lg font-bold">Personal Detail</h2>
      <p>Get Started With basic information</p>

      <form onSubmit={onSave}>
        <div className="grid grid-cols-2 gap-3 mt-5">
          <div>
            <label className="text-sm">First Name</label>
            <Input
              name="firstName"
              defaultValue={resumeInfo.firstName}
              value={resumeInfo.firstName}
              required
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label className="text-sm">Last Name</label>
            <Input
              name="lastName"
              defaultValue={resumeInfo.lastName}
              value={resumeInfo.lastName}
              required
              onChange={handleInputChange}
            />
          </div>

          <div className="col-span-2">
            <label className="text-sm">Job Title</label>
            <Input
              name="jobTitle"
              defaultValue={resumeInfo.jobTitle}
              value={resumeInfo.jobTitle}
              required
              onChange={handleInputChange}
            />
          </div>

          <div className="col-span-2">
            <label className="text-sm">Address</label>
            <Input
              name="address"
              defaultValue={resumeInfo.address}
              value={resumeInfo.address}
              required
              onChange={handleInputChange}
            />
          </div>

          <div>
            <label className="text-sm">Phone</label>
            <Input
              name="phone"
              defaultValue={resumeInfo.phone}
              value={resumeInfo.phone}
              required
              onChange={handleInputChange}
            />
          </div>

          <div>
            <label className="text-sm">Email</label>
            <Input
              name="email"
              defaultValue={resumeInfo.email}
              value={resumeInfo.email}
              required
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className="flex justify-end mt-3">
          <Button type="submit"
          disabled ={loading}
          
          >{loading?<LoaderCircle className="animate-spin" />:"Save Changes"}</Button>

        </div>
      </form>
    </div>
  );
}

export default PersonalDetails;
