console.log("FrontEnd JS Executed");

function itemTemplate(item) {
  return `<li
            class="list-group-item list-group-item-info d-flex align-items-center justify-content-between border border-1">
            <span class="item-text">${item.reja}</span>
            <div>
                <button data-id="<${item._id}>" class="edit-me btn btn-secondary btn-sm mr-1">Edit</button>
                <button data-id="<${item._id}>" class="delete-me btn btn-danger btn-sm mr-1">Delete</button>
            </div>
        </li>`;
}

let createField = document.getElementById("create-field");

document
.getElementById("create-form")
.addEventListener("submit", function(e) {
  e.preventDefault();
  // axios package orqali create-item url i ga post qilamz. Axios json dan kelgan data automatic object ga aylantirib beradi va jonatetganda ham json data sifatida jonatib berad.
  axios
    .post("/create-item", { reja: createField.value }) // post methodida url bilan request body qismidan yuboradgan qismini pass qilamiz. Axios bu modern post va external package
    .then((response) => {
      document
        .getElementById("item-list")
        .insertAdjacentHTML("beforeend", itemTemplate(response.data));
      createField.value = "";
      createField.focus();
    })
    .catch((err) => {
      console.log("Please try again");
    });
});

document.addEventListener("click", function (e) {
  // delete oper
  console.log("STEP1: FrontEnd => Backend");
  console.log(e.target);
  if (e.target.classList.contains("delete-me")) {
    if (confirm("Do you want to delete this item?"))
      console.log("STEP4: Backend => Frontend to confirm");
    {
      axios
        .post("/delete-item", { id: e.target.getAttribute("data-id") })
        .then((response) => {
          console.log("STEP7: Backend => Frontend qaytish");
          console.log(response.data);
          e.target.parentElement.parentElement.remove();
          console.log("STEP8: Row Removed");
        })
        .catch((err) => {
          console.log("Please try again!!!");
        });
    }
  }

  // edit oper
  if (e.target.classList.contains("edit-me")) {
    let userInput = prompt(
      "Edit your plan",
      e.target.parentElement.parentElement.querySelector(".item-text").innerHTML
    );
    console.log("STEP4: Backend => Frontend to edit");
    if (userInput) {
      axios
        .post(
          "/edit-item",
          {
            id: e.target.getAttribute("data-id"),
            new_input: userInput,
          },
          console.log("STEP5: new_input created and send to Backend")
        )
        .then((response) => {
          console.log("STEP8: Backend => Frontend qaytish");
          console.log(response.data);
          e.target.parentElement.parentElement.querySelector(
            ".item-text"
          ).innerHTML = userInput;
          console.log("STEP9: Edit executed");
        })
        .catch((err) => {
          console.log("Please try again!");
        });
    }
  }
});

document.getElementById("clean-all").addEventListener("click", function() {
    axios.post("/delete-all", {delete_all: true}).then((response) => {
        alert(response.data.state);
        document.location.reload();
    });
});