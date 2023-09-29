const setUp = () => {
  document.querySelectorAll(".form-check-input").forEach((option) => {
    option.addEventListener("change", (e) => {
      const is_done = e.target.checked;
      const todoID = e.target.value;
      fetch(`/done/${todoID}/?is_done=${is_done}`)
        .then((response) => console.log(response.ok))
        .catch((err) => console.log(err));
    });
  });
  document.querySelectorAll(".fa-trash").forEach((trash) => {
    trash.addEventListener("click", (e) => {
      const todoID = e.target.getAttribute("data-value");
      e.target.parentElement.parentElement.remove();
      fetch(`/delete/${todoID}/`)
        .then((response) => console.log(response.ok))
        .catch((err) => console.log(err));
    });
  });
  document.querySelectorAll(".fa-pen").forEach((pen) => {
    pen.addEventListener("click", (e) => {
      let dataValue =
        e.target.parentElement.parentElement.lastElementChild.getAttribute(
          "data-value"
        );
      if (dataValue) {
        document
          .querySelector(".fa-pen")
          .parentElement.parentElement.lastElementChild.remove();
        document
          .querySelector(".fa-pen")
          .parentElement.parentElement.lastElementChild.remove();
      } else {
        const todoID =
          e.target.parentElement.parentElement.firstElementChild.getAttribute(
            "value"
          );
        e.target.parentElement.parentElement.style.padding = "0 40px 30px";
        e.target.parentElement.parentElement.style.height = "150px";
        const input = document.querySelector(".todoInput").cloneNode();
        input.placeholder = "Enter the update...";
        input.style.width = "75%";
        e.target.parentElement.parentElement.appendChild(input);
        const updateBtn = document.querySelector("#addBtn").cloneNode();
        updateBtn.textContent = "Update";
        updateBtn.id = "updateBtn";
        updateBtn.setAttribute("data-value", todoID);
        e.target.parentElement.parentElement.appendChild(updateBtn);
        updateBtn.addEventListener("click", () => {
          fetch(`update/${todoID}/${input.value}`)
            .then((res) => {
              if (res.ok) {
                e.target.parentElement.parentElement.children[2].textContent =
                  input.value;
                e.target.parentElement.parentElement.style.padding = "7px 30px";
                e.target.parentElement.parentElement.style.height = "auto";
                updateBtn.remove();
                input.remove();
              }
            })
            .catch((err) => {
              console.log(err);
            });
        });
      }
    });
  });
};
document.addEventListener("DOMContentLoaded", () => {
  setUp();
  const addBtn = document.querySelector("#addBtn");
  addBtn.addEventListener("click", () => {
    const title = document.querySelector("#id_title").value;
    fetch("/", {
      method: "POST",
      body: JSON.stringify({
        title,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if(data.message){
          return alert(data.message);
        }
        const date = new Date();
        const options = {
          year: "numeric",
          month: "short",
          day: "numeric",
          hour: "numeric",
          minute: "numeric",
          hour12: true,
        };
        const todoCreatedAt = new Intl.DateTimeFormat("en-US", options).format(
          date
        );
        const todoId = data.todo_id;
        const todoLi = document.createElement("li");
        const input = document.createElement("input");
        const label = document.createElement("label");
        const spanTitle = document.createElement("span");
        const spanCreatedAt = document.createElement("span");
        const spanDelete = document.createElement("span");
        const trashLogo = document.createElement("i");
        const spanEdit = document.createElement("span");
        const editLogo = document.createElement("i");
        todoLi.className = "li";
        input.className = "form-check-input";
        input.type = "checkbox";
        input.value = todoId;
        input.id = todoId;
        todoLi.append(input);
        label.className = "form-check-label";
        label.setAttribute("for", todoId);
        todoLi.append(label);
        spanTitle.className = "todo-text";
        spanTitle.textContent = title;
        todoLi.append(spanTitle);
        spanCreatedAt.className = "todo-text";
        spanCreatedAt.textContent = todoCreatedAt;
        todoLi.append(spanCreatedAt);
        spanDelete.className = "span-button";
        todoLi.append(spanDelete);
        trashLogo.classList = ["fa-solid fa-trash"];
        trashLogo.setAttribute("data-value", todoId);
        spanDelete.append(trashLogo);
        spanEdit.className = "span-button";
        todoLi.append(spanEdit);
        editLogo.classList = ["fa-solid fa-pen"];
        spanEdit.append(editLogo);
        document.querySelector(".todo-list").append(todoLi);
        document.querySelector("#id_title").value = "";
        setUp();
      })
      .catch((err) => {
        alert(err);
      });
  });
  document.querySelector(".user-img img").addEventListener("click", (e) => {
    document.getElementById("id_profile_picture").click();
  });
  document
    .getElementById("id_profile_picture")
    .addEventListener("change", function () {
      document.querySelector(".user-img form").submit();
    });
});
