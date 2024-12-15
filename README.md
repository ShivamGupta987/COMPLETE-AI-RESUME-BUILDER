AI Resume Builder

Welcome to the AI Resume Builder! This MERN stack application streamlines the process of crafting professional resumes using the Gemini API for generating tailored job-specific descriptions. Users can seamlessly download and share resumes in optimized formats.

Explore the live application here: AI Resume Builder

Features

🔧 AI-Powered Resume Building

Leverages the Gemini API to fetch optimized job descriptions and tailor resumes for specific roles and industries.

🔑 User-Friendly Interface

Modern and intuitive design, ensuring a smooth user experience for job seekers.

📄 Resume Options

Generate resumes in multiple formats optimized for ATS (Applicant Tracking System) compatibility.

Download resumes directly as PDF files.

Share resumes instantly via shareable links.

🔌 Customizable

Edit and personalize resumes in real-time.

Dynamically preview resumes before downloading or sharing.

Tech Stack

Frontend

React.js

TailwindCSS for styling with animations and responsiveness.

Backend

Node.js with Express.js

Gemini API integration for intelligent content generation.

Database

MongoDB for secure and scalable data storage.

Installation & Setup

Follow these steps to set up the project locally:

1. Clone the Repository

git clone https://github.com/your-username/ai-resume-builder.git
cd ai-resume-builder

2. Install Dependencies

For the Backend:

cd backend
npm install

For the Frontend:

cd frontend
npm install

3. Configure Environment Variables

Create a .env file in the backend directory and add the following:

PORT=5000
STRAPI_URI=your_mongodb_connection_string
GEMINI_API_KEY=your_gemini_api_key

4. Start the Application

Backend:

npm run start

Frontend:

cd ../frontend
npm start

The application will be available at http://localhost:3000.

How It Works

Input Details: Users provide their personal details, professional experiences, education, and skills.

AI-Generated Content: The Gemini API fetches tailored job descriptions to enhance resume sections.

Customization: Edit and preview resumes in real-time.

Download & Share: Resumes can be downloaded as PDFs or shared via a link.

Project Demo

Visit the live demo: AI Resume Builder


Future Enhancements

Multi-language Support for global users.

Additional resume templates to provide more options.

Advanced analytics to track shared resume performance.

Contributing

Contributions are welcome! Please follow these steps to contribute:

Fork the repository.

Create a new branch for your feature: git checkout -b feature-name

Commit your changes: git commit -m 'Add feature name'

Push to the branch: git push origin feature-name

Submit a pull request.

License

This project is licensed under the MIT License.

Contact

For any queries or suggestions, feel free to reach out:

Email: sg804595@gmail.com
GitHub: your-username

Thank you for checking out the AI Resume Builder! Happy job hunting! 🚀

