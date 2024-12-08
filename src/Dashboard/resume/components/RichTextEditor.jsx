import { Button } from '@/components/ui/button';
import { ResumeInfoContext } from '@/context/ResumeInfoContext';
import { Brain, LoaderCircle } from 'lucide-react';
import React, { useContext, useState } from 'react'
import { BtnBold, BtnBulletList, BtnClearFormatting, BtnItalic, BtnLink, BtnNumberedList, BtnStrikeThrough, BtnStyles, BtnUnderline, Editor, EditorProvider, HtmlButton, Separator, Toolbar } from 'react-simple-wysiwyg'
import { AIChatSession } from './../../../../Service/AIModal';
import { toast } from 'sonner';
const PROMPT='position titile: {positionTitle} , Depends on position title give me 5-7 bullet points for my experience in resume (Please do not add experince level and No JSON array) , give me result in HTML tags'
function RichTextEditor({onRichTextEditorChange,index,defaultValue}) {
    const [value,setValue]=useState(defaultValue);
    const {resumeInfo,setResumeInfo}=useContext(ResumeInfoContext)
    const [loading,setLoading]=useState(false);
    const GenerateSummaryFromAI = async () => {
      console.log("Resume Info:", resumeInfo);
      console.log("Experience Array:", resumeInfo.Experience);
  
      if (!resumeInfo || !resumeInfo.Experience || resumeInfo.Experience.length <= index) {
          toast('Invalid experience entry. Please add a valid title.');
          return;
      }
  
      const positionTitle = resumeInfo.Experience[index]?.title;
  
      if (!positionTitle || positionTitle.trim() === "") {
          toast('Please Add Position Title');
          return;
      }
  
      setLoading(true);
      const prompt = PROMPT.replace('{positionTitle}', positionTitle);
  
      try {
          const result = await AIChatSession.sendMessage(prompt);
          const resp = result.response.text();
          setValue(resp.replace('[', '').replace(']', ''));
      } catch (error) {
          console.error("Error generating summary:", error);
          toast('Error generating summary. Please try again.');
      } finally {
          setLoading(false);
      }
  };
  
    
    return (
    <div>
      <div className='flex justify-between my-2'>
        <label className='text-xs'>Summery</label>
        <Button variant="outline" size="sm" 
        onClick={GenerateSummaryFromAI}
        disabled={loading}
        className="flex gap-2 border-primary text-primary">
          {loading?
          <LoaderCircle className='animate-spin'/>:  
          <>
           <Brain className='w-4 h-4'/> Generate from AI 
           </>
        }
         </Button>
      </div>
    <EditorProvider>
      <Editor value={value} onChange={(e)=>{
        setValue(e.target.value);
        onRichTextEditorChange(e)
      }}>
         <Toolbar>
          <BtnBold />
          <BtnItalic />
          <BtnUnderline />
          <BtnStrikeThrough />
          <Separator />
          <BtnNumberedList />
          <BtnBulletList />
          <Separator />
          <BtnLink />
         
         
        </Toolbar>
      </Editor>
      </EditorProvider>
    </div>
  )
}

export default RichTextEditor