
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import React, { useContext, useEffect, useState } from 'react';
import RichTextEditor from '../RichTextEditor';
import { ResumeInfoContext } from '@/context/ResumeInfoContext';
import { useParams } from 'react-router-dom';
import GlobalApi from './../../../../../Service/GlobalApi';
import { toast } from 'sonner';
import { LoaderCircle } from 'lucide-react';

function Experience({Experience}) {
    const [experinceList, setExperinceList] = useState([
        { title: '', companyName: '', city: '', state: '', startDate: '', endDate: '', workSummery: '' },
    ]); 
    const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
    const params = useParams();
    const [loading, setLoading] = useState(false);
    const [updatedList, setUpdatedList] = useState([]);

    // Initialize experience list from resumeInfo if available
    useEffect(() => {
        if (resumeInfo?.Experince?.length > 0) {
            setExperinceList(resumeInfo.Experience);
        } else if (experinceList.length === 0) {
            setExperinceList([{ title: '', companyName: '', city: '', state: '', startDate: '', endDate: '', workSummery: '' }]);
        }
    }, [resumeInfo]);

    // const handleChange = (index, event) => {
    //     const newEntries = [...experinceList];
    //     const { name, value } = event.target;
    //     newEntries[index][name] = value;
    //     setExperinceList(newEntries);
    // };

    const AddNewExperience = () => {
        setExperinceList([
            ...experinceList,
            { title: '', companyName: '', city: '', state: '', startDate: '', endDate: '', workSummery: '' },
        ]);
    };
    // const handleChange = (index, event) => {
    //     const newEntries = [...experinceList];
    //     const { name, value } = event.target;
    //     newEntries[index][name] = value;
    //     setExperinceList(newEntries);
    
    //     // Update the context for real-time sync
    //     setResumeInfo((prev) => ({
    //         ...prev,
    //         Experience: newEntries,
    //     }));
    // };
    
    // const handleRichTextEditor = (value, index) => {
    //     setExperinceList((prevState) => {
    //         const updatedList = [...prevState];
    //         updatedList[index].workSummery = value || ''; // Handle empty value gracefully
    //         return updatedList;
    //     });
    
    //     // Update the context for real-time sync
    //     setResumeInfo((prev) => ({
    //         ...prev,
    //         Experience: experinceList.map((item, i) =>
    //             i === index ? { ...item, workSummery: value || '' } : item
    //         ),
    //     }));
    // };
    const handleChange = (index, event) => {
        const newEntries = [...experinceList];  // Copy state to avoid mutation
        const { name, value } = event.target;
    
        // Ensure the object at the given index exists before trying to access the name property
        if (newEntries[index]) {
            newEntries[index][name] = value;
        } else {
            // Initialize the entry if it doesn't exist
            newEntries[index] = { title: '', companyName: '', city: '', state: '', startDate: '', endDate: '', workSummery: '' };
            newEntries[index][name] = value;
        }
    
        setExperinceList(newEntries);  // Update state
        setResumeInfo((prev) => ({
            ...prev,
            Experience: newEntries,  // Sync with context
        }));
    };
    
    const handleRichTextEditor = (value, index) => {
        setExperinceList((prevState) => {
            const updatedList = [...prevState];  // Create a copy to avoid direct mutation
            updatedList[index] = { ...updatedList[index], workSummery: value || '' };  // Update only workSummery for the specific index
            return updatedList;
        });
    
        setResumeInfo((prev) => ({
            ...prev,
            Experience: prev.Experience.map((item, i) =>
                i === index ? { ...item, workSummery: value || '' } : item
            ),
        }));
    };
    

    const RemoveExperience = () => {
        if (experinceList.length > 1) { // Prevent removing the last entry
            setExperinceList((experinceList) => experinceList.slice(0, -1));
        }
    };

    // const handleRichTextEditor = (value, name, index) => {
    //     // Ensure workSummery is a plain string or sanitized HTML
    //     const newEntries = [...experinceList];
    //     newEntries[index][name] = value || ''; // Handle empty value gracefully
    //     setExperinceList(newEntries);
    // };
    // const handleRichTextEditor = (value, index) => {
    //     setExperinceList((prevState) => {
    //       const updatedList = [...prevState];
    //       updatedList[index].workSummery = value || ''; // Handle empty value gracefully
    //       return updatedList;
    //     });
    //   };
    // Function to sanitize the experience list before sending it to the server
    const sanitizeExperienceList = (experienceList) => {
        return experienceList.map(item => {
            // Ensure that workSummery contains only a serializable string or HTML
            return {
                ...item,
                workSummery: typeof item.workSummery === 'string' ? item.workSummery : '', // Convert to empty string if not a valid string
            };
        });
    };


    const onSave = async () => {
        setResumeInfo((prevResumeInfo) => ({
            ...prevResumeInfo,
            Experience: experinceList,
        }));

        // Sanitize the experience list to avoid circular references or non-serializable objects
        const sanitizedExperienceList = sanitizeExperienceList(experinceList);

        const data = {
            data: {
                experience: sanitizedExperienceList,
            }
        };

        console.log('Sanitized Data payload:', data);

        setLoading(true);
        try {
            const response = await GlobalApi.UpdateResumeDetail(params?.resumeId, data);
            console.log(response);
            toast('Details updated!');
        } catch (error) {
            console.error('Error updating details:', error);
            toast('Error updating details');
        } finally {
            setLoading(false);
        }
    };
   
    return (
        <div>
            <div className='p-5 mt-10 border-t-4 rounded-lg shadow-lg border-t-primary'>
                <h2 className='text-lg font-bold'>Professional Experience</h2>
                <p>Add Your previous Job experience</p>
                <div>
                    {experinceList.map((item, index) => (
                        <div key={index}>
                            <div className='grid grid-cols-2 gap-3 p-3 my-5 border rounded-lg'>
                                <div>
                                    <label className='text-xs'>Position Title</label>
                                    <Input
                                        name="title"
                                        onChange={(event) => handleChange(index, event)}
                                        defaultValue={item?.title}
                                    />
                                </div>
                                <div>
                                    <label className='text-xs'>Company Name</label>
                                    <Input
                                        name="companyName"
                                        onChange={(event) => handleChange(index, event)}
                                        defaultValue={item?.companyName}
                                    />
                                </div>
                                <div>
                                    <label className='text-xs'>City</label>
                                    <Input
                                        name="city"
                                        onChange={(event) => handleChange(index, event)}
                                        defaultValue={item?.city}
                                    />
                                </div>
                                <div>
                                    <label className='text-xs'>State</label>
                                    <Input
                                        name="state"
                                        onChange={(event) => handleChange(index, event)}
                                        defaultValue={item?.state}
                                    />
                                </div>
                                <div>
                                    <label className='text-xs'>Start Date</label>
                                    <Input
                                        type="date"
                                        name="startDate"
                                        onChange={(event) => handleChange(index, event)}
                                        defaultValue={item?.startDate}
                                    />
                                </div>
                                <div>
                                    <label className='text-xs'>End Date</label>
                                    <Input
                                        type="date"
                                        name="endDate"
                                        onChange={(event) => handleChange(index, event)}
                                        defaultValue={item?.endDate}
                                    />
                                </div>
                                <div className='col-span-2'>
                                    <RichTextEditor
                                        index={index}
                                        defaultValue={item?.workSummery}
                                        onRichTextEditorChange={(value) => handleRichTextEditor(value, 'workSummery', index)}
                                    />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className='flex justify-between'>
                    <div className='flex gap-2'>
                        <Button variant="outline" onClick={AddNewExperience} className="text-primary">
                            + Add More Experience
                        </Button>
                        <Button variant="outline" onClick={RemoveExperience} className="text-primary">
                            - Remove
                        </Button>
                    </div>
                    <Button disabled={loading} onClick={onSave}>
                        {loading ? <LoaderCircle className='animate-spin' /> : 'Save'}
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default Experience;


// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import React, { useContext, useEffect, useState } from 'react';
// import RichTextEditor from '../RichTextEditor';
// import { ResumeInfoContext } from '@/context/ResumeInfoContext';
// import { useParams } from 'react-router-dom';
// import GlobalApi from './../../../../../Service/GlobalApi';
// import { toast } from 'sonner';
// import { LoaderCircle } from 'lucide-react';

// function Experience() {
//     const [experienceList, setExperienceList] = useState([
//         { title: '', companyName: '', city: '', state: '', startDate: '', endDate: '', workSummery: '' },
//     ]); 
//     const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
//     const params = useParams();
//     const [loading, setLoading] = useState(false);

//     // Initialize experience list from resumeInfo if available
//     useEffect(() => {
//         if (resumeInfo?.Experince?.length > 0) {
//             setExperienceList(resumeInfo.Experieence);
//         } else if (experienceList.length === 0) {
//             setExperienceList([{ title: '', companyName: '', city: '', state: '', startDate: '', endDate: '', workSummery: '' }]);
//         }
//     }, [resumeInfo]);

//     const handleChange = (index, event) => {
//         const newEntries = [...experienceList];
//         const { name, value } = event.target;
//         newEntries[index][name] = value;
//         setExperienceList(newEntries);
//     };

//     const AddNewExperience = () => {
//         setExperienceList([
//             ...experienceList,
//             { title: '', companyName: '', city: '', state: '', startDate: '', endDate: '', workSummery: '' },
//         ]);
//     };

//     const RemoveExperience = () => {
//         if (experienceList.length > 1) { // Prevent removing the last entry
//             setExperienceList((experienceList) => experienceList.slice(0, -1));
//         }
//     };

//     // const handleRichTextEditor = (value, name, index) => {
//     //     // Ensure workSummery is a plain string or sanitized HTML
//     //     const newEntries = [...experinceList];
//     //     newEntries[index][name] = value || ''; // Handle empty value gracefully
//     //     setExperinceList(newEntries);
//     // };
//     const handleRichTextEditor = (value, index) => {
//         setExperienceList((prevState) => {
//           const updatedList = [...prevState];
//           updatedList[index].workSummery = value || ''; // Handle empty value gracefully
//           return updatedList;
//         });
//       };
//     // Function to sanitize the experience list before sending it to the server
//     const sanitizeExperienceList = (experienceList) => {
//         return experienceList.map(item => {
//             // Ensure that workSummery contains only a serializable string or HTML
//             return {
//                 ...item,
//                 workSummery: typeof item.workSummery === 'string' ? item.workSummery : '', // Convert to empty string if not a valid string
//             };
//         });
//     };


//     const onSave = async () => {
//         setResumeInfo((prevResumeInfo) => ({
//             ...prevResumeInfo,
//             Experience: experienceList,
//         }));

//         // Sanitize the experience list to avoid circular references or non-serializable objects
//         const sanitizedExperienceList = sanitizeExperienceList(experienceList);

//         const data = {
//             data: {
//                 experience: sanitizedExperienceList,
//             }
//         };

//         console.log('Sanitized Data payload:', data);

//         setLoading(true);
//         try {
//             const response = await GlobalApi.UpdateResumeDetail(params?.resumeId, data);
//             console.log(response);
//             toast('Details updated!');
//         } catch (error) {
//             console.error('Error updating details:', error);
//             toast('Error updating details');
//         } finally {
//             setLoading(false);
//         }
//     };
   
//     return (
//         <div>
//             <div className='p-5 mt-10 border-t-4 rounded-lg shadow-lg border-t-primary'>
//                 <h2 className='text-lg font-bold'>Professional Experience</h2>
//                 <p>Add Your previous Job experience</p>
//                 <div>
//                     {experienceList.map((item, index) => (
//                         <div key={index}>
//                             <div className='grid grid-cols-2 gap-3 p-3 my-5 border rounded-lg'>
//                                 <div>
//                                     <label className='text-xs'>Position Title</label>
//                                     <Input
//                                         name="title"
//                                         onChange={(event) => handleChange(index, event)}
//                                         defaultValue={item?.title}
//                                     />
//                                 </div>
//                                 <div>
//                                     <label className='text-xs'>Company Name</label>
//                                     <Input
//                                         name="companyName"
//                                         onChange={(event) => handleChange(index, event)}
//                                         defaultValue={item?.companyName}
//                                     />
//                                 </div>
//                                 <div>
//                                     <label className='text-xs'>City</label>
//                                     <Input
//                                         name="city"
//                                         onChange={(event) => handleChange(index, event)}
//                                         defaultValue={item?.city}
//                                     />
//                                 </div>
//                                 <div>
//                                     <label className='text-xs'>State</label>
//                                     <Input
//                                         name="state"
//                                         onChange={(event) => handleChange(index, event)}
//                                         defaultValue={item?.state}
//                                     />
//                                 </div>
//                                 <div>
//                                     <label className='text-xs'>Start Date</label>
//                                     <Input
//                                         type="date"
//                                         name="startDate"
//                                         onChange={(event) => handleChange(index, event)}
//                                         defaultValue={item?.startDate}
//                                     />
//                                 </div>
//                                 <div>
//                                     <label className='text-xs'>End Date</label>
//                                     <Input
//                                         type="date"
//                                         name="endDate"
//                                         onChange={(event) => handleChange(index, event)}
//                                         defaultValue={item?.endDate}
//                                     />
//                                 </div>
//                                 <div className='col-span-2'>
//                                     <RichTextEditor
//                                         index={index}
//                                         defaultValue={item?.workSummery}
//                                         onRichTextEditorChange={(value) => handleRichTextEditor(value, 'workSummery', index)}
//                                     />
//                                 </div>
//                             </div>
//                         </div>
//                     ))}
//                 </div>
//                 <div className='flex justify-between'>
//                     <div className='flex gap-2'>
//                         <Button variant="outline" onClick={AddNewExperience} className="text-primary">
//                             + Add More Experience
//                         </Button>
//                         <Button variant="outline" onClick={RemoveExperience} className="text-primary">
//                             - Remove
//                         </Button>
//                     </div>
//                     <Button disabled={loading} onClick={onSave}>
//                         {loading ? <LoaderCircle className='animate-spin' /> : 'Save'}
//                     </Button>
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default Experience;


// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import React, { useContext, useEffect, useState } from 'react';
// import RichTextEditor from '../RichTextEditor';
// import { ResumeInfoContext } from '@/context/ResumeInfoContext';
// import { useParams } from 'react-router-dom';
// import GlobalApi from './../../../../../Service/GlobalApi';
// import { toast } from 'sonner';
// import { LoaderCircle } from 'lucide-react';

// function Experience() {
//     const [experienceList, setExperienceList] = useState([
//         { title: '', companyName: '', city: '', state: '', startDate: '', endDate: '', workSummery: '' },
//     ]); 
//     const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
//     const params = useParams();
//     const [loading, setLoading] = useState(false);

//     // Initialize experience list from resumeInfo if available
//     useEffect(() => {
//         if (resumeInfo?.Experience?.length > 0) {
//             setExperienceList(resumeInfo.Experience);
//         } else if (experienceList.length === 0) {
//             setExperienceList([{ title: '', companyName: '', city: '', state: '', startDate: '', endDate: '', workSummery: '' }]);
//         }
//     }, [resumeInfo]);

//     const handleChange = (index, event) => {
//         const newEntries = [...experienceList];
//         const { name, value } = event.target;
//         newEntries[index][name] = value;
//         setExperienceList(newEntries);
//     };

//     const AddNewExperience = () => {
//         setExperienceList([
//             ...experienceList,
//             { title: '', companyName: '', city: '', state: '', startDate: '', endDate: '', workSummery: '' },
//         ]);
//     };

//     const RemoveExperience = () => {
//         if (experienceList.length > 1) {
//             setExperienceList((experienceList) => experienceList.slice(0, -1));
//         }
//     };

//     const handleRichTextEditor = (value, index) => {
//         const updatedList = [...experienceList];
//         updatedList[index].workSummery = value;  // Update only the workSummery for the specific index
//         setExperienceList(updatedList);

//         // Sync with context if needed
//         setResumeInfo((prev) => ({
//             ...prev,
//             Experience: updatedList,
//         }));
//     };

//     const sanitizeExperienceList = (experienceList) => {
//         return experienceList.map(item => ({
//             ...item,
//             workSummery: typeof item.workSummery === 'string' ? item.workSummery : '',
//         }));
//     };

//     const onSave = async () => {
//         const sanitizedExperienceList = sanitizeExperienceList(experienceList);
//         const data = { data: { experience: sanitizedExperienceList } };

//         setLoading(true);
//         try {
//             const response = await GlobalApi.UpdateResumeDetail(params?.resumeId, data);
//             toast('Details updated!');
//         } catch (error) {
//             console.error('Error updating details:', error);
//             toast('Error updating details');
//         } finally {
//             setLoading(false);
//         }
//     };

//     return (
//         <div>
//             <div className='p-5 mt-10 border-t-4 rounded-lg shadow-lg border-t-primary'>
//                 <h2 className='text-lg font-bold'>Professional Experience</h2>
//                 <p>Add Your previous Job experience</p>
//                 <div>
//                     {experienceList.map((item, index) => (
//                         <div key={index}>
//                             <div className='grid grid-cols-2 gap-3 p-3 my-5 border rounded-lg'>
//                                 <div>
//                                     <label className='text-xs'>Position Title</label>
//                                     <Input
//                                         name="title"
//                                         onChange={(event) => handleChange(index, event)}
//                                         value={item?.title}
//                                     />
//                                 </div>
//                                 <div>
//                                     <label className='text-xs'>Company Name</label>
//                                     <Input
//                                         name="companyName"
//                                         onChange={(event) => handleChange(index, event)}
//                                         value={item?.companyName}
//                                     />
//                                 </div>
//                                 <div>
//                                     <label className='text-xs'>City</label>
//                                     <Input
//                                         name="city"
//                                         onChange={(event) => handleChange(index, event)}
//                                         value={item?.city}
//                                     />
//                                 </div>
//                                 <div>
//                                     <label className='text-xs'>State</label>
//                                     <Input
//                                         name="state"
//                                         onChange={(event) => handleChange(index, event)}
//                                         value={item?.state}
//                                     />
//                                 </div>
//                                 <div>
//                                     <label className='text-xs'>Start Date</label>
//                                     <Input
//                                         type="date"
//                                         name="startDate"
//                                         onChange={(event) => handleChange(index, event)}
//                                         value={item?.startDate}
//                                     />
//                                 </div>
//                                 <div>
//                                     <label className='text-xs'>End Date</label>
//                                     <Input
//                                         type="date"
//                                         name="endDate"
//                                         onChange={(event) => handleChange(index, event)}
//                                         value={item?.endDate}
//                                     />
//                                 </div>
//                                 <div className='col-span-2'>
//                                     <RichTextEditor
//                                         index={index}
//                                         value={item?.workSummery}
//                                         onRichTextEditorChange={(value) => handleRichTextEditor(value, index)}
//                                     />
//                                 </div>
//                             </div>
//                         </div>
//                     ))}
//                 </div>
//                 <div className='flex justify-between'>
//                     <div className='flex gap-2'>
//                         <Button variant="outline" onClick={AddNewExperience} className="text-primary">
//                             + Add More Experience
//                         </Button>
//                         <Button variant="outline" onClick={RemoveExperience} className="text-primary">
//                             - Remove
//                         </Button>
//                     </div>
//                     <Button disabled={loading} onClick={onSave}>
//                         {loading ? <LoaderCircle className='animate-spin' /> : 'Save'}
//                     </Button>
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default Experience;
