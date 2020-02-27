# Social Network

![Gif of Social Network](socialnetwork.gif)



**A single page application for users to interact with other users, built in React.**

This was the first time I was using React and I loved it! It was a real melon twister to wrap my head around, especially later on when I started using Redux and Socket.io, but it was so much fun and I'm very happy with how it turned out. When it came to design, I styled it mobile first from scratch, drawing my own icons and everything. May or may not look familiar, but sometimes the smartest thing you can do is a master copy.



**Features**

* Node.js with Express and a SQL database backend

* Storing user information in SQL, uploading profile pictures to AWS S3

* Authentication with Node, Bcrypt and Cookie-Session, where the cookies are protected from malicious tampering with using a csurf package

* Reset password functionality: A key with an expiration date gets stored in a Redis Database and gets send out via AWS SES. If the entered key checks out, the user can change the password.

* Edit profile functionality

* Find other users functionality

* Friend other users functionality with SQL in the back and React in the front

* Live Chat with socket.io

  

- React Redux frontend
- UI master copy of Instagram with CSS
- Mobile first

