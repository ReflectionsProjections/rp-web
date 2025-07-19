import { Config } from "@/config";
import { Resume } from "@/routes/ResumeBook/ResumeBook";
import { downloadResumes } from "@/util/download-functions";
import { saveAs } from "file-saver";
import { useState } from "react";

export function useResumeSelectionAndDownloadHook({
  allFilteredResumes,
  filteredResumes
}: {
  allFilteredResumes: Resume[];
  filteredResumes: Resume[];
}) {
  const [selectedResumes, setSelectedResumes] = useState<string[]>([]);

  const resetSelectedResumes = () => {
    setSelectedResumes([]);
  };

  const toggleResume = (id: string) => {
    setSelectedResumes((prev) =>
      prev.includes(id)
        ? prev.filter((resumeId) => resumeId !== id)
        : [...prev, id]
    );
  };

  const selectAllResumes = () => {
    if (selectedResumes.length === filteredResumes.length) {
      setSelectedResumes([]);
    } else {
      setSelectedResumes(filteredResumes.map((resume) => resume.id));
    }
  };

  const handleDownloadResumes = async () => {
    await downloadResumes(filteredResumes, selectedResumes);
  };

  const downloadResumesCSV = (selected: boolean = false) => {
    const csvContent = [
      "Name,Major,Degree,Graduation Year,Job Interest,Portfolios,Resume Link"
    ]
      .concat(
        allFilteredResumes
          .filter((resume) => {
            if (selected) {
              return selectedResumes.includes(resume.id);
            }
            return true;
          })
          .map((resume) => {
            const portfolios = resume.portfolios
              ? resume.portfolios.join("; ")
              : "";
            return [
              resume.name,
              resume.major || "",
              resume.degree || "",
              resume.graduationYear || "",
              resume.jobInterest.join("; "),
              portfolios,
              `${Config.RESUME_BOOK_URL}/resume-book/${resume.id}/download`
            ].join(",");
          })
      )
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    saveAs(blob, "resumes.csv");
  };
  return {
    selectedResumes,
    toggleResume,
    selectAllResumes,
    handleDownloadResumes,
    downloadResumesCSV,
    resetSelectedResumes
  };
}
