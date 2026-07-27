
const params = new URLSearchParams(window.location.search)
const lessonId = params.get('lessonId')

const quizContainer = document.getElementById("quiz-container")

let currentQuestion = 0;
let score = 0;
let quizDetailsGlobal = null

//This function is used to grab specific quiz questions from JSON using lessonId
const quizData = async(lessonId) => {
    try{
        const res = await fetch('../data/quizzes.json')
        if(!res.ok) throw new Error ('Could not find quiz questions')
        const data = await res.json()

        const lessonQuiz = data.quizzes.find(item => item.lesson_id === lessonId)
        quizDetailsGlobal = lessonQuiz
        startQuiz(lessonQuiz)
        

    }catch(err){
        quizContainer.innerHTML = `<p>The following error has occurred: ${err.message}</p>`
    }
}
quizData(lessonId)

//CHANGE: There has to be more we can do with this, maybe previous score?
function startQuiz (quizDetails){
    quizContainer.innerHTML = `<p class="quiz-title">${quizDetails.title}</p>`
    renderQuestion()
}

function renderQuestion(){
    const questionObject = quizDetailsGlobal.data[currentQuestion]

    // Displays question text
    const questionElement = document.createElement('p')
    questionElement.classList.add('quiz-question')
    questionElement.textContent = questionObject.question
    quizContainer.appendChild(questionElement)

    // creates container for options
    const optionsContainer = document.createElement('div')
    optionsContainer.id = "quiz-options-container"

    // displays each option 
    questionObject.options.forEach((option, index) =>{
        const button = document.createElement('button')
        button.classList.add('quiz-option-button')
        button.textContent = option
        button.dataset.index = index
        optionsContainer.appendChild(button)
    })

    quizContainer.appendChild(optionsContainer)
}

quizContainer.addEventListener('click', (event)=> {
    if (!event.target.classList.contains('quiz-option-button')) return

    const selectedAnswerIndex = Number(event.target.dataset.index)
    const correctAnswerIndex = quizDetailsGlobal.data[currentQuestion].answer

    const optionsButtons = document.querySelectorAll(".quiz-option-button")

    //will let me add css to highlight correct and incorrect answers
   optionsButtons.forEach((button) => {
        const buttonIndex = Number(button.dataset.index)
        if (buttonIndex === correctAnswerIndex){
            button.classList.add('correct')
        }else{
            button.classList.add('incorrect')
        }
        button.disabled = true
    })

    //if user cicks correct question, increase their score
    if(selectedAnswerIndex === correctAnswerIndex) {
        score++
    }

    // add next button
    const nextButton = document.createElement('button')
    nextButton.id = "next-question-button"
    nextButton.textContent = "Next"
    quizContainer.appendChild(nextButton)
})


// if next button is clicked move to next question
quizContainer.addEventListener('click',(event) => {
    if(event.target.id !== "next-question-button") return

    currentQuestion++

    if(currentQuestion >= quizDetailsGlobal.data.length){
        endQuiz()
    } else {
        quizContainer.innerHTML = `<p class='quiz-title'>${quizDetailsGlobal.title}</p>`

        renderQuestion()
    }
})

function endQuiz(){
    const total = quizDetailsGlobal.data.length
    const correct = score

    quizContainer.innerHTML=`
    <p class='quiz-title'>${quizDetailsGlobal.title}</p>
    <p class = quiz-result>You scored ${correct} out of ${total}</p>
    <button id="retake-quiz-button">Retake Quiz</button>
    `

    document.getElementById("retake-quiz-button").addEventListener('click', () => {
        currentQuestion = 0
        score = 0
        startQuiz(quizDetailsGlobal)
    })
}
