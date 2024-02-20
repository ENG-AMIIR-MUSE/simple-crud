let submitBtn = document.querySelector("#addBtn");
let showForm = document.querySelector("form");
let closeForm = document.querySelector(".close");
let inputs = document.querySelectorAll("form .wrapper input");
let tbody = document.querySelector("table tbody");
let message = document.querySelector(".message");
let username = document.querySelector("#username");
let phone = document.querySelector("#phone");
let email = document.querySelector("#email");
let registertBtn = document.querySelector("#submit");


let users = JSON.parse(localStorage.getItem("users")) || [];
let imageSource ;
const fileInput = document.getElementById('file');
const previewImage = document.getElementById('image');
let searchInput  = document.querySelector("#searchInput")

let indexToUpdate  = undefined
localStorage.setItem("users", JSON.stringify(users));
submitBtn.addEventListener("click", () => {
  showForm.classList.toggle("show");
});
closeForm.addEventListener("click", function () {
  showForm.classList.toggle("show");
});


function validate() {
  if (username.value == "" || phone.value == "" || email.value == "") {
    message.classList.add("showMessage");
  } else {
    message.classList.remove("showMessage");
    add({ username, phone, email });
  }
}
function add({}) {
    const imgData  = img?.src
    // console.log(img)
    if(registertBtn.innerHTML  == 'Register'){
       console.log(imgData)
        users.push({
          username: username.value,
          phone: phone.value,
          email: email.value,
          image:imageSource.src
        });
        username.value = ''
        phone.value = ''
        email.value = ''
        imageSource.src = ''
    }else{
        // console.log(img)
        users[indexToUpdate].username = username.value
        users[indexToUpdate].phone = phone.value
        users[indexToUpdate].email = email.value
        users[indexToUpdate].image = imageSource.src ? imageSource.src : users[indexToUpdate].image
        // users[indexToUpdate].image = imageSource?.src ?? users[indexToUpdate].image;
        registertBtn.innerHTML = 'Register'

        username.value = ''
        phone.value = ''
        email.value = ''

    }
  localStorage.setItem("users", JSON.stringify(users));
  display(users);
  showForm.classList.toggle("show");
}
registertBtn.addEventListener("click", function (e) {
   
  e.preventDefault();
  validate();
});

display(users);
function display(users) {
  let output = "";
  let i = 1;
  let msg = `<tr> <h1> no data <h1/> </tr>`;
  if (users.length == 0) {
    return (tbody.innerHTML = msg);
  }
  users.forEach((data, index) => {
    // console.log(data.image)
    output += `<tr>
        <td> ${i}</td> 
        <td> <img src  = "${data.image}"></td> 
        <td> ${data.username}</td> 
        <td> ${data.phone}</td> 
        <td> ${data.email}</td> 
        <td>
         <i class="fa fa-edit" aria-hidden="true" onClick =  "editUser(${index})" >
         </i> <i class="fa fa-trash" onClick = "removeUser(${index})" aria-hidden="true"></i></td> 
        `;
    i++;
    output += `</tr>`;
  });
  // console.log(output)
  tbody.innerHTML = output;
}
function removeUser(index) {
  users.splice(index, 1);
  localStorage.setItem("users", JSON.stringify(users));
  display(users);
}

function editUser(index) {
  showForm.classList.toggle("show");
  username.value = users[index].username;
  phone.value = users[index].phone;
  email.value = users[index].email;
  let img  = `<img src = ${users[index].image} style = "width:100%; height:100%;" id = 'img'>`
  previewImage.innerHTML = img

  registertBtn.innerHTML = "update";
  indexToUpdate = index
}
fileInput.addEventListener('change', handleFileSelect);
function handleFileSelect(event) {
    const file = event.target.files[0];
    if (file) {
        // Check if the file is an image
        if (file.type.startsWith('image/')) {
            const reader = new FileReader();

            reader.onload = function (e) {
                // Set the source of the image to the loaded data URL
                let img  = `<img src = ${e.target.result} style = "width:100%; height:100%; object-fit:cover;" id = 'img'>`
                previewImage.innerHTML = img

                imageSource = document.querySelector("#img")
                // console.log(imageSource)
            };
            // Read the image file as a data URL
            reader.readAsDataURL(file);
        } else {
            alert('Please select a valid image file.');
            // Clear the input to allow reselection
            fileInput.value = '';
        }
    }
}
// console.log(imageSource)

closeForm.addEventListener('click',function(){
    clearInputFields()
})

function clearInputFields() {
    username.value = '';
    phone.value = '';
    email.value = '';
    previewImage.innerHTML = ''; // Clear the image preview
    imageSource = null;
}



// search  
searchInput.addEventListener('input',function(){
 const  searchValue  =  searchInput.value 

 const filteredData  =   users.filter((data)=>{
  return   data.username.toLowerCase().match(searchValue.toLowerCase())
 })
 

 display(filteredData)

})