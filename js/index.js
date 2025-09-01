
//form elements 
var siteNameInput = document.getElementsByName("siteName")[0];
var siteURLInput = document.getElementsByName("siteURL")[0];
var sitesContainer = document.querySelector(".sites-container"); //show div data

//regex
var siteNameRegex= /^[A-Za-z0-9_-]{3,15}$/
var siteURLRegex = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()!@:%_\+.~#?&\/\/=]*)$/

//array of sites
var sitesList = [];

//start test local storage
if (localStorage.getItem("sites")) {
  sitesList = JSON.parse(localStorage.getItem("sites"));
  displaySites();
}

//add new site
function addSite() {
 var isNameValid = validate(siteNameRegex, siteNameInput, "nameError");
  var isURLValid = validate(siteURLRegex, siteURLInput, "urlError");
if (!isNameValid || !isURLValid) return; 


  var site = {
    sitename: siteNameInput.value,
    siteurl: siteURLInput.value,
  };

  sitesList.push(site);
    localStorage.setItem("sites", JSON.stringify(sitesList));

  displaySites();


  siteNameInput.value = "";
  siteURLInput.value = "";
}

function displaySites() {
  var content = `
    <table class="table table-bordered text-center mt-5">
      <thead>
        <tr>
          <th>Index</th>
          <th>Website Name</th>
          <th>Visit</th>
          <th>Delete</th>
          
        </tr>
      </thead>
      <tbody>
  `;
  for (var i = 0; i < sitesList.length; i++) {
    content += `
     <tr>
        <td>${i + 1}</td>
        <td>${sitesList[i].sitename}</td>
        <td>
          <button type="button" class="btn btn-success" onclick="visitSite('${sitesList[i].siteurl}')">
            <i class="fa-solid fa-eye"></i> Visit
          </button>
        </td>
        <td>
          <button type="button" class="btn btn-danger" onclick="deleteSite(${i})">
            <i class="fa-solid fa-trash-can"></i> Delete
          </button>
        </td>
      </tr>
    `;
  }
  content += `
      </tbody>
    </table>
  `;
  sitesContainer.innerHTML = content;
}



//open url (visit)
function visitSite(url) {
  window.open(url, "_blank"); 
}

//delete
function deleteSite(index) {
    Swal.fire({
  title: "Are you sure?",
  icon: "warning",
  showCancelButton: true,
  confirmButtonColor: "#3085d6",
  cancelButtonColor: "#d33",
  confirmButtonText: "Yes, delete it!"
}).then((result) => {
  if (result.isConfirmed) {
    sitesList.splice(index, 1); 
    localStorage.setItem("sites", JSON.stringify(sitesList));
  displaySites(); 
    Swal.fire({
      title: "Deleted!",
      text: "Your file has been deleted.",
      icon: "success"
    });
  }
});
  
}

//validation
function validate(regex, element, errorId) {
  if (regex.test(element.value)) {
    document.getElementById(errorId).innerText = "";
    return true;
  } else {
    document.getElementById(errorId).innerText = "Please enter a valid value!";
    Swal.fire({
  title: "Site Name or Url is not valid, Please follow the rules below :",
   html: `
        <p>Site name must contain at least 3 characters</p>
        <p>Site URL must be a valid one</p>
      `,
  icon: "warning",
});    return false;

  }
}


//submit button
var button = document.querySelector("button");
button.addEventListener("click", function(e){
    
  e.preventDefault(); 
  addSite();
});