const progressBars = document.querySelectorAll(".progress");

const animateProgress = (entries, observer)=>{
    entries.forEach((entry) => {
     if (entry.isIntersecting) {
        const progress = entry.target;
        const targetWidth = progress.getAttribute("data-progress");
        progress.style.width = targetWidth + "%";
     } else{
        const progress = entry.target;
        progress.style.width = "0%"
     }
        
    });
}; 
const observer = new IntersectionObserver(animateProgress, {
    threshold: 0.5,
});
progressBars.forEach((progressBar) => {
    observer.observe(progressBar);
});

var typed = new Typed("#element",{
    strings: ["Java Developer", "FullStack Developer","Linux"],
    typeSpeed: 50,
    backSpeed: 50,
    loop: true,
    showCursor: false,
});
document
.getElementById("contactForm")
.addEventListener("submit", function (event){
    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const subject = document.getElementById("subject").value.trim();
    const message = document.getElementById("message").value.trim();
    
    if(name === "" || email === "" || subject === "" || message === ""){
        alert("please fill the all fileds");
        return;
    }
    if(!validationEmail(email)){
        alert("please enter valid email");
    }
    alert("Message is SuccessFully send!");
    this.reset();
});
function validationEmail(email){
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}