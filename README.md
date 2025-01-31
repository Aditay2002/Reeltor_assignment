# Reeltor
Deployed link ---> https://reeltor-zgyk.onrender.com
1. User Authentication
  * Sign up
      request--> POST
      api end point -->https://reeltor-zgyk.onrender.com/api/v1/auth/signUp
      req body
               {
                  "name": "Phoenix",
                  "email": "phoenixWa@exam.com",
                  "password": "$2b$10$hashedpassword789",
                  "role": "admin",
                  "mobileNumber": "5551234567",
                  "bio": "Passionate about AI and machine learning.",
                  "availabilityTime": [
                    { "from": "00:00", "to": "01:00" },// time should be 24 hour formate
                    { "from": "04:00", "to": "08:00" }
                  ]
                }


   * Login
        request--> POST
        api end point -->https://reeltor-zgyk.onrender.com/api/v1/auth/login 
        req body 
               {
                    "email": "phoenixWa@exam.com",
                   "password": "$2b$10$hashedpassword789"
               } 

2. Profile Management

   * Profile Updates
                  authorizaton token--> REQUIRED
                  request--> PATCH
                  api end point -->https://reeltor-zgyk.onrender.com/api/v1/user/update
                  req body 
                       {
                        "name": "Phoenix",
                        "email": "phoenixwa@example.com",
                       }



4. Notification System
                authorizaton token--> REQUIRED
                request--> POST
                api end point -->https://reeltor-zgyk.onrender.com/api/v1/user/update
                req body 
                      {
	                      "message": "New company policy update released.",
                          "recipientIds": ["679a558b443bf50bf0308a10","679a76498cd874fb34b14493"]
    
                      }


* USER LOGIN CREDENTIALS
               {
                "email": "olivia78@exam.com",
                "password": "Olivia@202",
               }

* ADMIN LOGIN CREDENTIALS
                    {
                        "email": "aiden23@exam.com",
                        "password": "Aiden@456",
                    }


  * LIST OF USER ID'S IN THE DATABASE which can be used for sending notifications.
                         [679aa54e24f0f7b28df712ad,679aa5c224f0f7b28df712df,679aa5e024f0f7b28df712f8,679aa61824f0f7b28df71311]                  