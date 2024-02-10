let arraylevl = {
    "Easy": ["Code", "Run", "Write", "Read", "Play", "Html", "Css", "Java", "Want", "Good", "Easy", "Bad", "Dance", "Eat", "Fly", "Hello", "Town", "Task", "Test", "Rust"],
    "Normal": ["Coding", "Compile", "Error", "Proplem", "Javascript", "Programe", "Country", "Testing", "Youtube", "Linkedin", "Github", "Leetcode", "Internet", "Python", "Scala", "Playing", "Runner", "Funny", "Working", "Styling"],
    "Hard": ["Programming", "Destructuring", "Documentation", "Despendencies", "Implement", "Exacerbate", "Bureaucracy", "Chiaroscurist", "Xerostomia", "Quizzify", "Paraphernalia", "Onomatopoeia", "Ecclesiastical", "Gastrointestinal", "Sesquipedalian", "Discombobulate", "Imeffable", "Obfuscate", "Inscrutable", "Serendipity"],
};
const level = { "Easy": 6, "Normal": 4, "Hard": 2 };
let input = document.querySelector(".input");
input.onpaste = () => {
    return false;
};
let def_level = "Easy";
if (localStorage.getItem("level")) {
    document.querySelector(".message select").value = localStorage.getItem("level");
    def_level = localStorage.getItem("level");
};
let def_level_sec = level[def_level];
document.querySelector(".lvl").textContent = def_level;
document.querySelectorAll(".second").forEach(e => {
    e.textContent = def_level_sec;
});
document.querySelector(".time span").textContent = def_level_sec;
document.querySelector(".total").textContent = arraylevl[def_level].length;
document.querySelector(".message select").onchange = () => {
    def_level = document.querySelector(".message select").value;
    def_level_sec = level[def_level];
    document.querySelector(".lvl").textContent = def_level;
    document.querySelectorAll(".second").forEach(e => {
        e.textContent = def_level_sec;
    });
    document.querySelector(".time span").textContent = def_level_sec;
    document.querySelector(".total").textContent = arraylevl[def_level].length;
    localStorage.setItem("level", def_level);
};
let array;
document.querySelector(".start").onclick = () => {
    document.querySelector(".next-word").style.display = "flex";
    array = [...arraylevl[def_level]];
    console.log(array)
    input.value = "";
    document.querySelector(".control .got").textContent = 0;
    document.querySelector(".message").style.display = "none";
    document.querySelector(".finish").style.display = "none";
    (document.querySelector(".finish").classList.contains("bad")) ? document.querySelector(".finish").classList.remove("bad") : document.querySelector(".finish").classList.remove("good");
    document.querySelector(".start").style.display = "none";
    input.focus();
    sw();
};
function sw() {
    let rword = array[Math.floor(Math.random() * array.length)];
    document.querySelector(".the-word").textContent = "";
    document.querySelector(".the-word").appendChild(document.createTextNode(rword));
    array.splice(array.indexOf(rword), 1);
    document.querySelector(".next-word").innerHTML = "";
    array.forEach(e => {
        let div = document.createElement("div");
        div.appendChild(document.createTextNode(e));
        document.querySelector(".next-word").appendChild(div);
    });
    cdca();
};
function cdca() {
    let d = new Date();
    if (array.length == 0)
        document.querySelector(".next-word").style.display = "none";
    document.querySelector(".time span").textContent = def_level_sec;
    if (array.length == 19)
        document.querySelector(".time span").textContent = +document.querySelector(".time span").textContent + 2;
    let i = setInterval(() => {
        document.querySelector(".time span").textContent--;
        if (document.querySelector(".time span").textContent === "0") {
            clearInterval(i);
            if (input.value === document.querySelector(".the-word").textContent.toLowerCase()) {
                document.querySelector(".control .got").textContent++;
                input.value = "";
                if (array.length != 0) {
                    sw();
                } else {
                    document.querySelector(".message").style.display = "block";
                    document.querySelector(".start").style.display = "block";
                    document.querySelector(".finish").style.display = "block";
                    document.querySelector(".finish").classList.add("good");
                    document.querySelector(".finish").textContent = "You Won";
                };
            } else {
                document.querySelector(".message").style.display = "block";
                document.querySelector(".start").style.display = "block";
                document.querySelector(".finish").style.display = "block";
                document.querySelector(".finish").classList.add("bad");
                document.querySelector(".finish").textContent = "Game Over";
            };
            localStorage.setItem(`${def_level} ${d.getMonth() + 1}/${d.getDate()}/${d.getFullYear()}`, `${document.querySelector(".control .got").textContent} From ${document.querySelector(".total").textContent}`)
        };
    }, 1000);
};