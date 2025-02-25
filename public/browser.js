console.log("FrontEnd JS Executed");

function itemTemplate(item) {
  return `<li
            class="list-group-item list-group-item-info d-flex align-items-center justify-content-between border border-1">
            <span class="item-text"><${item.reja}></span>
            <div>
                <button data-id="<${item._id}>" class="edit-me btn btn-success btn-sm mr-1 me-md-2">Edit</button>
                <button data-id="<${item._id}>" class="delete-me btn btn-danger btn-sm mr-1 me-md-2">Delete</button>
            </div>
        </li>`;
}

let createField = document.getElementById("create-field");

document
.getElementById("create-form")
.addEventListener("submit", function(e) {
    e.preventDefault();

    axios
    .post("/create-item", { reja: createField.value })
    .then(response => {
        document.getElementById("item-list")
        .insertAdjacentHTML("beforeend", itemTemplate(response.data));
        createField.value = "";
        createField.focus();
    })
    .catch(err => {
        console.log("Please try again")
    });
})