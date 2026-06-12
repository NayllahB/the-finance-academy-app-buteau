// pulls the query string in url (what's after the "?")
const queryString = new URLSearchParams(window.location.search)

//grabs just the lessonId *remember url currently shows lesson = "lessonId"
const lessonId = queryString.get('lesson')


//this function fetches the data lesson JSON file
const loadLessonDetails = async(lessonFile) =>{
try{
    const res = await fetch(lessonFile)
    if(!res.ok) throw new Error('Could not load lesson at this time')
    const data = await res.json()

    //looks through the lessons data and find the lesson object that as the same Id located in query string
    const specificLesson = data.lessons.find(item => item.id === lessonId)
    renderLesson(specificLesson)
}catch(err){
    document.getElementById('lesson-details').innerHTML = `<p>The following error has occurred: ${err.message}</p>`
}
}  

//uses specific lesson data from loadLessonDetails function to render dynamically
const renderLesson =(lesson) =>{
    const lessonSection = document.getElementById('lesson-details')
    lessonSection.innerHTML = `
        <h1>${lesson["lesson-title"]}</h1>
        <p class="lesson-tagline">${lesson["lesson-tagline"]}</p>
        <p>${lesson["content"]}</p>
        <a class="back-to-home-link" href="index.html">Back to Home</a>
    `
}

// calls function using the JSON file holding lesson data
loadLessonDetails('lessons.json')