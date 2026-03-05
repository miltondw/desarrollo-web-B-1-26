const tarea = document.getElementById("tarea");
const form = document.getElementById("form");
const contador = document.getElementById("contador");
const lista = document.getElementById("lista");
let cont=0;

form.addEventListener("submit",(e)=>{
    e.preventDefault()
    const li=document.createElement("li")
    const btn=document.createElement("button")

    li.textContent=tarea.value
    btn.textContent="x"
    cont++
   
    li.appendChild(btn)
    lista.appendChild(li)
    contador.textContent=cont
    tarea.value=""

    btn.addEventListener("click",()=>{
        li.remove()
        cont--
        contador.textContent=cont
    })

})
