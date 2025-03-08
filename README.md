<div align="center">
<pre>
  E-Prescription Backend
</pre>
</div>

## 🔗 Table of Contents

I. [📍 Overview](#-overview)
II. [👾 Features](#-features)
III. [🚀 Getting Started](#-getting-started)
IV. [📌 Project Roadmap](#-project-roadmap)

---

## 📍 Overview

<code>❯ 

The **E-Prescription_Backend** project is a backend system designed to power an web application. 
This Node.js-based project leverages the Express framework to create a robust server handling prescription management—creating, storing, and retrieving electronic prescriptions—alongside user authentication for secure access by doctors, pharmacists, or patients, and data integration. 
Key dependencies enhance its functionality: `mongoose` connects to a MongoDB database for persistent storage of prescription data, `jsonwebtoken` ensures secure token-based authentication, `bcryptjs` handle password hashing for user security, while `helmet` and `xss-clean` bolster protection against common web vulnerabilities, with additional tools like `cors` for cross-origin requests and `dotenv` for environment variable management.

</code>

---

## 👾 Features

<code>
API Endpoints:
POST /prescriptions: Create a new prescription.
GET /prescriptions/{id}: Retrieve a specific prescription.
PUT /prescriptions/{id}: Update prescription status (e.g., filled, canceled).
Authentication: Token-based (e.g., JWT) or session management for secure access.
Data Validation: Ensures prescription details (e.g., drug name, dosage, patient ID) are correct.
Integration: Possible hooks for front-end apps or external healthcare systems.
Current State
</code>

---

## 📁 Project Structure

```sh
└── E-Prescription_Backend.git/
    ├── Public
    │   ├── Registration.html
    │   ├── index.html
    │   ├── landing.html
    │   ├── login.js
    │   ├── registrstion.js
    │   └── style.css
    ├── _data
    │   ├── Doctors.json
    │   └── People.json
    ├── config
    │   └── connectDB.js
    ├── controllers
    │   ├── Appoinments.js
    │   ├── Login.js
    │   ├── MedProfile.js
    │   ├── People.js
    │   ├── Prescription.js
    │   └── Registration.js
    ├── middleware
    │   ├── async.js
    │   ├── authentication.js
    │   └── error.js
    ├── models
    │   ├── Doctors.js
    │   ├── Hospital.js
    │   ├── LoginSchema.js
    │   ├── Public_INFO.js
    │   └── Public_Medical_Profile.js
    ├── package-lock.json
    ├── package.json
    ├── routes
    │   ├── Doctor.js
    │   └── People.js
    ├── seeder.js
    ├── server.js
    └── utils
        └── errorResponse.js
```
---
## 🚀 Getting Started

### ☑️ Prerequisites

Before getting started with E-Prescription_Backend.git, ensure your runtime environment meets the following requirements:

- **Programming Language:** JavaScript
- **Package Manager:** Npm


### ⚙️ Installation

Install E-Prescription_Backend.git using one of the following methods:

**Build from source:**

1. Clone the E-Prescription_Backend.git repository:
```sh
❯ git clone https://github.com/mishaown/E-Prescription_Backend.git
```

2. Navigate to the project directory:
```sh
❯ cd E-Prescription_Backend.git
```

3. Install the project dependencies:


**Using `npm`** &nbsp; [<img align="center" src="https://img.shields.io/badge/npm-CB3837.svg?style={badge_style}&logo=npm&logoColor=white" />](https://www.npmjs.com/)

```sh
❯ npm install
```




### 🤖 Usage
Run E-Prescription_Backend.git using the following command:
**Using `npm`** &nbsp; [<img align="center" src="https://img.shields.io/badge/npm-CB3837.svg?style={badge_style}&logo=npm&logoColor=white" />](https://www.npmjs.com/)

```sh
❯ npm start
```


### 🧪 Testing
Run the test suite using the following command:
**Using `npm`** &nbsp; [<img align="center" src="https://img.shields.io/badge/npm-CB3837.svg?style={badge_style}&logo=npm&logoColor=white" />](https://www.npmjs.com/)

```sh
> nodemon server
```

