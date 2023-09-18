document.addEventListener("DOMContentLoaded", ()=>{
    document.querySelectorAll(".form-check-input").forEach(option=>{
      option.addEventListener('change', (e)=>{
        const is_done = e.target.checked
        const todoID = e.target.value
        fetch(`/done/${todoID}/?is_done=${is_done}`).then((response)=>console.log(response.ok)).catch(err=>console.log(err))
      })
    })
    document.querySelectorAll(".fa-trash").forEach(option=>{
      option.addEventListener('click', (e)=>{
        const todoID = e.target.getAttribute('data-value')
        e.target.parentElement.parentElement.remove()
        fetch(`/delete/${todoID}/`).then((response)=>console.log(response.ok)).catch(err=>console.log(err))
      })
    })
  })