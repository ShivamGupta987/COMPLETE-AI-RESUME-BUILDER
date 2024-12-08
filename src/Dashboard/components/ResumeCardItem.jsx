import { Loader2Icon, MoreVertical } from 'lucide-react';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import GlobalApi from './../../../Service/GlobalApi'
import { toast } from 'sonner';

function ResumeCardItem({ resume, refreshData }) {
  const navigate = useNavigate();
  const [openAlert, setOpenAlert] = useState(false);
  const [loading, setLoading] = useState(false);

  const onDelete = () => {
    setLoading(true);
    GlobalApi.DeleteResumeById(resume.documentId).then(
      (resp) => {
        toast('Resume Deleted!');
        refreshData();
        setLoading(false);
        setOpenAlert(false);
      },
      (error) => {
        setLoading(false);
        console.error("Error deleting resume:", error);
      }
    );
  };

  return (
    <div className="relative transition-all duration-300 transform bg-white shadow-md group rounded-xl hover:shadow-xl hover:-translate-y-1">
      <div 
        className="absolute inset-0 transition-opacity opacity-25 rounded-xl group-hover:opacity-100"
        style={{ backgroundColor: resume?.themeColor || '#000' }}
      />
      
      <Link to={`/dashboard/resume/${resume.documentId}/edit`}>
        <div className="relative overflow-hidden rounded-t-xl">
          <div className="flex flex-col items-center justify-center h-64 p-8 transition-transform duration-300 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 group-hover:scale-105">
            <div className="p-6 transition-transform transform rounded-full shadow-lg bg-white/90 group-hover:scale-110 group-hover:rotate-3">
              <img 
                src="/cv.png" 
                className="object-contain w-16 h-16" 
                alt="Resume Icon"
              />
            </div>
          </div>
        </div>
      </Link>

      <div className="relative p-4 space-y-2">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-transparent bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text">
            {resume.Title}
          </h2>
          
          <DropdownMenu>
            <DropdownMenuTrigger className="p-1 transition-colors rounded-full hover:bg-gray-100">
              <MoreVertical className="w-5 h-5 text-gray-600" />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-48">
              <DropdownMenuItem 
                className="flex items-center space-x-2 cursor-pointer"
                onClick={() => navigate(`/dashboard/resume/${resume.documentId}/edit`)}
              >
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem 
                className="flex items-center space-x-2 cursor-pointer"
                onClick={() => navigate(`/my-resume/${resume.documentId}/view`)}
              >
                View
              </DropdownMenuItem>
              <DropdownMenuItem 
                className="flex items-center space-x-2 cursor-pointer"
                onClick={() => navigate(`/my-resume/${resume.documentId}/view`)}
              >
                Download
              </DropdownMenuItem>
              <DropdownMenuItem 
                className="flex items-center space-x-2 text-red-600 cursor-pointer"
                onClick={() => setOpenAlert(true)}
              >
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <AlertDialog open={openAlert} onOpenChange={setOpenAlert}>
        <AlertDialogContent className="sm:max-w-md">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-xl font-semibold">Delete Resume</AlertDialogTitle>
            <AlertDialogDescription className="text-gray-600">
              This action cannot be undone. It will permanently delete this resume.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="gap-2">
            <AlertDialogCancel className="bg-gray-100 hover:bg-gray-200">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction 
              onClick={onDelete} 
              disabled={loading}
              className="text-white bg-red-600 hover:bg-red-700"
            >
              {loading ? (
                <Loader2Icon className="w-4 h-4 mr-2 animate-spin" />
              ) : 'Delete'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

export default ResumeCardItem;