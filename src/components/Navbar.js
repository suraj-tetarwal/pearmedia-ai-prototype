const Navbar = props => {
    const {activeTab, setActiveTab} = props

    return (
        <div className="navbar-container">
            <h1 className="title">Pear Media AI Lab</h1>
            <div className="tabs">
                <button 
                    className={activeTab === "text" ? "tab active-tab" : "tab"} 
                    onClick={() => setActiveTab("text")} 
                >
                    Creative Studio
                </button>
                <button 
                    className={activeTab === "image" ? "tab active-tab" : "tab"} 
                    onClick={() => setActiveTab("image")} 
                >
                    Style Lab
                </button>
            </div>
        </div>
    )
}

export default Navbar