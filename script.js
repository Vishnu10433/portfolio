// Get the scrollable container
const mainContent = document.querySelector('.main-content');

// Smooth scrolling for navigation
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            const targetTop = targetSection.offsetTop - mainContent.offsetTop;
            mainContent.scrollTo({
                top: targetTop - 24,
                behavior: 'smooth'
            });

            document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
            this.classList.add('active');
        }
    });
});

// Scroll spy
const observerOptions = {
    root: mainContent,
    threshold: 0.3,
    rootMargin: '-20% 0px -70% 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const id = entry.target.getAttribute('id');
            document.querySelectorAll('.nav-link').forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${id}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}, observerOptions);

document.querySelectorAll('.content-section').forEach(section => {
    observer.observe(section);
});

// Scroll animations
const animateOnScroll = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInScale 0.8s ease forwards';
        }
    });
}, { 
    root: mainContent,
    threshold: 0.1 
});

document.querySelectorAll('.card, .project-card, .skill-category').forEach(el => {
    animateOnScroll.observe(el);
});

// Floating profile image
const profileImg = document.querySelector('.profile-img');
let floatDirection = 1;

setInterval(() => {
    if (profileImg && !profileImg.matches(':hover')) {
        floatDirection *= -1;
        profileImg.style.transform = `translateY(${floatDirection * 5}px)`;
    }
}, 2000);

// Parallax hover effect
document.addEventListener('mousemove', (e) => {
    const cards = document.querySelectorAll('.card, .project-card');
    const mouseX = e.clientX / window.innerWidth;
    const mouseY = e.clientY / window.innerHeight;
    
    cards.forEach(card => {
        const rect = card.getBoundingClientRect();
        const cardX = (rect.left + rect.width / 2) / window.innerWidth;
        const cardY = (rect.top + rect.height / 2) / window.innerHeight;
        
        const deltaX = (mouseX - cardX) * 10;
        const deltaY = (mouseY - cardY) * 10;
        
        if (card.matches(':hover')) {
            card.style.transform = `translateY(-15px) scale(1.03) rotateX(${deltaY}deg) rotateY(${deltaX}deg)`;
        }
    });
});

// Sparkle effect
function createSparkle() {
    const sparkle = document.createElement('div');
    sparkle.style.position = 'fixed';
    sparkle.style.width = '4px';
    sparkle.style.height = '4px';
    sparkle.style.background = '#1db954';
    sparkle.style.borderRadius = '50%';
    sparkle.style.pointerEvents = 'none';
    sparkle.style.left = Math.random() * window.innerWidth + 'px';
    sparkle.style.top = Math.random() * window.innerHeight + 'px';
    sparkle.style.opacity = '0';
    sparkle.style.transition = 'all 1s ease';
    sparkle.style.zIndex = '9999';
    
    document.body.appendChild(sparkle);
    
    setTimeout(() => {
        sparkle.style.opacity = '1';
        sparkle.style.transform = 'scale(3)';
    }, 10);
    
    setTimeout(() => {
        sparkle.style.opacity = '0';
        sparkle.style.transform = 'scale(0)';
    }, 1000);
    
    setTimeout(() => {
        sparkle.remove();
    }, 2000);
}
setInterval(createSparkle, 3000);

// Typewriter effect
const profileTitle = document.querySelector('.profile-title');
if (profileTitle) {
    const text = profileTitle.textContent;
    profileTitle.textContent = '';
    let i = 0;
    
    setTimeout(() => {
        const typeWriter = setInterval(() => {
            if (i < text.length) {
                profileTitle.textContent += text.charAt(i);
                i++;
            } else {
                clearInterval(typeWriter);
            }
        }, 50);
    }, 2000);
}

// Footer smooth scroll
document.querySelectorAll('.footer-links a').forEach(link => {
    link.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href.startsWith('#')) {
            e.preventDefault();
            const targetSection = document.querySelector(href);
            const targetTop = targetSection.offsetTop - mainContent.offsetTop;
            
            mainContent.scrollTo({
                top: targetTop - 24,
                behavior: 'smooth'
            });
        }
    });
});

