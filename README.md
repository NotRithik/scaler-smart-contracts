# Scaler School of Technology - Smart Contracts Course

Welcome to the project repository for the Scaler School of Technology's **Smart Contracts Course**. This repository is designed as a template for your final project submission. Each group is expected to fork this repository, create a new branch, and make contributions to their fork before submitting their work via a pull request.

---

## 📖 Project Overview

This repository contains the final project submission for **Group <Your Group Number>**. The project is part of the Smart Contracts Course and is designed to apply the knowledge you have gained throughout the course.

Each group has the freedom to:
- **Choose any blockchain** platform (e.g., Ethereum, Solana, Polygon, etc.).
- **Select any project topic** that aligns with the principles of blockchain and smart contracts.

---

## 📋 Project Details

 

- **Project Name**: _CrowdFunding Contract_
- **Blockchain Platform**: _Ethereum_
- **Network**: _TestNet._
- **Deployed Smart Contract Address**: _0xd81BBA37851a547B50f9123B2FC092292FD88aC4_
- **Wallet Address**: _0x654778D430373edc566926313449E41C6531C29E_
 
- **Team Members**:
  1. **Name (GitHub ID)**: _Siddharth R   , github -> https://github.com/isid555
  
- **Project Description**:  
  This Solidity smart contract implements a simple crowdfunding platform where contributors can donate funds to a campaign. If the campaign reaches its target amount, the manager can create spending requests. Contributors can vote on these requests, and once a majority approves, the funds can be transferred to the recipient.


---

## 🛠️ Instructions

Follow these steps to complete and submit your project:

1. **Fork this Repository**:
   - Click the "Fork" button at the top right of this page.

2. **Clone Your Fork**:
   - Clone the repository to your local machine:
     ```bash
     git clone https://github.com/<your-github-username>/<repo-name>.git
     cd <repo-name>
     ```

3. **Create a New Branch**:
   - Name the branch after your group:
     ```bash
     git checkout -b group-<group-number>
     ```

4. **Fill in the Project Details**:
   - Update the "Project Details" section of this `README.md` file with your project specifics.

5. **Add Your Files**:
   - Place your smart contracts, scripts, documentation, and any other necessary files in the appropriate directories.
   - Work on your actual project!
   - Add your frontend code to the `frontend/` directory.

7. **Commit and Push**:
   - Stage and commit your changes:
     ```bash
     git add .
     git commit -m "Initial submission for Group <group-number>"
     ```
   - Push the branch to your fork:
     ```bash
     git push origin group-<group-number>
     ```

8. **Submit a Pull Request (PR)**:
   - Open a pull request to the upstream repository with the same branch name (`group-<group-number>`).

9. **Update the Group Spreadsheet**:
   - Add your project details and team members to the [shared Google Spreadsheet](https://docs.google.com/spreadsheets/d/1C_mDUio9TwyUG8cXcGF81EQPDmd1Q-l-13LXyUnXVBE/edit?usp=sharing).

---

## 📂 Directory Structure

```plaintext
/
├── README.md               # This file
├── .gitignore              # Ignore unnecessary files
├── contracts/              # Place smart contracts here
├── tests/                  # Place test files here
├── migrations/             # Migration scripts (optional)
├── project/                # Placeholder for group project files
├── frontend/               # Place frontend code here
└── package.json            # Node.js-based dependencies (if applicable)
```

---

## 📝 Guidelines

- **Branch Naming**: Use `group-<group-number>` as your branch name.
- **Documentation**: Provide clear and concise documentation for your project.
- **Testing**: Ensure your contracts are thoroughly tested before submission.
- **Innovation**: Feel free to get creative and explore unique project ideas!

---

Good luck!
