function calculerAgeEtNuitsEcoulées() {
var inputDateNaissance = document.getElementById("BirthDate").value;
if (!inputDateNaissance) {
    return; // Sortie anticipée si aucune date n'est fournie
}

var parts = inputDateNaissance.split('-');
var birthDate = new Date(parts[0], parts[1] - 1, parts[2]);
var currentDate = new Date();

// Calcul de l'âge
var age = currentDate.getFullYear() - birthDate.getFullYear();
var m = currentDate.getMonth() - birthDate.getMonth();
if (m < 0 || (m === 0 && currentDate.getDate() < birthDate.getDate())) {
    age--;
}

// Calcul du nombre de nuits écoulées
var oneDay = 24 * 60 * 60 * 1000; // heures*minutes*secondes*millisecondes
var nightsLived = Math.floor((currentDate - birthDate) / oneDay);

// Mise à jour de l'affichage
document.getElementById("current-age").innerText = "Level " + age;
document.getElementById("nights-lived").innerText = nightsLived + " lunes";

    // Mise à jour de la barre de progression pour l'espérance de vie
    var gender = document.getElementById("gender").value;
    var maxLifeExpectancy = (gender === "male") ? 80 : 79; // 80 ans pour un homme, 79 pour une femme
    var lifePercentage = (age / maxLifeExpectancy) * 100;
    
    // S'assurer que le pourcentage ne dépasse pas 100%
    if (lifePercentage > 100) {
        lifePercentage = 100;
    }
    
    // Mise à jour de la barre de progression
    var progressBar = document.querySelector("#esperanceHP .progress-bar");
    progressBar.style.width = lifePercentage + "%";
    progressBar.innerText = lifePercentage.toFixed(1) + " %"; // Arrondi à l'entier le plus proche

}

document.addEventListener('DOMContentLoaded', function() {
    calculerAgeEtNuitsEcoulées();
});




// Mettre par defaut la date du jour
function setDefaultDate() {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); // Janvier est 0 !
    var yyyy = today.getFullYear();
    today = yyyy + '-' + mm + '-' + dd;
    document.getElementById('BirthDate').value = today;
}

// Ajoutez ici votre fonction calculerAgeEtNuitsEcoulées

setDefaultDate(); // Ceci définit la date du jour par défaut