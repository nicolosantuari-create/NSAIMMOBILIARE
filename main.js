/**
 * N.S.A. Immobiliare - Core Experience Script
 * Handles animations, dynamic content, and interactions.
 */

document.addEventListener('DOMContentLoaded', () => {
    lucide.createIcons();
    gsap.registerPlugin(ScrollTrigger);

    initAnimations();
    initNavigation();
    initProjects();
    initContactForm();
});

const projectData = {
    terrazze: {
        title: "Le Terrazze",
        location: "Baselga di Piné (TN)",
        type: "Progetto Completato",
        desc: "Intervento residenziale di pregio composto da 15 unità in Classe A+. Architettura integrata nel paesaggio alpino con ampie vetrate.",
        details: ["15 Unità", "Classe Energetica A+", "Oltre 1500 mq"],
        img: "https://r2-bucket.flowith.net/f/ad26ee0576442d08/image-1773658853693-67zb9m05w.jpg"
    },
    orizzonti: {
        title: "Orizzonti",
        location: "Baselga di Piné (TN)",
        type: "Progetto in Sviluppo",
        desc: "Complesso contemporaneo di 13 unità. Unione perfetta tra materiali naturali e tecnologia domotica per il benessere abitativo.",
        details: ["13 Unità", "Architettura Contemporanea", "Sostenibilità"],
        img: "https://r2-bucket.flowith.net/f/31801fa25aff1537/image-1773658853702-ioi6b52ex.jpg"
    },
    duomo: {
        title: "Palazzo Duomo",
        location: "Centro Storico Trento",
        type: "Restauro Conservativo",
        desc: "Recupero prestigioso nel cuore di Trento. Valorizzazione di elementi storici uniti a comfort acustico e termico di ultima generazione.",
        details: ["Restauro Conservativo", "Prestigio Storico", "Centro Urbano"],
        img: "https://r2-bucket.flowith.net/f/36fc6187c9a78242/image-1773658853702-nhs2k7orz.jpg"
    }
};

function initAnimations() {
    const heroTl = gsap.timeline({ defaults: { ease: "expo.out", duration: 2 } });
    
    heroTl.to(".hero-img", { scale: 1, duration: 4 })
          .to(".hero-title", { opacity: 1, y: 0 }, 0.5)
          .to(".hero-sub", { opacity: 1, y: 0 }, 0.8)
          .to(".hero-cta", { opacity: 1, y: 0 }, 1.1);

    gsap.utils.toArray('.reveal').forEach(el => {
        gsap.to(el, {
            scrollTrigger: {
                trigger: el,
                start: "top 85%",
            },
            opacity: 1,
            y: 0,
            duration: 1.5,
            delay: el.dataset.delay || 0,
            ease: "power3.out"
        });
    });
}

function initNavigation() {
    const nav = document.getElementById('main-nav');
    const menuToggle = document.getElementById('menu-toggle');
    const closeMenu = document.getElementById('close-menu');
    const mobileMenu = document.getElementById('mobile-menu');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            nav.classList.add('bg-black/90', 'backdrop-blur-md', 'py-4', 'border-b', 'border-white/5');
            nav.classList.remove('py-8');
        } else {
            nav.classList.remove('bg-black/90', 'backdrop-blur-md', 'py-4', 'border-b', 'border-white/5');
            nav.classList.add('py-8');
        }
    });

    const toggleMobileMenu = (open) => {
        if (open) {
            mobileMenu.classList.remove('pointer-events-none');
            gsap.to(mobileMenu, { opacity: 1, duration: 0.5 });
        } else {
            mobileMenu.classList.add('pointer-events-none');
            gsap.to(mobileMenu, { opacity: 0, duration: 0.3 });
        }
    };

    menuToggle.addEventListener('click', () => toggleMobileMenu(true));
    closeMenu.addEventListener('click', () => toggleMobileMenu(false));
    document.querySelectorAll('.mobile-nav-link').forEach(l => l.addEventListener('click', () => toggleMobileMenu(false)));
}

function initProjects() {
    const overlay = document.getElementById('project-overlay');
    const overlayContent = document.getElementById('overlay-content');
    const closeBtn = document.getElementById('close-overlay');

    document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('click', () => {
            const data = projectData[card.dataset.project];
            renderOverlay(data);
            gsap.to(overlay, { x: 0, duration: 1, ease: "expo.inOut" });
            document.body.style.overflow = 'hidden';
        });
    });

    closeBtn.addEventListener('click', () => {
        gsap.to(overlay, { x: '100%', duration: 0.8, ease: "expo.inOut" });
        document.body.style.overflow = 'auto';
    });

    function renderOverlay(data) {
        overlayContent.innerHTML = `
            <div class="h-screen flex flex-col md:flex-row overflow-hidden">
                <div class="flex-1 overflow-hidden relative">
                    <img src="${data.img}" class="w-full h-full object-cover">
                    <div class="absolute inset-0 bg-black/20"></div>
                </div>
                <div class="flex-1 bg-anthracite p-12 md:p-24 flex flex-col justify-center overflow-y-auto">
                    <span class="text-gold text-[10px] tracking-editorial uppercase mb-6 block">${data.type}</span>
                    <h2 class="text-5xl md:text-8xl font-extralight tracking-tighter uppercase mb-12">${data.title}</h2>
                    <div class="w-12 h-px bg-gold mb-12"></div>
                    <p class="text-xl text-gray-400 font-light leading-relaxed mb-16">${data.desc}</p>
                    <div class="grid grid-cols-2 gap-12">
                        ${data.details.map(d => `
                            <div>
                                <p class="text-[8px] tracking-premium text-gray-500 uppercase mb-2">Specifica</p>
                                <p class="text-xs tracking-premium uppercase font-medium">${d}</p>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
        `;
    }
}

async function initContactForm() {
    const form = document.getElementById('contact-form');
    const status = document.getElementById('form-status');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const btn = form.querySelector('button');
        const originalText = btn.innerText;

        btn.disabled = true;
        btn.innerText = 'Invio in corso...';

        const formData = new FormData(form);
        const data = {
            name: formData.get('name'),
            email: formData.get('email'),
            message: formData.get('message')
        };


        setTimeout(() => {
            status.innerText = "Messaggio inviato correttamente. Ti contatteremo a breve.";
            status.classList.remove('hidden');
            form.reset();
            btn.disabled = false;
            btn.innerText = originalText;
            
            gsap.from(status, { opacity: 0, y: 10, duration: 0.5 });
            

            setTimeout(() => status.classList.add('hidden'), 5000);
        }, 1500);
    });
}
