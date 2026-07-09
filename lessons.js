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

    //looks through the lessons data and find the lesson object that has the same Id located in query string
    const specificLessonDetails = data.lessons.find(item => item.id === lessonId)
    renderLessonHTML(specificLessonDetails)
}catch(err){
    document.getElementById('lesson-details').innerHTML = `<p>The following error has occurred: ${err.message}</p>`
}
}  

//uses specific lesson details from loadLessonDetails function to render html pages dynamically
const renderLessonHTML =(lessonContent) =>{
    window.location.href = lessonContent.content_url
}

// calls function using the JSON file holding lesson data
loadLessonDetails('lessons.json')