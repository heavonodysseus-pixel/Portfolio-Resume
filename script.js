// --- Mobile Menu Toggle Handler ---
const hamburgerBtn = document.getElementById('hamburger');
const navigationList = document.querySelector('.nav-links');

hamburgerBtn.addEventListener('click', () => {
    navigationList.classList.toggle('active');
    
    // Simple hamburger animation effect
    const menuLines = hamburgerBtn.querySelectorAll('span');
    if (navigationList.classList.contains('active')) {
        menuLines[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        menuLines[1].style.opacity = '0';
        menuLines[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
    } else {
        menuLines[0].style.transform = 'none';
        menuLines[1].style.opacity = '1';
        menuLines[2].style.transform = 'none';
    }
});

// Close mobile menu automatically when selecting a link
document.querySelectorAll('.nav-links a').forEach(navLink => {
    navLink.addEventListener('click', () => {
        navigationList.classList.remove('active');
        const menuLines = hamburgerBtn.querySelectorAll('span');
        menuLines[0].style.transform = 'none';
        menuLines[1].style.opacity = '1';
        menuLines[2].style.transform = 'none';
    });
});

// --- Theme Switcher Logic ---
const themeButton = document.getElementById('theme-toggle');
const themeIconBtn = themeButton.querySelector('i');

const savedUserTheme = localStorage.getItem('theme');
if (savedUserTheme) {
    document.documentElement.setAttribute('data-theme', savedUserTheme);
    if (savedUserTheme === 'dark') {
        themeIconBtn.classList.replace('fa-moon', 'fa-sun');
    }
}

themeButton.addEventListener('click', () => {
    let currentThemeMode = document.documentElement.getAttribute('data-theme');
    if (currentThemeMode === 'dark') {
        document.documentElement.setAttribute('data-theme', 'light');
        localStorage.setItem('theme', 'light');
        themeIconBtn.classList.replace('fa-sun', 'fa-moon');
    } else {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
        themeIconBtn.classList.replace('fa-moon', 'fa-sun');
    }
});

// --- Highlight Active Nav Item on Scroll ---
const allSections = document.querySelectorAll('section');
const allNavItems = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
    let activeSectionId = '';
    const currentScrollPos = window.scrollY + 180;

    allSections.forEach(sec => {
        const topPos = sec.offsetTop;
        const heightVal = sec.clientHeight;
        if (currentScrollPos >= topPos && currentScrollPos < topPos + heightVal) {
            activeSectionId = sec.getAttribute('id');
        }
    });

    allNavItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('href') === `#${activeSectionId}`) {
            item.classList.add('active');
        }
    });
});

// --- Hero Typing Effect ---
const headerTitleElement = document.querySelector('.dynamic-title');
const titlesArray = ['Muhammad Haikal Danial', 'a Network Computing Student', 'a Software Developer'];
let titleIndex = 0;
let letterIndex = 0;
let deletingState = false;
let delayTimer = 100;

function runTypingAnimation() {
    const selectedTitle = titlesArray[titleIndex];
    
    if (deletingState) {
        headerTitleElement.textContent = selectedTitle.substring(0, letterIndex - 1);
        letterIndex--;
        delayTimer = 40;
    } else {
        headerTitleElement.textContent = selectedTitle.substring(0, letterIndex + 1);
        letterIndex++;
        delayTimer = 120;
    }

    if (!deletingState && letterIndex === selectedTitle.length) {
        deletingState = true;
        delayTimer = 1800; // Pause when word finishes typing
    } else if (deletingState && letterIndex === 0) {
        deletingState = false;
        titleIndex = (titleIndex + 1) % titlesArray.length;
        delayTimer = 400;
    }

    setTimeout(runTypingAnimation, delayTimer);
}

document.addEventListener('DOMContentLoaded', () => {
    setTimeout(runTypingAnimation, 800);
});

// --- Animate Skill Bars on View ---
const skillProgressBars = document.querySelectorAll('.progress');

const observerSettings = {
    root: null,
    threshold: 0.4
};

