# Resume Scanner (RS)

## Overview
Resume Scanner (RS) is a web application built with Streamlit that analyzes resumes in PDF format. It extracts key details such as skills, education, and experience, suggests relevant job roles based on the extracted skills, and evaluates the resume's ATS (Applicant Tracking System) compatibility with a score.

## Features
- **Resume Parsing**: Extracts skills, education, and experience from a PDF resume.
- **Job Role Suggestions**: Recommends job roles based on matched skills.
- **ATS Friendliness Score**: Calculates a score to indicate how well the resume aligns with ATS requirements.
- **User-Friendly Interface**: Built with Streamlit for an intuitive and responsive UI.
- **Custom Styling**: Includes a polished design with CSS for better user experience.

## Requirements
To run this project, ensure you have the following dependencies installed:

- Python 3.8+
- Streamlit 1.38.0
- PyPDF2 3.0.1
- Pandas 2.2.3
- NumPy 1.26.4

## Application Setup and Installation
Follow these steps to set up and install the Resume Scanner application:

1. **Install Python**:
   - Ensure Python 3.8 or higher is installed on your system. You can download it from [python.org](https://www.python.org/downloads/).
   - Verify the installation by running:
     ```bash
     python --version
     ```

2. **Set Up a Virtual Environment** (optional but recommended):
   - Create a virtual environment to manage dependencies:
     ```bash
     python -m venv venv
     ```
   - Activate the virtual environment:
     - On Windows:
       ```bash
       venv\Scripts\activate
       ```
     - On macOS/Linux:
       ```bash
       source venv/bin/activate
       ```

3. **Clone the Repository**:
   - Clone the project repository to your local machine:
     ```bash
     git clone <repository-url>
     cd ResumeScanner
     ```

4. **Install Dependencies**:
   - Install the required packages listed in `requirements.txt`:
     ```bash
     pip install -r requirements.txt
     ```

5. **Verify Installation**:
   - Ensure all dependencies are installed correctly by running:
     ```bash
     pip list
     ```
   - Check for the presence of Streamlit, PyPDF2, Pandas, and NumPy with the specified versions.

## Project Structure
```
ResumeScanner/
│
├── assets/
│   └── style.css           # Custom CSS for styling the Streamlit app
├── data/
│   └── job_roles.json      # JSON file containing job roles and required skills
├── img001.png              # Logo image for the app
├── utils/
│   ├── ats_scorer.py       # Logic for calculating ATS score
│   ├── job_matcher.py      # Logic for suggesting job roles
│   └── resume_parser.py    # Logic for extracting data from resumes
├── requirements.txt        # List of dependencies
├── resume_scanner.py       # Main Streamlit app script
└── README.md               # Project documentation
```

## How to Run
1. Ensure you are in the project directory and the virtual environment (if used) is activated.
2. Run the Streamlit app:
   ```bash
   streamlit run resume_scanner.py
   ```
3. Open your browser and navigate to `http://localhost:8501` to use the app.

## Usage
1. Upload a resume in PDF format using the file uploader.
2. The app will analyze the resume and display:
   - Extracted details (skills, education, experience).
   - Suggested job roles with match scores and matched skills.
   - ATS friendliness score with tips for improvement.

## Limitations
- Only supports PDF resumes.
- Job role suggestions depend on the predefined `job_roles.json` file.
- ATS scoring is based on heuristics and may not reflect all ATS systems.

## Future Improvements
- Support for additional resume formats (e.g., DOCX).
- Expand the job roles database.
- Improve ATS scoring with more advanced NLP techniques.
- Add user authentication and resume storage.

## Credits
Developed by Y Naga Teja Reddy. All rights reserved.

---

Powered by RS