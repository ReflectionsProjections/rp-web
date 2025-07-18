import axios from "axios";
import api from "./api";
import { Resume } from "@/routes/ResumeBook/ResumeBook";
import { saveAs } from "file-saver";
import JSZip from "jszip";

export async function downloadResumes(
  resumes: Resume[],
  selectedResumes: string[]
) {
  let totalErrorCount = 0;

  try {
    const response = await api.post("/s3/download/batch", {
      userIds: selectedResumes
    });

    const { data: urls, errorCount } = response.data;
    totalErrorCount += errorCount;

    if (urls.length === 0) {
      throw new Error("No URLs returned from batch download request");
    }

    if (urls.length === 1) {
      // Single resume - download directly
      try {
        const fileResponse = await axios.get<unknown, { data: Blob }>(
          urls[0] ?? "",
          {
            responseType: "blob"
          }
        );

        const userId = getFileNameFromUrl(urls[0] ?? "").replace(".pdf", "");
        const resume = resumes.find((r) => r.id == userId);

        if (resume === undefined) {
          throw new Error("Resume not found in filteredResumes");
        }

        const fileName = cleanUpName(resume.name) + ".pdf";
        saveAs(fileResponse.data, fileName);
      } catch (error) {
        totalErrorCount++;
        console.error("Error downloading single resume:", error);
      }
    } else {
      // Multiple resumes - create a zip file
      const zip = new JSZip();
      const failedDownloads = [];

      for (const url of urls) {
        try {
          const userId = getFileNameFromUrl(url ?? "").replace(".pdf", "");
          const resume = resumes.find((r) => r.id == userId);
          if (resume === undefined) {
            throw new Error("Resume not found in filteredResumes");
          }

          const fileResponse = await axios.get<unknown, { data: Blob }>(
            url ?? "",
            { responseType: "blob" }
          );
          const fileName = cleanUpName(resume.name) + ".pdf";

          zip.file(fileName, fileResponse.data);
        } catch (error) {
          totalErrorCount++;
          failedDownloads.push(url);
          console.error("Error downloading resume:", url, error);
        }
      }

      if (Object.keys(zip.files).length > 0) {
        try {
          const content = await zip.generateAsync({ type: "blob" });
          saveAs(content, "resumes.zip");
        } catch (error) {
          console.error("Error generating zip file:", error);
          throw new Error(
            "Failed to create zip file. Some resumes may not have been downloaded."
          );
        }
      } else {
        throw new Error("No resumes were successfully downloaded.");
      }

      if (failedDownloads.length > 0) {
        console.log("Failed downloads:", failedDownloads);
      }
    }

    if (totalErrorCount > 0) {
      throw new Error(`${totalErrorCount} resume(s) could not be downloaded.`);
    }
  } catch (error) {
    console.error("Error in batch download request:", error);
    throw new Error(
      "Failed to initiate resume download(s). Please try again later."
    );
  }
}

const getFileNameFromUrl = (url: string): string => {
  const parts = url.split("/");
  const temp = parts[parts.length - 1];
  return temp.substring(0, temp.indexOf("?"));
};

const cleanUpName = (str: string): string => {
  return (
    str
      .toLowerCase() // Convert the string to lowercase
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
      .replace(/\s+(\w)/g, (_, c) => c.toUpperCase()) // Capitalize the first letter of each word after whitespace
      .replace(/\s+/g, "") // Remove any remaining whitespace
      .replace(/^\w/, (c) => c.toUpperCase())
  ); // Capitalize the first letter of the result
};
