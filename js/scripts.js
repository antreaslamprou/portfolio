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

function loadSkills() {
    // Parent elements
    const slider = document.getElementsByClassName("slide-track")[0];
    const panels = document.getElementsByClassName("panel");

    // Connection between skills and parent elements
    const maps = {
        "featured" : slider,
        "fullStack" : panels[0],
        "database" : panels[1],
        "toolsPrograms" : panels[2],
    }

    fetch("assets/data/skills.json")
        .then(response => response.json())
        .then(data => {
            Object.entries(data).forEach(([type, skills]) => {
                populateSection(skills, maps[type]);
            });

            // Initialise slider and accordions after data load
            initSlider();
            initAccordions();
        })
    .catch(error => console.error(error));

    // Populates a section with the items of the array
    function populateSection(array, section) {
        array.forEach(skill => {
            var skillWrapper = document.createElement("div");
            skillWrapper.classList = "skill slide";
            skillWrapper.id = getSkillId(skill);
            
            var skillImage = document.createElement("div");
            var skillText = document.createElement("h4");
            skillText.innerText = skill;
            
            skillWrapper.append(skillImage, skillText);
            section.append(skillWrapper);
        });
    }
}

// Returns skill id attribute based on name
function getSkillId(name) {
    return name
        .toLowerCase()
        .replace(/[ .]/g, '')
        .replace(/\+/g, 'plus');
}

function loadProjects() {
    const parent = document.getElementsByClassName("projects-flexbox")[0];
    fetch("assets/data/projects.json")
    .then(response => response.json())
    .then(data => {
        data.forEach(project => {
            var projectWrapper = document.createElement("div");
            projectWrapper.classList = "project"
            
            var imgContainer = document.createElement("div");
            imgContainer.classList = "img-container"

            var image = document.createElement("img");
            image.src = project.image;
            image.draggable = false;
            imgContainer.append(image);

            var languages = document.createElement("span");
            languages.classList = "languages";
            project.languages.forEach(language => {
                var languageWrapper = document.createElement("span");
                languageWrapper.classList = "skill";
                languageWrapper.id = language;
                
                var languageSpan = document.createElement("span");
                languageWrapper.append(languageSpan);

                languages.append(languageWrapper);
            });

            var details = document.createElement("div");
            details.classList = "description";
            var header = document.createElement("div");
            
            var title = document.createElement("h3");
            title.innerText = project.title;
            
            var hr = document.createElement("hr");

            var description = document.createElement("p");
            description.innerText = project.description;
            
            header.append(title, hr, description);

            var links = document.createElement("div");
            links.classList = "links";
            project.links.forEach(link => {
                var linkEl = document.createElement("a");
                linkEl.href = link.url;
                linkEl.target = "_blank";

                switch (link.type){
                    case "live":
                        linkEl.innerHTML = "Live Demo <i class='fa-solid fa-arrow-up-right-from-square'></i>";
                        break;
                    case "files":
                        linkEl.innerHTML = "Project Files <i class='fa-brands fa-github'></i>";
                        break;
                    case "video":
                        linkEl.innerHTML = "Video Demo <i class='fa-solid fa-play'></i>";
                        break;
                    default:
                        return;
                }

                links.append(linkEl);
            });
            details.append(header, links);

            projectWrapper.append(imgContainer, languages, details);
            parent.append(projectWrapper);
        });
    })
    .catch(error => console.error(error));
}