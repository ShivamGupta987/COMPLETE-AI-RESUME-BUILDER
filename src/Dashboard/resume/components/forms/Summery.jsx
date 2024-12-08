import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import GlobalApi from "./../../../../../Service/GlobalApi";
import { Brain, LoaderCircle } from "lucide-react";
import { toast } from "sonner";
import { AIChatSession } from "./../../../../../Service/AIModal";

const prompt =
  "Job Title: {jobTitle}. Based on the job title, give me a summary for my resume within 4-5 lines that impresses anyone in JSON format with fields: experienceLevel and summary for fresher, mid-level, and experienced.";

const Summery = ({ enableNext }) => {
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  const [loading, setLoading] = useState(false);
  const params = useParams();
  const [summery, setSummery] = useState(resumeInfo?.summery || "");
  const [aiGeneratedSummaryList, setAiGeneratedSummaryList] = useState([]);

  // Update resumeInfo when summery changes
  useEffect(() => {
    setResumeInfo((prev) => ({
      ...prev,
      summery: summery.trim(),
    }));
  }, [summery, setResumeInfo]);

  // Generate summary from AI
  const generateSummeryFromAI = async () => {
    if (!resumeInfo.jobTitle) {
      toast.error("Job title is missing. Please add a job title.");
      return;
    }

    setLoading(true);
    const formattedPrompt = prompt.replace("{jobTitle}", resumeInfo.jobTitle);
    console.log("Sending Prompt to AI:", formattedPrompt);

    try {
      const result = await AIChatSession.sendMessage(formattedPrompt);
      const responseText = await result.response.text();
      console.log("Response received from AI:", responseText); // Log the full response for debugging

      try {
        const jsonStrings = responseText.trim().match(/{[^{}]*}/g); // Match each JSON object
        if (jsonStrings) {
          const parsedResponses = jsonStrings.map((str) => JSON.parse(str)); // Parse each matched string as JSON
          const summaries = parsedResponses.map((aiResponse) => aiResponse.summary).filter(Boolean); // Get summaries
          setSummery(summaries[0] || ""); // Set the first summary or empty string
          setAiGeneratedSummaryList(parsedResponses); // Store all responses
        } else {
          throw new Error("No valid JSON objects found in the response.");
        }
      } catch (parseError) {
        console.error("Error parsing AI response:", parseError);
        console.error("Response received:", responseText);
        toast.error("Failed to parse AI response. Please check the console for details.");
      }
    } catch (error) {
      console.error("Error generating summary:", error);
      toast.error("Failed to generate summary from AI.");
    } finally {
      setLoading(false);
    }
  };

  // Handle form submission
  const onSave = (e) => {
    e.preventDefault();
    setLoading(true);

    const data = {
      resumeId: params.resumeId,
      section: "summery",
      data: {
        summery: summery.trim(),
      },
    };

    if (params?.resumeId) {
      GlobalApi.UpdateResumeDetail(params.resumeId, data)
        .then((resp) => {
          console.log("Response:", resp);
          enableNext(true);
          toast.success("Details updated successfully!");
        })
        .catch((error) => {
          console.error("Error updating resume:", error);
          toast.error("Error updating details.");
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      console.error("Resume ID is missing.");
      toast.error("Resume ID is missing.");
      setLoading(false);
    }
  };

  // Clear summary from the textarea
  const clearSummary = () => {
    setSummery(""); // Clear the summary state
  };

  return (
    <div>
      <div className="p-5 mt-10 border-t-4 rounded-lg shadow-lg border-t-primary">
        <h2 className="text-lg font-bold">Summary Detail</h2>
        <p>Add a summary of your job title</p>
      </div>

      <form className="mt-7" onSubmit={onSave}>
        <div className="flex items-end justify-between">
          <label>Add Summary</label>
          <div className="flex items-center">
            <Button
              onClick={generateSummeryFromAI}
              type="button"
              size="sm"
              variant="outline"
              className="mr-2 border-primary text-primary"
            >
              <Brain className="w-4 h-4" />
              Generate from AI
            </Button>
            <Button
              onClick={clearSummary}
              type="button"
              size="sm"
              variant="outline"
              className="border-danger text-danger"
            >
              Cut
            </Button>
          </div>
        </div>

        <Textarea
          className="mt-5"
          required
          value={summery}
          onChange={(e) => setSummery(e.target.value)}
        />

        <div className="flex justify-end mt-5">
          <Button type="submit" disabled={loading}>
            {loading ? (
              <LoaderCircle className="animate-spin" />
            ) : (
              "Save Changes"
            )}
          </Button>
        </div>
      </form>

      {aiGeneratedSummaryList.length > 0 && (
        <div className="mt-5">
          <h2 className="text-lg font-bold">Suggestions</h2>
          <ul>
            {aiGeneratedSummaryList.map((item, index) => (
              <li key={index} className="mt-2">
                <h3 className="font-bold">{item.experienceLevel}</h3>
                <p>{item.summary}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Summery;
