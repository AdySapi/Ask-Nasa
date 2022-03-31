const apiKey = "eA5sAhbADxoIlDM4gSKkgsfuhWvYOqTtPakQOG4T"
const rootElement = document.getElementById("root")




const getData = async (url) => { 
    const result = await fetch(url)
    return result.json()
}

const loadEvent = async _ => {
    const rootElement =  document.getElementById("root");

// --- descibe current date ---
    const today = new Date()
    const todayDate = today.getFullYear()+'-'+(String(today.getMonth()+1).padStart(2,'0'))+'-'+today.getDate()
    const displayDate = today.toLocaleString('en-uk',{day:'numeric', month:'long', year:'numeric'})
    let requestedDate = todayDate

// --- fetch current day data ---
    const apodJson = await getData(`https://api.nasa.gov/planetary/apod?api_key=${apiKey}&date=${requestedDate}`) 

// --- create content containing json data ---
    const dynamicContent = (date, json) => {
        return `
        <time datetime="yyyy-mm-dd">${date}</time>
        <img src=${json.url} alt="">
        <h2 id="title">${json.title}</h2>
        <p id="explanation">Explanation: ${json.explanation}</p>`
    } 
//--- add HTML content ---
    const insertContent = (date, json) => {
        return `
        <h1>Astronomy Picture of the Day</h1>
        <p> <a href="">Discover the cosmos!</a> Each day a different image or photograph of our fascinating universe is featured, along with a brief explanation written by a professional astronomer.</p>
        <div id="dc">${dynamicContent(date, json)}</div>
          
        <h3>View images from previous days</h3>
        <form>
        <label for="prevDate">Select date</label>
        <input type="date" id="prevDate" min="2015-01-01" max=${todayDate}>
        </form>
        `;  
    }

    rootElement.insertAdjacentHTML("beforeend", insertContent(displayDate, apodJson));

//--- select date & display data accordingly ---
    const form = document.querySelector('form')
    form.addEventListener("submit", (e) => { 
        e.preventDefault();
    })

    let chosenDate = ""
    form.addEventListener("input", async (e) => {
        if (chosenDate.length === 0) {
            chosenDate +=`${e.target.value}`  
        } else {
            chosenDate = `${e.target.value}`
        }
        console.log(chosenDate);
        const newApodJson = await getData(`https://api.nasa.gov/planetary/apod?api_key=${apiKey}&date=${chosenDate}`)
        document.getElementById("dc").innerHTML = dynamicContent(chosenDate, newApodJson)

    })
}
window.addEventListener("load", loadEvent);