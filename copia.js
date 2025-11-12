function showSection(sectionName) {
    // Hide all sections
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        section.classList.remove('active');
    });
    
    // Show selected section
    const targetSection = document.getElementById(sectionName);
    if (targetSection) {
        targetSection.classList.add('active');
    }
    
    // Handle sidebar character visibility and positioning
    const sidebarCharacter = document.querySelector('.sidebar-character');
    if (sectionName === 'home') {
        sidebarCharacter.classList.remove('show');
        sidebarCharacter.classList.remove('sobre-position');
    } else {
        sidebarCharacter.classList.add('show');
        if (sectionName === 'sobre') {
            sidebarCharacter.classList.add('sobre-position');
        } else {
            sidebarCharacter.classList.remove('sobre-position');
        }
    }
    
    // Update current page
    currentPage = sectionName;
    currentMessage = 0;
    currentSidebarMessage = 0;
    
    // Start typing for new page
    setTimeout(startTyping, 100);
}

function darkmode() {
    document.body.classList.toggle('dark');
}

// Character speaking messages
const messages = [
    "Seja bem vindo!",
    "Olá! Sou Sara!",
    "Explore meu portfólio!",
    "Vamos trabalhar juntos?",
    "Desenvolvedora em formação!",
    "Apaixonada por tecnologia!",
    "Sempre aprendendo algo novo!"
];

const pageMessages = {
    home: [
        "Seja bem vindo!",
        "Olá! Sou Sara!",
        "Explore meu portfólio!",
        "Vamos trabalhar juntos?"
    ],
    sobre: [
        "Tenho 18 anos e estou cursando Tecnologia da Informação no COTEMIG. Já tive a oportunidade de aprender e trabalhar com linguagens como CSS, C#, HTML, Java e SQL. Também já atuei como monitora e professora de TI na CNI Venda Nova, onde pude desenvolver ainda mais minhas habilidades técnicas e aprender a lidar com diferentes perfis de alunos. Apesar de estar no começo da minha trajetória, sou muito dedicada e gosto de sempre buscar novos conhecimentos. Acredito que cada experiência é uma chance de evoluir e crescer na área de tecnologia, que é algo que realmente me motiva."
    ],
    habilidades: [
        "Minhas habilidades!",
        "Tecnologias que domino!",
        "Soft skills também!",
        "Sempre aprendendo!"
    ],
    projetos: [
        "Meus projetos!",
        "Baixe meu currículo!",
        "Veja meu GitHub!",
        "Trabalhos realizados!"
    ],
    contato: [
        "Vamos conversar?",
        "Se você curtiu meu trabalho, tem uma ideia legal ou só quer trocar uma ideia sobre T.I, pode me chamar!",
        "Sou super acessível e adoro conhecer gente nova!",
        "E projetos também!",
        "Entre em contato!",
        "Me mande uma mensagem!"
    ]
};

let currentMessage = 0;
let currentSidebarMessage = 0;
let currentPage = 'home';
let typingTimer = null;

function clearAllTimers() {
    if (typingTimer) {
        clearTimeout(typingTimer);
        typingTimer = null;
    }
}

function simpleType(element, text, speed) {
    element.textContent = '';
    let i = 0;
    
    function addChar() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            typingTimer = setTimeout(addChar, speed);
        } else {
            scheduleNext();
        }
    }
    addChar();
}

function scheduleNext() {
    typingTimer = setTimeout(() => {
        if (currentPage === 'home') {
            const bubble = document.querySelector('.speech-bubble');
            if (bubble) {
                const messages = pageMessages.home;
                currentMessage = (currentMessage + 1) % messages.length;
                simpleType(bubble, messages[currentMessage], 150);
            }
        } else {
            const sidebarBubble = document.querySelector('.sidebar-speech-bubble');
            if (sidebarBubble && document.querySelector('.sidebar-character').classList.contains('show')) {
                const messages = pageMessages[currentPage];
                const speed = currentPage === 'sobre' ? 60 : 120;
                currentSidebarMessage = (currentSidebarMessage + 1) % messages.length;
                simpleType(sidebarBubble, messages[currentSidebarMessage], speed);
            }
        }
    }, 8000);
}

function startTyping() {
    clearAllTimers();
    
    if (currentPage === 'home') {
        const bubble = document.querySelector('.speech-bubble');
        if (bubble) {
            simpleType(bubble, pageMessages.home[currentMessage], 150);
        }
    } else {
        const sidebarBubble = document.querySelector('.sidebar-speech-bubble');
        if (sidebarBubble) {
            const speed = currentPage === 'sobre' ? 60 : 120;
            simpleType(sidebarBubble, pageMessages[currentPage][currentSidebarMessage], speed);
        }
    }
}

// Initialize with 'home' section active
document.addEventListener('DOMContentLoaded', function() {
    showSection('home');
});