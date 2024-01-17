
// Declaring variables
var urlHolder = [];
var urlName = document.getElementById("urlName");
var urlFormat = document.getElementById("url");
var tableBodyData = document.getElementById("tableBody");
var modifyBtn = document.getElementById("addBtn");
var nameErr = document.getElementById("nameErr");
var urlErr = document.getElementById("urlErr");
var btnDelete;
var containerOfData;
var updatedIndex;
var savedUrls = "urlsInfo";

//checking for data in local storage to display
if(localStorage.getItem(savedUrls)){
  urlHolder =JSON.parse(localStorage.getItem(savedUrls));
  displayUrls(urlHolder);
}

//function to add urls in the url array and them to local storage
function addUrl(){
  if(modifyBtn.innerText=="Update"){
    var updatedurl = {
      name: urlName.value,
      url: urlFormat.value,
    }
   if (urlHolder[updatedIndex].name === updatedurl.name &&
      urlHolder[updatedIndex].url === updatedurl.url 
      ){
    alert("You didn't make any changes");
    return;
   }
   if(websiteNameValidation() && urlValidation()){
    if(checkRedundancy(updatedurl)){
      alert("this url data is duplicated");
      return;
    }
 urlHolder[updatedIndex].name= urlName.value;
 urlHolder[updatedIndex].url= urlFormat.value; 
 modifyBtn.innerText = "Submit";
 modifyBtn.classList.replace('btn-warning', 'btn-info');
 btnDelete[updatedIndex].classList.remove("disabled");
  }else{
    alert("Please, Fill in the inputs correctly");
    return
  }
    }else{
    if(websiteNameValidation() && urlValidation()){
    var url = {
      name: urlName.value,
      url: urlFormat.value,

  };
  if(checkRedundancy(url)){
    alert("this url is duplicated");
    return;
  }
  urlHolder.push(url);
}else{
  alert("Please, Fill in the inputs correctly");
  return;
};
  }
  saveToLocalStorage(urlHolder);
  displayUrls(urlHolder);
  updateFormValues();
}

  //generic function to display urls 
  function displayUrls(urls) {
    if(urls.length ==0){
tableBodyData.innerHTML=`
<tr class="d-table-row">
    <td class="d-table-cell" colspan="7">
      <div class="alert alert-danger">No Websites!</div>
    </td>
  </tr>`
    }else{
    containerOfData = "";
for(var i=0; i< urls.length ; i++){
    containerOfData+=`
<tr class="d-table-row">
<td class="d-table-cell fw-bold">${i}</td>
    <td class="d-table-cell fw-bold">${urls[i].name}</td>
    <td class="d-table-cell fw-bold">
    <button class=" text-white fw-bold btn visitBtn" onclick="visitUrl(${i})" role="button" aria-disabled="true"><i class="fa-solid fa-eye pe-2" style="color: white;"></i>Visit</button></td>
    <td class="d-table-cell">
      <button onclick="updateurl(${i})"
        class="btn btn-primary fw-bold"
      >
        Update
      </button>
    </td>
    <td class="d-table-cell">
      <button onclick="deleteurl(${i})"  
      id="deleteBtn"
        class="btn btn-danger fw-bold ToDelete"
      >
      <i class="fa-solid fa-trash-can"></i>
        Delete
      </button>
    </td>
  </tr>`;
}
tableBodyData.innerHTML=containerOfData;
  }
}

  //function to clear the input values
  function updateFormValues(mark){
    urlName.value = mark? mark.name: "";
    url.value = mark? mark.url: "";
    }

  //function for deleting urls
    function deleteurl(index){
      urlHolder.splice(index, 1);
      saveToLocalStorage(urlHolder);
      displayUrls(urlHolder);
    }


//function to update a url
function updateurl(index){ 
  updateFormValues(urlHolder[index]);
  modifyBtn.innerText = "Update";
  modifyBtn.classList.replace('btn-info', 'btn-warning');
  btnDelete= document.getElementsByClassName("ToDelete");
  btnDelete[index].classList.add("disabled");
  updatedIndex = index;
};

//function to check repeated urls
function checkRedundancy(urlObj){
  for(var i=0 ; i<urlHolder.length ; i++){
      if( urlHolder[i].name ===urlObj.name &&
          urlHolder[i].url ===urlObj.url &&
          urlHolder[i].category ===urlObj.category &&
          urlHolder[i].desc ===urlObj.desc
        ){
          return true;
      }
    }
}

function saveToLocalStorage(savedItem){
  localStorage.setItem(savedUrls, JSON.stringify(savedItem));
}

function websiteNameValidation(){
  var regex = /^[A-Za-z]{3,}$/
  if(regex.test(urlName.value)){
    urlName.classList.add("is-valid");
    urlName.classList.remove("is-invalid");
    nameErr.classList.replace("d-block", "d-none");
    return true;
  }else{
    urlName.classList.add("is-invalid");
    urlName.classList.remove("is-valid");
    nameErr.classList.replace("d-none", "d-block");
    return false;
  }
};

function urlValidation(){
  var regex = /^(https:\/\/www\.)?[a-zA-Z]{2,}\.[a-zA-Z]{2,}(\.[a-zA-Z]{2,3})?$/
  if(regex.test(url.value)){
    url.classList.add("is-valid");
    url.classList.remove("is-invalid");
    urlErr.classList.replace("d-block", "d-none");
    return true;
  }else{
    url.classList.add("is-invalid");
    url.classList.remove("is-valid");
    urlErr.classList.replace("d-none", "d-block");
    return false;
  }
}


function visitUrl(i){
  window.open(urlHolder[i].url, '_blank');
}