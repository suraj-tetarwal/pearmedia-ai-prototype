import { useState } from "react";

import Navbar from "./components/Navbar";
import WorkflowText from "./components/WorkflowText";
import WorkflowImage from "./components/WorkflowImage";

import "./App.css";

const App = () => {
  const [activeTab, setActiveTab] = useState("text");
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className="app-container">
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

      <div className="card">
        {activeTab === "text" ? (
          <WorkflowText isLoading={isLoading} setIsLoading={setIsLoading} />
        ) : (
          <WorkflowImage isLoading={isLoading} setIsLoading={setIsLoading} />
        )}
      </div>
    </div>
  );
};

export default App;
