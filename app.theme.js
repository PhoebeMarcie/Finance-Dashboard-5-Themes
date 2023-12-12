const Themes = Object.freeze({
    ICE: 'ice',
    NIGHT_DIVE: 'night-dive',
    LILAC: 'lilac',
    CHERRY_BLOSSOM: 'cherry-blossom',
    AURORA: 'aurora',
});

const cycle = [
    Themes.AURORA,
    Themes.CHERRY_BLOSSOM,
    Themes.ICE,
    Themes.LILAC,
    Themes.NIGHT_DIVE
];

const defaultTheme = Themes.ICE;
const restoredTheme = localStorage.getItem('theme');
let currentTheme = null;

function setup () {
    currentTheme = restoredTheme || defaultTheme;
    applyTheme(currentTheme);

    const themeToggle = document.querySelector('#theme-toggle');

    if(!themeToggle){
        return;
    }

    themeToggle.addEventListener('click', ()=> {
        let index =cycle.indexOf(currentTheme);

        if(index < 0) {
            index = 0;
        }
        index = (index + 1) % cycle.length;
        const newTheme = cycle[index];

        applyTheme(newTheme);

    })
}
 
function applyTheme(theme){
    const themeClass = `theme-${theme}`;
    currentTheme = theme;

    const remove = Object.values(Themes)
    .map((t) => `theme-${t}`)
    .filter((cls) => cls !==themeClass);

    document.body.classList.remove(...remove);

    if(!document.body.classList.contains(themeClass)){
        document.body.classList.add(themeClass);
    }

    if(currentTheme !== defaultTheme){
        localStorage.setItem('theme', theme);
    }
    else{
        localStorage.removeItem('theme');
    }
}

export {
    setup
};