console.log('client side javascript');

var search = document.getElementById("locationName");
var weatherForm = document.getElementById("searching");
var message1= document.querySelector('#msg1');
var message2= document.querySelector('#msg2');



weatherForm.addEventListener('click', (e) => {
    e.preventDefault();
    const location = search.value;
    message1.textContent = 'Loading...';
    message2.textContent = '';
         
    fetch('/weather?address='+location ).then((response)=>{
        response.json().then((data)=>{
            if(data.error){
            message1.textContent = data.error
        }
            else{ 
            message1.textContent = data.location
            message2.textContent = data.data
            }
        })
   
    })
})

//var search = document.querySelector('input')

   // weatherForm