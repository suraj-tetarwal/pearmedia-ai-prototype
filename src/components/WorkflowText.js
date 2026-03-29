import { useState } from "react";
import { getEnhancedPrompt, generateImageFromPrompt } from "../utils/apiHelpers";

const WorkflowText = (props) => {
  const { isLoading, setIsLoading } = props;

  const [userPrompt, setUserPrompt] = useState("");
  const [enhancedPrompt, setEnhancedPrompt] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const [errorMessage, setErrorMessage] = useState("");
  const [statusMessage, setStatusMessage] = useState("");

  const handleEnhancePrompt = async () => {
    if (!userPrompt.trim()) return;

    setErrorMessage("");
    setStatusMessage("Enhancing prompt...");
    setIsLoading(true);

    try {
      const enhanced = await getEnhancedPrompt(userPrompt);

      if (!enhanced) {
        setErrorMessage("Failed to enhance prompt.");
        return;
      }

      setEnhancedPrompt(enhanced);
      setStatusMessage("Prompt enhanced successfully.");
    } catch (error) {
      setErrorMessage("Something went wrong while enhancing.");
    } finally {
        setIsLoading(false);
    }
  };

  const handleGenerateImage = async () => {
    if (!enhancedPrompt.trim()) return;

    setErrorMessage("");
    setStatusMessage("Generating image...");
    setIsLoading(true);

    try {
      const image = await generateImageFromPrompt(enhancedPrompt);

      if (!image) {
        setErrorMessage("Image generation failed.");
        return;
      }

      setImageUrl(image);
      setStatusMessage("Image generated successfully.");
    } catch (error) {
      setErrorMessage("Something went wrong while generating image.");
    } finally {
        setIsLoading(false);
    }
  };

  const handleCopyPrompt = () => {
    navigator.clipboard.writeText(enhancedPrompt);
    setStatusMessage("Prompt copied.");
  };

  const handleDownloadImage = () => {
    const link = document.createElement("a");
    link.href = imageUrl;
    link.download = "generated-image.png";
    link.click();
  };

  return (
    <div className="workflow-container">
      <div className="section">
        <h2 className="section-title">Creative Studio</h2>
        <p className="section-description">
          Enter a simple idea and enhance it into a detailed prompt.
        </p>
      </div>

      {statusMessage && <p className="status-text">{statusMessage}</p>}
      {errorMessage && <p className="error-text">{errorMessage}</p>}

      <div className="section">
        <h3 className="label">Your Idea</h3>
        <input
          className="input"
          type="text"
          placeholder="Enter your idea..."
          value={userPrompt}
          onChange={(e) => {
            setUserPrompt(e.target.value);
            setEnhancedPrompt("");
            setImageUrl("");
          }}
        />

        <button
          className="primary-button"
          onClick={handleEnhancePrompt}
          disabled={isLoading || !userPrompt.trim()}
        >
          {isLoading ? "Enhancing..." : "Enhance Prompt"}
        </button>
      </div>

      {enhancedPrompt && (
        <div className="section">
          <h3 className="label">Enhanced Prompt</h3>
          <textarea
            className="textarea"
            rows="4"
            value={enhancedPrompt}
            onChange={(e) => setEnhancedPrompt(e.target.value)}
          />

          <button
            className="primary-button"
            onClick={handleGenerateImage}
            disabled={isLoading}
          >
            {isLoading ? "Generating..." : "Generate Image"}
          </button>

          <button
            className="secondary-button"
            onClick={handleCopyPrompt}
          >
            Copy Prompt
          </button>
        </div>
      )}

      {imageUrl && (
        <div className="section">
          <h3 className="label">Generated Image</h3>

          <button
            className="secondary-button"
            onClick={handleDownloadImage}
          >
            Download Image
          </button>

          <img className="result-image" src={imageUrl} alt="generated" />
        </div>
      )}
    </div>
  );
};

export default WorkflowText;