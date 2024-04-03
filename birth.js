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

    var gender = document.getElementById("gender").value;
    var maxLifeExpectancy = (gender === "male") ? 79.1 : 85.1; // Esperance de Vie

    // Calcul du pourcentage de vie restante
    var lifePercentage = ((maxLifeExpectancy - age) / maxLifeExpectancy) * 100;

    // S'assurer que le pourcentage ne dépasse pas 100% et n'est pas négatif
    if (lifePercentage > 100) {
        lifePercentage = 100;
    } else if (lifePercentage < 0) {
        lifePercentage = 0;
    }

    // Mise à jour de la barre de progression pour afficher la vie restante
    var progressBar = document.querySelector("#esperanceHP .progress-bar");
    progressBar.style.width = lifePercentage + "%";
    progressBar.innerText = lifePercentage.toFixed(1) + " %";

    // Le calcul de l'âge actuel et du nombre de nuits écoulées reste inchangé
    document.getElementById("current-age").innerText = "Level " + age;
    var oneDay = 24 * 60 * 60 * 1000; // heures*minutes*secondes*millisecondes
    var nightsLived = Math.floor((currentDate - birthDate) / oneDay);
    document.getElementById("nights-lived").innerText = nightsLived + " Dark Moons";
}

document.addEventListener('DOMContentLoaded', function() {
    calculerAgeEtNuitsEcoulées();
});

// La fonction setDefaultDate reste inchangée
function setDefaultDate() {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); // Janvier est 0 !
    var yyyy = today.getFullYear();
    today = yyyy + '-' + mm + '-' + dd;
    document.getElementById('BirthDate').value = today;
}
setDefaultDate(); // Ceci définit la date du jour par défaut