// Scroll progress bar
const progressBar = document.createElement('div');
progressBar.style.position = 'fixed';
progressBar.style.top = '0';
progressBar.style.left = '0';
progressBar.style.width = '0%';
progressBar.style.height = '3px';
progressBar.style.background = 'linear-gradient(90deg, #1db954, #1ed760)';
progressBar.style.zIndex = '10000';
progressBar.style.transition = 'width 0.2s ease';
document.body.appendChild(progressBar);

mainContent.addEventListener('scroll', () => {
    const scrollTop = mainContent.scrollTop;
    const scrollHeight = mainContent.scrollHeight - mainContent.clientHeight;
    const scrollPercentage = (scrollTop / scrollHeight) * 100;
    progressBar.style.width = scrollPercentage + '%';
});

// Back to top button
const backToTop = document.createElement('button');
backToTop.innerHTML = '<i class="fas fa-arrow-up"></i>';
backToTop.style.position = 'fixed';
backToTop.style.bottom = '30px';
backToTop.style.right = '30px';
backToTop.style.width = '50px';
backToTop.style.height = '50px';
backToTop.style.borderRadius = '50%';
backToTop.style.background = 'linear-gradient(135deg, #1db954, #1ed760)';
backToTop.style.border = 'none';
backToTop.style.color = '#000';
backToTop.style.fontSize = '20px';
backToTop.style.cursor = 'pointer';
backToTop.style.opacity = '0';
backToTop.style.transition = 'all 0.3s ease';
backToTop.style.zIndex = '9999';
backToTop.style.boxShadow = '0 5px 15px rgba(29, 185, 84, 0.4)';
document.body.appendChild(backToTop);

mainContent.addEventListener('scroll', () => {
    if (mainContent.scrollTop > 300) {
        backToTop.style.opacity = '1';
        backToTop.style.transform = 'scale(1)';
    } else {
        backToTop.style.opacity = '0';
        backToTop.style.transform = 'scale(0.8)';
    }
});

backToTop.addEventListener('click', () => {
    mainContent.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

backToTop.addEventListener('mouseenter', () => {
    backToTop.style.transform = 'scale(1.1) rotate(360deg)';
    backToTop.style.boxShadow = '0 8px 20px rgba(29, 185, 84, 0.6)';
});

backToTop.addEventListener('mouseleave', () => {
    backToTop.style.transform = 'scale(1) rotate(0deg)';
    backToTop.style.boxShadow = '0 5px 15px rgba(29, 185, 84, 0.4)';
});

console.log("Portfolio loaded successfully! 🚀");
// Formspree AJAX Handler (Keeps user on your page)
const form = document.querySelector("form[action='https://formspree.io/f/mzznbeav']");

if (form) {
    form.addEventListener("submit", async function(e) {
        e.preventDefault();

        const submitBtn = form.querySelector(".submit-btn");
        const originalText = submitBtn.innerHTML;

        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;

        const formData = new FormData(form);

        const response = await fetch(form.action, {
            method: "POST",
            body: formData,
            headers: { "Accept": "application/json" }
        });

        if (response.ok) {
            // SUCCESS POPUP
            const notify = document.createElement("div");
            notify.style.position = "fixed";
            notify.style.top = "20px";
            notify.style.right = "20px";
            notify.style.padding = "20px 25px";
            notify.style.borderRadius = "12px";
            notify.style.background = "linear-gradient(135deg, #1db954, #1ed760)";
            notify.style.color = "#000";
            notify.style.fontWeight = "700";
            notify.style.zIndex = "99999";
            notify.style.boxShadow = "0 8px 25px rgba(29,185,84,0.4)";
            notify.innerHTML = `
                <i class="fas fa-check-circle"></i> Message Sent Successfully!
            `;
            document.body.appendChild(notify);

            setTimeout(() => notify.remove(), 4000);

            // CLEAR THE FORM
            form.reset();

            // Reset button
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;

        } else {
            alert("Error sending message. Please try again.");
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }
    });
}
const themeBtn = document.getElementById("theme-toggle");

themeBtn.addEventListener("click", () => {
    document.body.classList.toggle("light-mode");

    themeBtn.innerHTML = document.body.classList.contains("light-mode")
        ? `<i class="fas fa-moon"></i>`
        : `<i class="fas fa-sun"></i>`;
});
