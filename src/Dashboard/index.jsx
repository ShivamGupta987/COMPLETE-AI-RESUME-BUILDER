import React, { useEffect, useState } from 'react'
import AddResume from './components/AddResume'
import { useUser } from '@clerk/clerk-react'
import GlobalApi from './../../Service/GlobalApi';
import ResumeCardItem from './components/ResumeCardItem';

const Dashboard = () => {

  const {user} = useUser();

  const [resumeList,setResumeList] = useState([])

  useEffect(()=>{
    user&&GetResumesList()

  },[user])

// used to get user resume list
  const GetResumesList=()=>{
    GlobalApi.GetUserResume(user?.primaryEmailAddress?.emailAddress)
    .then(resp=>{
    
      setResumeList(resp.data.data);
    })
    
  }
  return (
  
      <div className='p-10 md:px-20 lg:px-32'>
        <h2 className='text-3xl font-bold'>My Resume</h2>
        <p>Start Creating AI resume to your next Job role</p>
        <div className='grid grid-cols-2 gap-5 mt-10 md:grid-cols-3 lg:grid-cols-5 '>
          <AddResume/>
          {resumeList.length>0?resumeList.map((resume,index)=>(
            <ResumeCardItem resume={resume} key={index} refreshData={GetResumesList} />
          )):
          [1,2,3,4].map((item,index)=>(
            <div className='h-[280px] rounded-lg bg-slate-200 animate-pulse'>
            </div>
          ))
          }
        </div>
      </div>
    )
  
}

export default Dashboard
