function investigation() {
    // Récupérer les valeurs des champs d'entrée
    var email = document.getElementById('email-investigation').value;
    var tel = document.getElementById('tel-investigation').value;

    // Vérifier si le champ email a une valeur et ouvrir l'URL correspondante
    if (email) {
        var urlEmail = 'https://epieos.com/?q=' + encodeURIComponent(email) + '&t=email';
        window.open(urlEmail, '_blank');
    }

    // Vérifier si le champ tel a une valeur et ouvrir l'URL correspondante
    if (tel) {
        var urlTel = 'https://epieos.com/?q=' + encodeURIComponent(tel) + '&t=phone';
        window.open(urlTel, '_blank');
    }
}