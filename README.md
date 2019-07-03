# CSRF Example


This example shows how to protect HTTP request from CSRF attacks setting a cookie in static resources from an API and how to send the token to the server again to allow REST transactions.

### What's CSRF?


 >Cross-site request forgery, also known as one-click attack 
or session riding and abbreviated as CSRF 
(sometimes pronounced sea-surf)or XSRF,
is a type of malicious exploit of a website where
unauthorized commands are transmitted from a user
that the web application trusts.

A csrf token is generated for the forms and must be tied to the user's sessions. It is used to send requests to the server, in which the token validates them. This is one way of protecting against csrf, another would be checking the referrer header.

### Tech

This example uses some open source packages:

* [express] - Markdown parser done right. Fast and easy to extend.
* [CSURF](https://www.npmjs.com/package/csurf) - Node.js CSRF protection middleware.
* [cookie-parser](https://www.npmjs.com/package/cookie-parser) - Parse Cookie header and populate req.cookies with an object keyed by the cookie names. 


### Usage

Requires [Node.js](https://nodejs.org/) v8+ to run.

Install the dependencies and start the server.

```sh
$ npm install 
$ npm start
```

This will start the server in por 3000. After that, you just have to access to the main html in the server:

```sh
 localhost:3000
```

Two buttons will be shown, two make several POST calls. So you would see that the POST call with cookie is successful but the POST without cookie recieves a 403 response.



**by [Alejandro G-G Pérez]**





   [node.js]: <http://nodejs.org>
   [express]: <http://expressjs.com>
   [Alejandro G-G Pérez]:  <https://www.linkedin.com/in/alejandro-garc%C3%ADa-gasco-p%C3%A9rez-919265132/>