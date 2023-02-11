const habits = document.querySelector(".habits")
const btnHabit = document.querySelector(".btn-habit")
const inputHabit = document.querySelector(".input-habit")
const form = document.querySelector("#form-habits")
const nlwSetup = new NLWSetup(form)
const button = document.querySelector("header button")
let cont = 0

const largura = window.innerWidth

function changeText() {
    if(largura < 570){
        btnHabit.innerHTML = "+"
    }
}

function handleClick() {
    
    
    const cacthFather = document.querySelectorAll(".day")

    const newHabit = document.createElement("div")
    newHabit.innerHTML = inputHabit.value
    newHabit.setAttribute("class", "habit")
    newHabit.id = 'm';
    newHabit.setAttribute("data-name", inputHabit.value)


    habits.appendChild(newHabit)
    console.log(newHabit)

    const array = [];
    for (let i = 0; i < cacthFather.length; i += 1) {
        const newInput = document.createElement("input")
        newInput.type = "checkbox"
        newInput.classList.add('new')
        newInput.name = inputHabit.value
        cacthFather[i].appendChild(newInput)
        localStorage.setItem('a', document.querySelectorAll('.day').length);
        localStorage.setItem('teste', JSON.stringify(array)) 
    }

    const catchHabits = document.querySelectorAll('#m')

    for (let i = 0; i < catchHabits.length; i += 1) {
        array.push(catchHabits[i].innerHTML)
        localStorage.setItem('teste', JSON.stringify(array)) 
    }
    
    

    save()  
    cont += 1

    inputHabit.value = ""
}

function restore () {
    const cacthFather = document.querySelectorAll(".day")
    if (localStorage.getItem('teste') !== null) {
        const size = JSON.parse(localStorage.getItem('teste'));
        const tamanho = localStorage.getItem('a');
        for (let i = 0; i < size.length; i+= 1) {
        const newHabit = document.createElement("div")
        newHabit.innerHTML = size[i];
        newHabit.id = 'm';
        newHabit.setAttribute("class", "habit")
        newHabit.setAttribute("data-name", inputHabit.value)
        habits.appendChild(newHabit)
            

        }
        const a = document.querySelectorAll("#m")
        // const teste = document.querySelectorAll('day')
        for (let o = 0; o < a.length; o += 1) {
            for (let i = 0; i < cacthFather.length; i += 1) {
                const newInput = document.createElement("input")
                newInput.type = "checkbox"
                newInput.classList.add('new')
                newInput.name = inputHabit.value
                cacthFather[i].appendChild(newInput)
            }
        }
    }
}

function restoreInput () {
    const purple = document.querySelectorAll('.new');
    for (let i = 0; i < purple.length; i += 1)  {
        purple[i].addEventListener('click', () => {
        if(purple[i].style.backgroundColor == '#18181B');{
             localStorage.setItem('icones', [i+1])
            }
        })
    }
    
}

function a () {
    if (localStorage.getItem('icones') !== null) {
    const purple = document.querySelectorAll('.new');
        for (let o = 0; o < localStorage.getItem('icones'); o +=1 ) {
            purple[o].style.backgroundColor = '#8B5CF6';
            purple[o].style.border = '2px solid #A78BFA';
        }
    }
}

btnHabit.addEventListener("click", handleClick)

btnHabit.addEventListener("click", restoreInput)


form.addEventListener("change", save)

function add() {

    const today = new Date().toLocaleDateString("pt-br").slice(0, -5)

    const dayExists = nlwSetup.dayExists(today)

    if(dayExists) {

        ///alert("Dia ja incluso")
        return
    }

    alert("Dia cadastrado com sucesso")
    nlwSetup.addDay(today)
}

function save() {
    localStorage.setItem("NLWSetup@habits", JSON.stringify(nlwSetup.data) )
}



const data = JSON.parse(localStorage.getItem("NLWSetup@habits")) || {}
nlwSetup.setData(data)
nlwSetup.load()
add();

function init () {
    restore();
    a();
    changeText();
}

window.onload = init