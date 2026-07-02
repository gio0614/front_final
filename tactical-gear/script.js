/* ============================================================
   VANGUARD — script.js
   ფუნქციონალი: burger მენიუ, fetch API, localStorage cookies,
   header bg change on scroll, scroll to top, section reveal,
   ფერების არჩევა, pager.
============================================================ */

/* ---------- 1. BURGER MENU ----------
   ბურგერის ღილაკზე დაჭერისას ვცვლით 'open' კლასს მენიუზე
   და თავად ბურგერზე (X-ად გადაქცევა). */
const burger = document.getElementById('burger');
const navMenu = document.getElementById('navMenu');

burger.addEventListener('click', () => {
    burger.classList.toggle('open');
    navMenu.classList.toggle('open');
});

// მენიუს ლინკზე დაჭერისას მობილურზე მენიუ იხურება
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        burger.classList.remove('open');
        navMenu.classList.remove('open');
    });
});


/* ---------- 2. HEADER BG CHANGE ON SCROLL ----------
   როცა გვერდი ჩამოსქროლილია 50px-ზე მეტად, header-ს ვამატებთ
   'scrolled' კლასს (მუქი ფონი + blur). */
const header = document.getElementById('header');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});


/* ---------- 3. COOKIE NOTIFICATION + localStorage ----------
   თუ localStorage-ში უკვე შენახულია 'cookiesAccepted', ბანერი
   საერთოდ არ ჩნდება. ACCEPT-ზე დაჭერისას ვინახავთ flag-ს და
   ვმალავთ ბანერს. */
const cookieBanner = document.getElementById('cookieBanner');
const acceptBtn = document.getElementById('acceptCookies');

if (localStorage.getItem('cookiesAccepted') === 'true') {
    cookieBanner.classList.add('hide');
}

acceptBtn.addEventListener('click', () => {
    localStorage.setItem('cookiesAccepted', 'true');
    cookieBanner.classList.add('hide');
});


/* ---------- 4. FETCH API (async/await) ----------
   ვიღებთ მონაცემებს უფასო ღია API-დან (jsonplaceholder) და
   პირველ 6 ჩანაწერს ვაქცევთ "აღჭურვილობის" ბარათებად.
   try/catch ამუშავებს შესაძლო შეცდომას. */
const catalogGrid = document.getElementById('catalogGrid');

// კოდური სახელები, რომ generic მონაცემები სამხედრო თემას მოვარგოთ
const gearNames = ['RECON HELMET', 'PLATE CARRIER', 'NIGHT OPTIC', 'COMBAT GLOVES', 'TAC BELT', 'FIELD PACK'];

async function loadGear() {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=6');
        if (!response.ok) throw new Error('SIGNAL LOST');
        const data = await response.json();

        catalogGrid.innerHTML = ''; // ვასუფთავებთ "LOADING..." ტექსტს

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
            // ბარათებს თანმიმდევრულად ვამჟღავნებთ (stagger)
            setTimeout(() => card.classList.add('reveal'), i * 120);
        });
    } catch (err) {
        catalogGrid.innerHTML = `<p class="loading">CONNECTION FAILED — ${err.message}</p>`;
    }
}
loadGear();


/* ---------- 5. SCROLL TO TOP ----------
   ღილაკი ჩნდება 400px-ის შემდეგ; დაჭერისას გვაბრუნებს ზემოთ. */
const scrollTopBtn = document.getElementById('scrollTop');

window.addEventListener('scroll', () => {
    scrollTopBtn.classList.toggle('show', window.scrollY > 400);
});
scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});


/* ---------- 6. SECTION REVEAL (IntersectionObserver) ----------
   სექციები ჩნდება ეკრანზე მოხვედრისას. */
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


/* ---------- 7. COLOR SWATCH SELECT ----------
   ფერის არჩევისას ვცვლით 'active' კლასს. */
document.querySelectorAll('.swatch').forEach(swatch => {
    swatch.addEventListener('click', () => {
        document.querySelector('.swatch.active').classList.remove('active');
        swatch.classList.add('active');
    });
});


/* ---------- 8. HERO PAGER ---------- */
document.querySelectorAll('.pager').forEach(dot => {
    dot.addEventListener('click', () => {
        document.querySelector('.pager.active').classList.remove('active');
        dot.classList.add('active');
    });
});


/* ---------- 9. ACTIVE NAV ON SCROLL ----------
   ნავიგაციის ლინკი მონიშნულია იმ სექციის მიხედვით, რომელზეც ვართ. */
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
