let editingHero = null;

window.onload = function() {
    loadHeroes(); // Load heroes when the page is loaded
};

function showEntryPage() {
    document.getElementById("home-page").style.display = "none";
    document.getElementById("entry-page").style.display = "block";
}

function showHomePage() {
    document.getElementById("home-page").style.display = "block";
    document.getElementById("entry-page").style.display = "none";
}

function saveHero() {
    const heroName = document.getElementById("hero-name").value;
    const role = document.getElementById("role").value;
    const passive = document.getElementById("passive").value;
    const skill1Name = document.getElementById("skill1-name").value;
    const skill1 = document.getElementById("skill1").value;
    const skill2Name = document.getElementById("skill2-name").value;
    const skill2 = document.getElementById("skill2").value;
    const skill3Name = document.getElementById("skill3-name").value;
    const skill3 = document.getElementById("skill3").value;
    const ultimateName = document.getElementById("ultimate-name").value;
    const ultimate = document.getElementById("ultimate").value;
    const quote = document.getElementById("quote").value;

    const heroData = {
        name: heroName,
        role: role,
        passive: passive,
        skills: {
            skill1Name: skill1Name,
            skill1: skill1,
            skill2Name: skill2Name,
            skill2: skill2,
            skill3Name: skill3Name,
            skill3: skill3,
            ultimateName: ultimateName,
            ultimate: ultimate
        },
        quote: quote
    };

    if (editingHero) {
        localStorage.setItem(editingHero, JSON.stringify(heroData));
        editingHero = null;
    } else {
        const heroKey = "hero-" + new Date().getTime();
        localStorage.setItem(heroKey, JSON.stringify(heroData));
    }

    showHomePage();
    loadHeroes();
}

function loadHeroes() {
    const heroList = document.getElementById("hero-list");
    heroList.innerHTML = "";

    if (localStorage.length === 0) {
        heroList.innerHTML = "<p>No heroes found. Add some!</p>";
    }

    for (let i = 0; i < localStorage.length; i++) {
        const heroKey = localStorage.key(i);
        if (heroKey.startsWith("hero-")) {
            const heroData = JSON.parse(localStorage.getItem(heroKey));
            const heroItem = document.createElement("div");
            heroItem.className = "hero-item";

            heroItem.innerHTML = `
                <span>${heroData.name} - ${heroData.role}</span>
                <div>
                    <button onclick="editHero('${heroKey}')">Edit</button>
                    <button onclick="deleteHero('${heroKey}')">Delete</button>
                </div>
            `;
            heroList.appendChild(heroItem);
        }
    }
}

function editHero(heroKey) {
    editingHero = heroKey;
    const heroData = JSON.parse(localStorage.getItem(heroKey));

    document.getElementById("hero-name").value = heroData.name;
    document.getElementById("role").value = heroData.role;
    document.getElementById("passive").value = heroData.passive;
    document.getElementById("skill1-name").value = heroData.skills.skill1Name;
    document.getElementById("skill1").value = heroData.skills.skill1;
    document.getElementById("skill2-name").value = heroData.skills.skill2Name;
    document.getElementById("skill2").value = heroData.skills.skill2;
    document.getElementById("skill3-name").value = heroData.skills.skill3Name;
    document.getElementById("skill3").value = heroData.skills.skill3;
    document.getElementById("ultimate-name").value = heroData.skills.ultimateName;
    document.getElementById("ultimate").value = heroData.skills.ultimate;
    document.getElementById("quote").value = heroData.quote;

    showEntryPage();
}

function deleteHero(heroKey) {
    if (confirm("Are you sure you want to delete this hero?")) {
        localStorage.removeItem(heroKey);
        loadHeroes();
    }
}
