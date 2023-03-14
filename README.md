## FrendZy Mini Social Network

FrendZy is a web based mini social networking app that encompasses the basic social network functionalities such as user login and creation, alongside profile creation as well as the capability to connect with other users on the website based on the friend request and acceptance model.

## Technological Stack [MERN]

 - Frontend : React
	 - The frontend UI was developed using the React Library for JS, since it offered an ease of customisation and control of the DOM.
	 
 - Backend : Nodejs and Express
	 - The backend was built out a combination of *nodejs* and *express* with a majority of the database operation handled via various API endpoints built using *express* , the CRUD operations to the the Mongo Database was done through the use of the *mongoose* library.
	 
 - Database : Mongo DB Atlas
	 - Mongo DB's Cloud based Atlas cluster based database was used for storage and manipulation of user data, where each document was representative of an individual user.
 
## Application Features
 - **User Creation** : The application features a user creation window which checks for duplicated userids and emails as well as ensured email validity checks and a password length/confirmation check with each error input providing a prompt to the user in regards to the error made.
		 - *The hashing of password was performed using the bcrypt package inorder to ensure secure password transfer.*
		 
 - **User Login** : The user login mechanism makes use of a backend authorization API which checks for both the validity of a username as well the valid password check prompting the user about the error in the same. The login API also returns a JWT authorization token which is then used in conjucntion with the username in the subsequent API calls made to the backend.
 - *Logging out a particular user in accomplished through removal of the JWT token from the session store which prohibits all further API calls and prevent the user from performing any potential action on the platform*
 
 - **User Searches** : The application also features a search bar that allows the authenticated user to search for a particular user on the platform and at the same time initiate a friend request or perform a action depending on their current connection state.
 
 - **Connection Model**: The connection between users were handled using the following model.
		 
|Current Connection Status| Operation(s) Available |
|--|--|
|Not connected?|Send Connection Request  |
|Connection Request Sent?|Cancel Connection Request|
|Connection Request Recieved?|Accept/Decline Connection Request|
|Connected?|Unfriend User|

The user had the ability to search up a particular user using the search bar and perform the required action depending upon their connection status at the moment.

 - **Friends and Mutual Friends View** : Upon searching for a particular user, the current user could see the list of friends that the requested user has as well as their mutual friends.
