
//Called once user clicks on CTA buttons in lesson carousel on home page
const navigateToLesson = async(lessonId) =>{
    try{
        const res = await fetch('./data/lessons.json')
        if(!res.ok) throw new Error('Could not load lesson at this time')
        const data = await res.json()

        const specificLesson = data.lessons.find(item => item.id === lessonId)
        window.location.href = `${specificLesson.content_url}?lessonId=${lessonId}`
    }catch(err){
        alert("The following error has occured: " + err.message)
    }
    
}

//This function is used to grab lesson info from JSON to the "Explore lessons" section of the home page
const loadLessonCards = async(lessonFiles) => {
    try{
        const res = await fetch(lessonFiles)
        if(!res.ok) throw new Error ('Could not load lessons at this time')
        const data = await res.json()

        const lessonCarousel = document.getElementById('lesson-carousel')

        // create a card for each lesson available in JSON file
        data.lessons.forEach(lesson => {
            const lessonCard = document.createElement('div')
            // adds the class to the card for css styling later
            lessonCard.classList.add('home-lesson-card')

            const lessonCardButton = document.createElement('button')
            lessonCardButton.classList.add('home-lesson-card-btn')
            lessonCardButton.textContent = 'Start Lesson'

            lessonCardButton.dataset.lesson = lesson.id

            lessonCard.innerHTML = `
                <img src="${lesson.card_image}" alt="image of piggy bank">
                <p>${lesson.title}</p>
                <p>${lesson.summary}</p>
            `
            lessonCard.appendChild(lessonCardButton)
            lessonCarousel.appendChild(lessonCard)

        })
    }catch(err){
        document.getElementById('lesson-carousel').innerHTML = `<p>The following error has occurred: ${err.message}</p>`
    }
}

loadLessonCards('./data/lessons.json')


// will listen for when the CTA button is clicked on lesson card. The corresponding lesson id will be pushed into navigate lesson function
document.getElementById('lesson-carousel')
    .addEventListener('click', (event) => {
        const button = event.target.closest('.home-lesson-card-btn')
        if(!button) return

        navigateToLesson(button.dataset.lesson)
    })

    