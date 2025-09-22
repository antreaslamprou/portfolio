function initAccordions(){
    var accordions = document.getElementsByClassName("accordion");
 
    for (var k = 0; k < accordions.length; k++) {
        accordions[k].addEventListener("click", function() {
            this.classList.toggle("active");
            var panel = this.nextElementSibling;
            if (panel.style.maxHeight) {
                panel.style.maxHeight = null;
            } else {
                panel.style.maxHeight = panel.scrollHeight + "px";
            } 
        });
    }
}

function initSlider() {
    const slider = document.getElementById('slider');
    const track = slider.querySelector('.slide-track');

    track.innerHTML += track.innerHTML;

    let position = 0;
    const speed = -0.75;
    let isPaused = false;

    function animate() {
        if (!isPaused) {
            position += speed;
            if (position <= -track.scrollWidth / 2 ) {
                position = 0;
            }
            track.style.transform = `translateX(${position}px)`;
        }
        requestAnimationFrame(animate);
    }

    slider.addEventListener('mouseenter', () => isPaused = true);
    slider.addEventListener('mouseleave', () => isPaused = false);

    animate();
}

function typeWriter() {
    const texts = ["Antreas Lamprou. ", "a Full-Stack Developer. "];
    const speed = 100; // Typing speed in ms
    const deleteSpeed = 50; // Deleting speed
    const pauseBetween = 1000; // Pause between phrases
    
    const element = document.getElementById("typed-text");

    function blinkCursor(callback) {
        cursor.style.opacity = 1;
        setTimeout(() => {
            cursor.style.opacity = 0;
            setTimeout(() => {
                cursor.style.opacity = 1;
                setTimeout(() => {
                    cursor.style.opacity = 0;
                    setTimeout(() => {
                        cursor.style.opacity = 1;
                    }, 200);
                }, 200);
            }, 200);
        }, 200);
    }

    if (isDeleting) {
        // Deleting phase
        currentText = texts[i].substring(0, j - 2);
        j--;
        cursor.style.opacity = 1;
        
        if (j === 0) {
            isDeleting = false;
            i = (i + 1) % texts.length;
            setTimeout(typeWriter, pauseBetween);
            blinkCursor();
            return;
        }
    } else {
        // Typing phase
        currentText = texts[i].substring(0, j + 1);
        j++;
        cursor.style.opacity = 1;
        
        if (j === texts[i].length) {
            isDeleting = true;
            setTimeout(typeWriter, pauseBetween);
            blinkCursor();
            return;
        }
    }

    element.textContent = currentText;
    setTimeout(typeWriter, isDeleting ? deleteSpeed : speed);
}