# Job Application Tracker

## Overview
Applying for jobs can be overwhelming, especially when managing multiple applications across different platforms. The **Job Application Tracker** helps job seekers stay organized by tracking their job applications in one place.

## Features
- Add new job applications with company name, role, status, application date, and job application link.
- Update the status of applications:
  - **Pending**: Application submitted, awaiting response.
  - **Interview**: Interview scheduled or completed.
  - **Rejected**: Application was not successful.
- View all applications in an organized list.
- Simple and lightweight, requiring no external database.

## Tech Stack
- **React**: For the user interface
- **Axios**: For API calls
- **JSON File**: Used as a simple database to store job applications

## Installation & Running
1. Clone the repository:
   ```sh
   git clone https://github.com/yourusername/job-tracker.git
   cd job-tracker
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Run the script to start the application:
   ```sh
   ./script.sh
   ```

## Usage
- Open the application in your browser.
- Add new job applications by filling out the form, including the job application link.
- View and update the status of each application.

## Future Enhancements
- Implement user authentication to track applications per user.
- Add filtering and sorting options.
