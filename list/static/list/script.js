document.addEventListener("DOMContentLoaded", () => {
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
        document.querySelector(".fa-pen").parentElement.parentElement.lastElementChild.remove()
        document.querySelector(".fa-pen").parentElement.parentElement.lastElementChild.remove()
      }else{
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
        updateBtn.setAttribute("data-value", todoID);
        e.target.parentElement.parentElement.appendChild(updateBtn);
        updateBtn.addEventListener('click', ()=>{
          fetch(`update/${todoID}/${input.value}`).then(res=>{
            if(res.ok){
              e.target.parentElement.parentElement.children[2].textContent = input.value
              e.target.parentElement.parentElement.style.padding = "7px 30px";
              e.target.parentElement.parentElement.style.height = "auto";
              updateBtn.remove()
              input.remove()
            }
          }).catch(err=>{
            console.log(err)
          })
        })
      }
    });
  });
});
