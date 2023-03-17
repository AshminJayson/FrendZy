## FrendZy Mini Social Network

FrendZy is a web based mini social networking app that encompasses the basic social network functionalities such as user login and creation, alongside profile creation as well as the capability to connect with other users on the website based on the friend request and acceptance model.

## Task and Solution

**Task**

Create a mini social network. The application should have features like:-

· Users should be able to sign up/sign in, and create a profile for themselves.

· Search for other users.

· View other users' profiles & make them friends/unfriend them.

· View a list of mutual friends between users. A mutual friend is a user who is a friend of two other users who may or may not know each other.


**Solution**

The solution to the task at hand that I chose upon was to create a web application that enabled users to create an account and access the platform through which they can further interact with the other users by sending them connection requests which can be declined or accepted by the user on the other side. This platform would also be able to list out mutual friends and also the friends list of each user.

The backend of the web application is built using nodejs and express with all major operations being performed through the use of API calls from the frontend. This enables a higher degree of security which when later combined with the Json Web Token based authentication can prevent access to the API by means of simple frontend routing and invalid login.

Username was chosen as unique parameter differentiating each user, and checking for duplicate usernames is performed during the profile creation alongside email validity and password length check.

A search bar is also implemented in order to enable users to search for other users and send connection requests and also to unfriend/cancel any existing connection.

The list of friends of one particular user and the mutual friends between two users are generated by comparing the friends list of the two users at the backend, and this list is send as response onto the frontend for display.

## Video link of Application Demonstration

[Video Demonstration of FrendZy-Mini Social Network](https://drive.google.com/file/d/1ReDzQ1O4p57taIZ4nM5dvsOr1P0vKks7/view?usp=sharing)

## Technological Stack [MERN]

 - Frontend : React
	 - The frontend UI was developed using the React Library for JS, since it offered an ease of customisation and control of the DOM.
	 
 - Backend : Nodejs and Express
	 - The backend was built out a combination of *nodejs* and *express* with a majority of the database operation handled via various API endpoints built using *express* , the CRUD operations to the the Mongo Database was done through the use of the *mongoose* library.
	 
 - Database : Mongo DB Atlas
	 - Mongo DB's Cloud based Atlas database was used for storage and manipulation of user data, where each document represented an individual user.

 
## Application Features
 - **User Creation** : The application features an user creation window which checks for duplicated user ids and emails, ensures email validity check and a password length/confirmation check with each error input providing a prompt to the user in regards to the error made.
		 - *The hashing of passwords was performed using the bcrypt package to ensure secure password transfer.*
		 
 - **Profile Creation** : Upon signing up, the user would be greeted with a profile creation window that would ask for basic details such as a profile image url, user description, the user's date of birth and their gender.
		 
 - **User Login** : The user login mechanism makes use of a backend authorization API which checks for both the validity of a username and a valid password check prompting the user about the error. The login API also returns a JWT authorization token which is used in conjucntion with the username for the subsequent API calls made to the backend.
 - *Logging out of a particular user is accomplished through removal of the JWT token from the session store which prohibits all further API calls and prevent the user from performing any potential actions on the platform*
 
 - **User Searches** : The application also features a search bar that allows the authenticated user to search for any other user and initiate a friend request or perform a action depending on their current connection state.
 
 - **Connection Model**: The connection between users were handled using the following model.
		 
|Current Connection Status| Operation(s) Available |
|--|--|
|Not connected?|Send Connection Request  |
|Connection Request Sent?|Cancel Connection Request|
|Connection Request Recieved?|Accept/Decline Connection Request|
|Connected?|Unfriend User|

The user had the ability to search up a particular user using the search bar and perform the required action depending upon their connection status at the moment.

 - **Friends and Mutual Friends View** : Upon searching for a particular user, the current user could see the list of friends that the requested user has as well as their mutual friends.



## Running the application

 **Running the Backend server**
 1. Clone the github repository `https://github.com/AshminJayson/FrendZy.git`
 2. Change directory `cd FrendZy`
 3. Install required npm packages at server side by running `npm install`
 4. Create a .env file with the following lines containing the bcrypt hash, JWT token and Mongo Credentials
	  `SALT_ROUNDS=10`
	  `JWT_ACCESS_TOKEN='4df6db4894515389961367f37e7e8d0e76c90c398b085f8748202b2bc7cc13fa7229f6755846fea1869e5077996f65ba2bfadfeb35c53dddfafd8f7f9f43ec32'`
	  `MONGO_USERNAME='frendzyadmin'`
	  `MONGO_PASSWORD='frendzyadmin'`
   5. Run the backend server via  `npm run start` 
 
 **Ensure that the server is running on port 8082 else the API end points will need to be modified**
  
**Running the Frontend Application**
 1. Switch to the front end directory from FrendZy  `cd frenzy`
 2. Install required npm packages via  `npm install`
 3. Run the front end application via `npm run dev`  ( or  `npm run build` followed by `npm run preview`)


