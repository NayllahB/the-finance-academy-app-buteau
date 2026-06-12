
//This function is called when user clicks on buttons placed on homepage
//Both buttons take user to lesson.html but information displayed will differ depending on lessonId
function navigateToLesson (lessonId){
    window.location.href = `lessons.html?lesson=${lessonId}`
}