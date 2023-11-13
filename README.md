# Audioflow API 

This project is an API built with Express and uses Firebase as its database.

## Technologies Used

- Nodejs (18.xx)
- Express
- Firebase
- Git

## Setup

To run this project, you will need to follow these steps:

1. Clone the repository.
2. Install the dependencies using `npm install`.
Set up Firebase in your project:
   - Go to [Firebase](https://firebase.google.com)
   - Click on the "Get started" button
   - Create a new project and follow the steps provided by the page
   - Once the project is created, go to Settings > Project Configuration > Service Accounts
   - At the bottom of the page, click on "Generate new private key", then "Generate"
   - This will download a JSON file. Copy the contents of this file
   - Paste the copied contents into a new file in the `src/firebase/` directory of your project, where the `credentials.example.json` file is located
   - Rename this new file to `credentials.json`
4. Set up your Firebase Storage and get the URL.
5. Create a `.env` file in the root directory of your project and add the following environment variables (you can copy from the .env.example file):

```properties
PORT=Your_Port_Number
JWT_SECRET_KEY=Your_JWT_Secret_Key 
STORAGE_URL=Your_Firebase_Storage_URL
```
6. Run the app using the command `npm run dev`.

