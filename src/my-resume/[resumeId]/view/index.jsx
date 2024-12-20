
import { Button } from "@/components/ui/button";
import Header from "@/components/ui/custom/Header";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import ResumePreview from "@/Dashboard/resume/components/ResumePreview";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import GlobalApi from "./../../../../Service/GlobalApi";
import { RWebShare } from "react-web-share";
function ViewResume() {

    const [resumeInfo,setResumeInfo]=useState();
    const {resumeId}=useParams();

    useEffect(()=>{
        GetResumeInfo();
    },[resumeId])
    const GetResumeInfo=()=>{
        GlobalApi.GetResumeById(resumeId).then(resp=>{
            console.log(resp.data.data);
            setResumeInfo(resp.data.data);
        })
    }

    const HandleDownload=()=>{
        window.print();
    }

  return (
    <ResumeInfoContext.Provider value={{resumeInfo,setResumeInfo}} >
        <div id="no-print">
        <Header/>

        <div className='mx-10 my-10 md:mx-20 lg:mx-36'>
            <h2 className='text-2xl font-medium text-center'>
                Congrats! Your Ultimate AI generates Resume is ready ! </h2>
                <p className='text-center text-gray-400'>Now you are ready to download your resume and you can share unique 
                    resume url with your friends and family </p>
            <div className='flex justify-between my-10 px-44'>
                <Button onClick={HandleDownload}>Download</Button>
               
                <RWebShare
        data={{
          text: "Hello Everyone, This is my resume please open url to see it",
          url: import.meta.env.VITE_BASE_URL+"/my-resume/"+resumeId+"/view",
          title: resumeInfo?.firstName+" "+resumeInfo?.lastName+" resume",
        }}
        onClick={() => console.log("shared successfully!")}
      > <Button>Share</Button>
      </RWebShare>
            </div>
        </div>
            
        </div>
        <div className='mx-10 my-10 md:mx-20 lg:mx-36'>
        <div id="print-area" >
                <ResumePreview resumeInfo={resumeInfo}/>
            </div>
            </div>
    </ResumeInfoContext.Provider>
  )
}

export default ViewResume