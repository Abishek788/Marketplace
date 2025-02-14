# CARMART Marketplace 🚗

Welcome to the **CARMART Marketplace** repository! This project is a robust, scalable platform for buying, selling, and servicing vehicles. It combines a modern React frontend with a serverless AWS backend managed via Terraform. We're also actively working on advanced features like an **AI optimized cloud tester recovery platform** and enhancing our deployment strategies with AWS S3 and Route 53.

---

## 🚀 Table of Contents

- [Overview](#overview)
- [Directory Structure](#directory-structure)
- [Backend Infrastructure](#backend-infrastructure)
  - [Terraform Modules](#terraform-modules)
- [Frontend Application](#frontend-application)
- [Deployment & Maintenance](#deployment--maintenance)
- [Ongoing Developments](#ongoing-developments)
- [Future Enhancements](#future-enhancements)
- [License](#license)

---

## Overview 🌟

**CARMART Marketplace** is designed with scalability, security, and cost-efficiency in mind. Key highlights include:

- **Backend**: AWS infrastructure is provisioned using Terraform, leveraging services like API Gateway, Cognito, DynamoDB, Lambda, and S3.
- **Frontend**: A dynamic single-page application (SPA) built with React for an engaging user experience.
- **Cost Optimization**: Integration of an AI-powered cost optimizer via Infracost ensures your AWS spend is always in check.
- **Ongoing Innovations**: We're developing an AI optimized cloud tester recovery platform and refining our deployment strategy using AWS S3 & Route 53.

---

## Directory Structure 📂

```plaintext
CARMART
├── backend
│   ├── modules
│   │   ├── api_gateway
│   │   │   ├── main.tf
│   │   │   ├── variable.tf
│   │   │   ├── output.tf
│   │   ├── cognito
│   │   │   ├── main.tf
│   │   │   ├── variable.tf
│   │   │   ├── output.tf
│   │   ├── dynamodb
│   │   │   ├── main.tf
│   │   │   ├── variable.tf
│   │   │   ├── output.tf
│   │   ├── lambda
│   │   │   ├── lambda-code/
│   │   │   ├── lambda_one.zip
│   │   │   ├── lambda_two.zip
│   │   │   ├── lambda_three.zip
│   │   │   ├── main.tf
│   │   │   ├── variable.tf
│   │   │   ├── output.tf
│   │   ├── s3
│   │   │   ├── main.tf
│   │   │   ├── variable.tf
│   │   │   ├── output.tf
│   ├── infracost_output.json
│   ├── output.tf
│
├── frontend
│   ├── my-react-app
│   │   ├── public/
│   │   ├── src
│   │   │   ├── assets/
│   │   │   │   ├── SellCarPage.css
│   │   │   │   ├── SellCarPage.js
│   │   │   │   ├── JoinMechnaics.css
│   │   │   │   ├── JoinMechnaics.js
│   │   │   ├── components/
│   │   │   │   ├── browse-cars.js
│   │   │   │   ├── browse-cars.css
│   │   │   │   ├── find-mechanics.css
│   │   │   │   ├── find-mechanics.js
│   │   │   │   ├── Navbar.js
│   │   │   ├── App.js
│   │   │   ├── Home.js
│   │   │   ├── index.js
│   │   │   ├── singing.js
│   │   ├── package.json
│   │   ├── README.md
```

---

## Backend Infrastructure ⚙️

Our backend leverages **Terraform** to manage AWS resources with a modular structure. Here’s a quick overview of the modules:

### Terraform Modules

- **API Gateway**  
  - **Files:** `main.tf`, `variable.tf`, `output.tf`  
  - **Purpose:** Routes HTTP requests to the Lambda functions, providing a secure and scalable interface.  
  - **Emoji:** 🌐

- **Cognito**  
  - **Files:** `main.tf`, `variable.tf`, `output.tf`  
  - **Purpose:** Manages user authentication and authorization securely.  
  - **Emoji:** 🔒

- **DynamoDB**  
  - **Files:** `main.tf`, `variable.tf`, `output.tf`  
  - **Purpose:** Stores marketplace data (users, listings, transactions) in a highly performant NoSQL database.  
  - **Emoji:** 🗄️

- **Lambda**  
  - **Files & Artifacts:**  
    - Terraform files: `main.tf`, `variable.tf`, `output.tf`  
    - Code: `lambda-code/` and zipped Lambda functions  
  - **Purpose:** Implements the business logic using serverless functions.  
  - **Emoji:** ⚡

- **S3**  
  - **Files:** `main.tf`, `variable.tf`, `output.tf`  
  - **Purpose:** Stores static assets, backups, and media content.  
  - **Emoji:** 🗂️

Additionally, you’ll find:
- **infracost_output.json**: Contains cost estimations from Infracost.
- **output.tf**: Aggregates outputs from various modules.

---

## Frontend Application 🎨

The **frontend** is a React-based single-page application (SPA) located under `frontend/my-react-app`. It includes:

- **Pages & Components:**
  - **Home.js & App.js:** Main landing and routing components.
  - **Components Folder:** Contains reusable components such as:
    - **browse-cars.js / browse-cars.css:** For listing available vehicles.
    - **find-mechanics.js / find-mechanics.css:** To help users connect with mechanics.
    - **Navbar.js:** A responsive navigation bar.
    - **SellCarPage.js / SellCarPage.css & JoinMechnaics.js / JoinMechnaics.css:** For seller and mechanic interactions.
- **Static Assets:** Located in the `public` and `assets` folders.
- **Emoji:** 🎉, 🚀

---

## Deployment & Maintenance 🔧

### Deployment Workflow

1. **Terraform Deployment:**
   ```bash
   terraform init
   terraform validate
   terraform plan
   terraform apply
   ```
2. **Frontend Deployment:**
   ```bash
   cd frontend/my-react-app
   npm install
   npm run build
   npm start
   ```
   *Or deploy the built files to a static hosting service like AWS S3 with CloudFront.*

3. **Enhanced Deployment Strategy:**  
   We are transitioning to using **AWS S3** for hosting static assets along with **AWS Route 53** for DNS management to ensure high availability and scalability. 🌐✨

### Maintenance

- **Regular Updates:** Keep your Terraform modules and React dependencies up to date.
- **Cost Monitoring:** Use `infracost_output.json` and our AI cost optimizer to keep AWS costs in check.
- **Security Audits:** Regularly review AWS security configurations.

---

## Ongoing Developments 🔥

This project is a work in progress! Current enhancements include:

- **AI Optimized Cloud Tester Recovery Platform:**  
  Developing an AI-powered recovery platform to improve resiliency and automate recovery testing. This solution will also be available as a commercial offering.

- **Deployment Enhancements:**  
  Refining our deployment process using AWS S3 for static asset hosting and AWS Route 53 for DNS management.

---

## Future Enhancements 🚀

- **Enhanced Monitoring:** Integration with AWS CloudWatch for real-time metrics.
- **CI/CD Pipeline:** Implement continuous integration and deployment workflows.
- **User Analytics:** Add analytics to better understand user behavior.
- **Expanded AI Capabilities:** Enhance predictive analytics for resource management and cost optimization.

---

## License 📄

This project is licensed under the [MIT License](LICENSE).

---

Happy coding! Feel free to open issues or contribute. 😄👍
```
