
document.addEventListener("DOMContentLoaded", function(event) { 


  // Function that gets the CSRF cookie setted in the browser

  const getCookies = () =>
    document.cookie
      .split(';')
      .reduce((res, c) => {
        const [key, val] = c.trim().split('=').map(decodeURIComponent)
        const allNumbers = str => /^\d+$/.test(str);
        try {
          return Object.assign(res, { [key]: allNumbers(val) ?  val : JSON.parse(val) })
        } catch (e) {
          return Object.assign(res, { [key]: val })
        }
    }, {});


  const cookies = getCookies();
  const token = cookies['CSRF-TOKEN'];
  console.log(token);



  /*

    Creating button that makes a POST request including the 
    CSRF token in the header

  */

  const postCsrf = document.createElement("div");
  postCsrf.setAttribute("id","postCsrf");
  postCsrf.setAttribute("class","button");
  const postCsrfContent = document.createTextNode("Post with cookie"); 
  postCsrf.appendChild(postCsrfContent); //añade texto al div creado. 

  postCsrf.addEventListener("click",() => {
    // Make a request using the Fetch API
    fetch('/process', {
      headers: {
        'CSRF-Token': token // <-- is the csrf token as a header
      },
      method: 'POST',
      body: {
        favoriteColor: 'blue'
      }

    }).then(response=>response.text())
    .then(data=>{
       console.log(data); 
       postCsrf.append(` => ${data}`);
       
      })
    .catch(error => {
      console.log('There was a problem in Fetch call:' + error.message);
    });
  });


  document.body.appendChild(postCsrf);




  /*

    Creating button that makes a POST request WITHOUT the 
    CSRF token in the header, this will force an error

  */

 const postForbiden = document.createElement("div");
 postForbiden.setAttribute("id","postForbiden");
 postForbiden.setAttribute("class","button");
 const postForbidenContent = document.createTextNode("Post without cookie"); 
 postForbiden.appendChild(postForbidenContent); //añade texto al div creado. 

 postForbiden.addEventListener("click",() => {
   // Make a request using the Fetch API
   fetch('/process', {
     headers: {
       // No csrf token as a header
     },
     method: 'POST',
     body: {
       favoriteColor: 'blue'
     }

   }).then(data => {
     console.log(data);
     postForbiden.append(` => ${data.statusText}`);
   });
 });


 document.body.appendChild(postForbiden);

});



