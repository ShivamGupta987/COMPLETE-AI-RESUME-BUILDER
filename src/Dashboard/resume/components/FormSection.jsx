// FormSection.jsx
import React, { useContext, useState } from "react";
import PersonalDetails from "./forms/PersonalDetails";
import { ArrowLeft, ArrowRight, Home, LayoutGrid } from "lucide-react";
import { Button } from "@/components/ui/button";
import Summary from "./forms/Summery";
import Summery from "./forms/Summery";
import Experience from "./forms/Experience";
import Education from "./forms/Education";
import Skills from "./forms/Skills";
import { Link, Navigate, useParams } from "react-router-dom";
import ThemeColor from "./ThemeColor";

function FormSection() {
  const [activeFormIndex, setActiveFormIndex] = useState(1);

  const [enableNext, setEnableNext] = useState(false);

  const {resumeId}= useParams();
  return (
    <div>
      <div className="flex items-center justify-between">
        <div className="flex gap-5">
          <Link to={"/dashboard"}>
            <Button>
              <Home />
            </Button>
          </Link>
          <ThemeColor/>

        
        </div>
        <div className="flex gap-2">
          {activeFormIndex > 1 && (
            <Button
              size="sm"
              onClick={() => setActiveFormIndex(activeFormIndex - 1)}
            >
              <ArrowLeft />
            </Button>
          )}
          <Button
            disabled={!enableNext}
            className="flex gap-2"
            size="sm"
            onClick={() => setActiveFormIndex(activeFormIndex + 1)}
          >
            Next <ArrowRight />
          </Button>
        </div>
      </div>

      {activeFormIndex === 1 ? (
        <PersonalDetails enableNext={(v) => setEnableNext(v)} />
      ) : activeFormIndex === 2 ? (
        <Summery enableNext={(v) => setEnableNext(v)} />
      ) : activeFormIndex == 3 ? (
        <Experience enableNext={(v) => setEnableNext(v)} />
      ) : activeFormIndex == 4 ? (
        <Education enableNext={(v) => setEnableNext(v)} />
      ) : activeFormIndex == 5 ? (
        <Skills enableNext={(v) => setEnableNext(v)} />
        
        
      ) : activeFormIndex == 6 ? (
    <Navigate to={`/my-resume/${resumeId}/view`} />
) : null

      
      
      
     }

      {/* summary */}

      {/* experience */}

      {/* educational; detail */}

      {/* skills */}
    </div>
  );
  
}

export default FormSection;
