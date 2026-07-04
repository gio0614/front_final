const burger = document.getElementById('burger');
const navMenu = document.getElementById('navMenu');

burger.addEventListener('click', () => {
    burger.classList.toggle('open');
    navMenu.classList.toggle('open');
});


document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        burger.classList.remove('open');
        navMenu.classList.remove('open');
    });
});



const header = document.getElementById('header');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});



const cookieBanner = document.getElementById('cookieBanner');
const acceptBtn = document.getElementById('acceptCookies');

if (localStorage.getItem('cookiesAccepted') === 'true') {
    cookieBanner.classList.add('hide');
}

acceptBtn.addEventListener('click', () => {
    localStorage.setItem('cookiesAccepted', 'true');
    cookieBanner.classList.add('hide');
});



const catalogGrid = document.getElementById('catalogGrid');


const gearNames = ['RECON HELMET', 'PLATE CARRIER', 'NIGHT OPTIC', 'COMBAT GLOVES', 'TAC BELT', 'FIELD PACK'];

async function loadGear() {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=6');
        if (!response.ok) throw new Error('SIGNAL LOST');
        const data = await response.json();

        catalogGrid.innerHTML = ''; 
        data.forEach((item, i) => {
            const card = document.createElement('article');
            card.className = 'gear-card';
            card.innerHTML = `
                <span class="card-id">UNIT-${String(item.id).padStart(3, '0')}</span>
                <h3>${gearNames[i] || 'FIELD ITEM'}</h3>
                <p>${item.body.slice(0, 70)}...</p>
                <span class="card-tag">→ VIEW SPEC</span>
            `;
            catalogGrid.appendChild(card);
            
            setTimeout(() => card.classList.add('reveal'), i * 120);
        });
    } catch (err) {
        catalogGrid.innerHTML = `<p class="loading">CONNECTION FAILED — ${err.message}</p>`;
    }
}
loadGear();



const scrollTopBtn = document.getElementById('scrollTop');

window.addEventListener('scroll', () => {
    scrollTopBtn.classList.toggle('show', window.scrollY > 400);
});
scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});



const revealTargets = document.querySelectorAll('.catalog, .specs, .deploy, .footer');
revealTargets.forEach(el => el.classList.add('reveal-section'));

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.15 });

revealTargets.forEach(el => observer.observe(el));



   
document.querySelectorAll('.swatch').forEach(swatch => {
    swatch.addEventListener('click', () => {
        document.querySelector('.swatch.active').classList.remove('active');
        swatch.classList.add('active');
    });
});



document.querySelectorAll('.pager').forEach(dot => {
    dot.addEventListener('click', () => {
        document.querySelector('.pager.active').classList.remove('active');
        dot.classList.add('active');
    });
});



const sections = document.querySelectorAll('section[id], footer[id]');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(sec => {
        if (window.scrollY >= sec.offsetTop - 120) current = sec.id;
    });
    navLinks.forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === '#' + current);
    });
});