const barIntersectionObserver = new IntersectionObserver((observedEntries, obsRef) => {
    observedEntries.forEach(entry => {
        if (entry.isIntersecting) {
            const barElement = entry.target;
            const finalWidthValue = barElement.style.width;
            barElement.style.width = '0%';
            setTimeout(() => {
                barElement.style.width = finalWidthValue;
            }, 120);
            obsRef.unobserve(barElement);
        }
    });
}, observerSettings);

skillProgressBars.forEach(bar => {
    barIntersectionObserver.observe(bar);
});

// --- Project Filtering Functionality ---
const categoryFilterBtns = document.querySelectorAll('.filter-btn');
const portfolioCards = document.querySelectorAll('.project-card');

categoryFilterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        categoryFilterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const selectedFilterCategory = btn.getAttribute('data-filter');

        portfolioCards.forEach(cardItem => {
            const cardCategoryType = cardItem.getAttribute('data-category');
            if (selectedFilterCategory === 'all' || cardCategoryType === selectedFilterCategory) {
                cardItem.style.display = 'block';
            } else {
                cardItem.style.display = 'none';
            }
        });
    });
});

// --- Lightbox Image Modal Logic ---
const imageLightboxModal = document.getElementById('image-modal');
const zoomedImagePreview = document.getElementById('modal-img');
const closeModalButton = document.querySelector('.close-modal');

portfolioCards.forEach(card => {
    const projectThumbnail = card.querySelector('.project-img');
    projectThumbnail.addEventListener('click', () => {
        imageLightboxModal.style.display = 'block';
        zoomedImagePreview.src = projectThumbnail.src;
        zoomedImagePreview.alt = projectThumbnail.alt;
    });
});

closeModalButton.addEventListener('click', () => {
    imageLightboxModal.style.display = 'none';
});

window.addEventListener('click', (e) => {
    if (e.target === imageLightboxModal) {
        imageLightboxModal.style.display = 'none';
    }
});

// --- Contact Form Handling & Verification ---
const userContactForm = document.getElementById('contact-form');
const submissionStatusText = document.getElementById('form-status');

userContactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const inputNameField = document.getElementById('name');
    const inputEmailField = document.getElementById('email');
    const inputMessageField = document.getElementById('message');
    let formIsValid = true;

    if (inputNameField.value.trim() === '') {
        displayInputError(inputNameField, 'Please enter your name');
        formIsValid = false;
    } else {
        removeInputError(inputNameField);
    }

    if (inputEmailField.value.trim() === '' || !validateEmailFormat(inputEmailField.value)) {
        displayInputError(inputEmailField, 'Please enter a valid email address');
        formIsValid = false;
    } else {
        removeInputError(inputEmailField);
    }

    if (inputMessageField.value.trim() === '') {
        displayInputError(inputMessageField, 'Message box cannot be empty');
        formIsValid = false;
    } else {
        removeInputError(inputMessageField);
    }

    if (formIsValid) {
        submissionStatusText.style.color = 'var(--primary-color)';
        submissionStatusText.textContent = 'Sending your message...';
        
        setTimeout(() => {
            submissionStatusText.style.color = '#10b981';
            submissionStatusText.textContent = 'Message sent successfully!';
            userContactForm.reset();
            setTimeout(() => {
                submissionStatusText.textContent = '';
            }, 4000);
        }, 1000);
    }
});

function displayInputError(fieldElement, errorMessageText) {
    const parentFormGroup = fieldElement.parentElement;
    parentFormGroup.classList.add('error');
    const errorSmallTag = parentFormGroup.querySelector('.error-message');
    errorSmallTag.textContent = errorMessageText;
}

function removeInputError(fieldElement) {
    const parentFormGroup = fieldElement.parentElement;
    parentFormGroup.classList.remove('error');
    const errorSmallTag = parentFormGroup.querySelector('.error-message');
    errorSmallTag.textContent = '';
}

function validateEmailFormat(emailString) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailString);
}

// --- Back to Top Floating Button ---
const scrollUpButton = document.getElementById('back-to-top');

window.addEventListener('scroll', () => {
    if (window.scrollY > 350) {
        scrollUpButton.classList.add('show');
    } else {
        scrollUpButton.classList.remove('show');
    }
});

scrollUpButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});
