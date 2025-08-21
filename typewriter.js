document.addEventListener('DOMContentLoaded', () => {
    const tablinks = document.getElementsByClassName("tab-links");
    const tabcontents = document.getElementsByClassName("tab-contents");

    function opentab(tabname) {
        Array.from(tablinks).forEach(tablink => tablink.classList.remove("active-link"));
        Array.from(tabcontents).forEach(tabcontent => tabcontent.classList.remove("active-tab"));

        document.querySelector(`[data-tab="${tabname}"]`).classList.add("active-link");
        document.getElementById(tabname).classList.add("active-tab");

        if (tabname === 'skills') {
            loadSkillsImages();
        }
    }

    function loadSkillsImages() {
        const container = document.querySelector('.skills-container');
        container.innerHTML = ''; // Clear previous images if any

        const skills = [
            { name: 'Python', url: 'skills/python.png', link: 'https://www.python.org/' },
            { name: 'Java', url: 'skills/java.png', link: 'https://www.java.com/en/' },
            { name: 'SAS', url: 'skills/c.png', link: 'https://www.sas.com/en_in/home.html' },
            { name: 'Arduino', url: 'skills/arduino.png', link: 'https://www.arduino.cc/' },
            { name: 'PyTorch', url: 'skills/pytorch.png', link: 'https://pytorch.org/' },
            { name: 'TensorFlow', url: 'skills/tensorflow.png', link: 'https://www.tensorflow.org/' },
            { name: 'HTML', url: 'skills/html.png', link: 'https://developer.mozilla.org/en-US/docs/Web/HTML' },
            { name: 'CSS', url: 'skills/css.png', link: 'https://developer.mozilla.org/en-US/docs/Web/CSS' },
            { name: 'JavaScript', url: 'skills/js.png', link: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript' },
            { name: 'Flask', url: 'skills/flask.png', link: 'https://flask.palletsprojects.com/' },
            { name: 'SQL', url: 'skills/sql.png', link: 'https://www.mysql.com/' }
        ];

        skills.forEach((skill, index) => {
            const a = document.createElement('a');
            a.href = skill.link;
            a.target = '_blank'; // Open in a new tab
            a.rel = 'noopener noreferrer'; // Security improvement

            const img = document.createElement('img');
            img.src = skill.url;
            img.alt = skill.name; // More descriptive text
            img.classList.add('skill-image');
            img.style.animationDelay = `${index * 0.15}s`;

            const skillName = document.createElement('div');
            skillName.textContent = skill.name;
            skillName.classList.add('skill-name');
            skillName.style.animationDelay = `${index * 0.15}s`;

            const skillWrapper = document.createElement('div');
            skillWrapper.classList.add('skill-wrapper');
            skillWrapper.appendChild(img);
            skillWrapper.appendChild(skillName);

            a.appendChild(skillWrapper);
            container.appendChild(a);
        });
    }

    const aboutSection = document.getElementById('about');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && document.querySelector('.tab-links.active-link')?.innerText === 'Skills') {
                loadSkillsImages();
            }
        });
    }, { threshold: 0.1 });

    if (aboutSection) {
        observer.observe(aboutSection);
    }

    const domains = [
        "Software Development",
        "Machine Learning",
        "Web Development"
    ];
    let index = 0;
    let textIndex = 0;
    const domainTextElement = document.getElementById("domain-text");
    const typingDelay = 100;
    const erasingDelay = 50;
    const newDomainDelay = 2000;

    function type() {
        if (textIndex < domains[index].length) {
            domainTextElement.textContent += domains[index].charAt(textIndex);
            textIndex++;
            setTimeout(type, typingDelay);
        } else {
            setTimeout(erase, newDomainDelay);
        }
    }

    function erase() {
        if (textIndex > 0) {
            domainTextElement.textContent = domains[index].substring(0, textIndex - 1);
            textIndex--;
            setTimeout(erase, erasingDelay);
        } else {
            index = (index + 1) % domains.length;
            setTimeout(type, typingDelay + 1100);
        }
    }

    setTimeout(type, newDomainDelay);

    // Add event listeners to tab links
    Array.from(tablinks).forEach(tablink => {
        tablink.addEventListener('click', (event) => {
            opentab(event.target.getAttribute('data-tab'));
        });
    });

    // Load default tab content if needed
    opentab('skills');
});
