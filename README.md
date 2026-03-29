# Pear Media AI Lab

Pear Media AI Lab is an AI-powered web application that transforms simple user inputs into high-quality, visually rich outputs through structured, multi-step workflows.

The application is designed around two intelligent pipelines:

1. Creative Studio (Text-to-Image Workflow)
Users start with a basic idea, which is enhanced using an AI prompt engineering model into a detailed, production-quality prompt. The user can review and modify this enhanced prompt (human-in-the-loop) before generating a final image using a diffusion-based model.

2. Style Lab (Image-to-Variation Workflow)
Users upload an image, which is analyzed using a vision model to extract key attributes such as main object, color palette, lighting, and artistic style. These insights are then used to generate new stylistic variations of the original image.

---

## Features

### Workflow A – Creative Studio (Text to Image)
- Enter a simple idea
- AI enhances it into a detailed prompt
- User can edit the prompt (human-in-the-loop)
- Generate high-quality image

### Workflow B – Style Lab (Image to Variations)
- Upload an image
- AI analyzes:
  - Main object
  - Color palette
  - Artistic style
  - Lighting
- Generate new styled variations

---

## Tech Stack

- React.js
- Gemini API (Text + Image Analysis)
- Hugging Face (Stable Diffusion XL for image generation)
- CSS (Custom styling)

---

## Folder Structure

```
pearmedia-ai-prototype/
├── .env                      # Secret API Keys
├── .gitignore                # Files to ignore (node_modules, .env)
├── README.md                 # Detailed project documentation
├── package.json              # Project dependencies
└── src/
    ├── App.js                # State management & Main Layout
    ├── App.css               # Custom styles and animations
    ├── components/
    │   ├── Navbar.js         # Navigation and Logo
    │   ├── WorkflowText.js   # Input, Enhance, Approve, Generate logic
    │   ├── WorkflowImage.js  # Upload, Analyze, Variation logic
    │   └── ImageCard.js      # Reusable component to display results
    └── utils/
        ├── apiHelpers.js     # All fetch() logic organized by API
        └── constants.js      # Default prompts and configuration
```

---

## Setup Instructions

### 1. Clone the repository
```
git clone https://github.com/suraj-tetarwal/pearmedia-ai-prototype.git
cd pearmedia-ai-prototype
```

### 2. Install dependencies

```
npm install
```

### 3. Add environment variables

create a ```.env``` file

```
REACT_APP_GEMINI_KEY=your_gemini_key
REACT_APP_HF_TOKEN=your_huggingface_token
```

### 4. Run the Project

```
npm start
```

Live Demo: live_demo_link

Demo Video: demo_video_link

## Key Highlights

- Human-in-the-loop prompt workflow (user can edit AI-generated prompts)
- End-to-end AI pipeline: Text → Prompt Enhancement → Image Generation
- Image reverse-engineering using vision model (object, style, lighting)
- Clean UI with proper loading states and error handling
- Modular and scalable code structure with separated API logic


