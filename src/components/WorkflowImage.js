import { useState } from "react";
import { generateImageFromPrompt, analyzeImage } from "../utils/apiHelpers";

const WorkflowImage = (props) => {
  const { isLoading, setIsLoading } = props;

  const [fileType, setFileType] = useState("")
  const [preview, setPreview] = useState("");
  const [analysis, setAnalysis] = useState("");
  const [generatedImage, setGeneratedImage] = useState("");

  const [errorMessage, setErrorMessage] = useState("");
  const [statusMessage, setStatusMessage] = useState("");

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setFileType(file.type)

    const reader = new FileReader();

    reader.onloadend = () => {
      setPreview(reader.result);
      setAnalysis("");
      setGeneratedImage("");
      setErrorMessage("");
      setStatusMessage("");
    };

    reader.readAsDataURL(file);
  };

  const handleAnalyzeImage = async () => {
    if (!preview) return;

    setErrorMessage("");
    setStatusMessage("Analyzing image...");
    setIsLoading(true);

    try {
      const result = await analyzeImage(preview, fileType);

      if (!result) {
        setErrorMessage("Image analysis failed.");
        return;
      }

      setAnalysis(result);
      setStatusMessage("Analysis completed.");
    } catch (error) {
      setErrorMessage("Something went wrong during analysis.");
    } finally {
        setIsLoading(false);
    }
  };

  const buildPromptFromAnalysis = (text) => {
    return `Create a high-quality artistic image based on: ${text}`;
  };

  const handleGenerateVariation = async () => {
    if (!analysis) return;

    setErrorMessage("");
    setStatusMessage("Generating variation...");
    setIsLoading(true);

    try {
      const prompt = buildPromptFromAnalysis(analysis);
      const image = await generateImageFromPrompt(prompt);

      if (!image) {
        setErrorMessage("Failed to generate variation.");
        return;
      }

      setGeneratedImage(image);
      setStatusMessage("Variation generated.");
    } catch (error) {
      setErrorMessage("Something went wrong while generating.");
    } finally {
        setIsLoading(false);
    }
  };

  const handleDownloadImage = () => {
    const link = document.createElement("a");
    link.href = generatedImage;
    link.download = "generated-image.png";
    link.click();
  };

  return (
    <div className="workflow-container">
      <div className="section">
        <h2 className="section-title">Style Lab</h2>
        <p className="section-description">
          Upload an image to analyze and generate variations.
        </p>
      </div>

      {statusMessage && <p className="status-text">{statusMessage}</p>}
      {errorMessage && <p className="error-text">{errorMessage}</p>}

      <div className="section">
        <h3 className="label">Upload Image</h3>
        <input
          className="input"
          type="file"
          accept="image/*"
          onChange={handleImageChange}
        />
      </div>

      {preview && (
        <div className="section">
          <h3 className="label">Preview</h3>
          <img className="result-image" src={preview} alt="preview" />
        </div>
      )}

      {preview && (
        <div className="section">
          <button
            className="primary-button"
            onClick={handleAnalyzeImage}
            disabled={isLoading}
          >
            {isLoading ? "Analyzing..." : "Analyze Image"}
          </button>
        </div>
      )}

      {analysis && (
        <div className="section">
          <h3 className="label">Analysis</h3>
          <textarea
            className="textarea"
            rows="4"
            value={analysis}
            readOnly
          />

          <button
            className="primary-button"
            onClick={handleGenerateVariation}
            disabled={isLoading}
          >
            {isLoading ? "Generating..." : "Generate Variation"}
          </button>
        </div>
      )}

      {generatedImage && (
        <div className="section">
          <h3 className="label">Generated Image</h3>

          <button
            className="secondary-button"
            onClick={handleDownloadImage}
          >
            Download Image
          </button>

          <img
            className="result-image"
            src={generatedImage}
            alt="generated"
          />
        </div>
      )}
    </div>
  );
};

export default WorkflowImage;