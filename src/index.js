let $$ = selector => document.querySelector(selector);

const nom = $$("#nom");
const prenom = $$("#prenom");
const email = $$("#email");
const tel = $$("#tel");
const addr = $$("#addr");
const prob = $$("#probleme");
const bac = $$("#bac");
const piece = $$("#piece");
const type = $$("#type");
const err = $$("#errors");

const tTicket = $$("#ticket");
let ticket = 0; 

function validNom() {
    let isValid = true;
    if (nom.value === "") {
        nom.style.border = "3px solid rgb(255, 104, 104)";
        isValid = false;
        $$("#nomErr").textContent = "⚠Nom Invalide"
        $$("#nomErr").style.display="inline-block"
    }
    else {
        nom.style.border = "1px solid black";
        $$("#nomErr").textContent = "";
        $$("#nomErr").style.display="none"
    }
    return isValid;
} // validNom()

function validPrenom() {
    let isValid = true;
    if (prenom.value == "") {
        prenom.style.border = "3px solid rgb(255, 104, 104)";
        isValid = false;
        $$("#prenomErr").textContent = "⚠Prénom Invalide"
        $$("#prenomErr").style.display="inline-block"
    }
    else {
        prenom.style.border = "1px solid black";
        $$("#prenomErr").textContent = "";
        $$("#prenomErr").style.display="none"
    }
    return isValid;
} // validNom()

function validEmail() {
    let isValid = true;
    var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (!email.value.match(validRegex)) {
        isValid = false;
        email.style.border = "3px solid rgb(255, 104, 104)";
        $$("#emailErr").textContent = "⚠Adresse Courriel Invalide"
        $$("#emailErr").style.display="block"
    }
    else {
        email.style.border = "1px solid black";
        $$("#emailErr").textContent = "";
        $$("#emailErr").style.display="none"
    }
    return isValid;
} // validNom()

function validTel() {
    let isValid = true;
    var validRegex = /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/;
    if (!tel.value.match(validRegex)) {
        isValid = false;
        tel.style.border = "3px solid rgb(255, 104, 104)";
        $$("#telErr").textContent = "⚠Telephone Invalide"
        $$("#telErr").style.display="block"
    }
    else {
        tel.style.border = "1px solid black";
        $$("#telErr").textContent = "";
        $$("#telErr").style.display="none"
    }
    return isValid;
} // validTel()

function validAddr() {
    let isValid = true;
    if (addr.value === "") {
        isValid = false;
        addr.style.border = "3px solid rgb(255, 104, 104)";
        $$("#addrErr").textContent = "⚠Adresse Invalide"
        $$("#addrErr").style.display="block"
    }
    else {
        addr.style.border = "1px solid black";
        $$("#addrErr").textContent = "";
    }
    return isValid;
} // validBac()

function validProb() {
    let isValid = true;
    if (prob.value === "") {
        isValid = false;
        prob.style.border = "3px solid rgb(255, 104, 104)";
        $$("#probErr").textContent = "⚠Vous devez inclure une description du probleme."
        $$("#probErr").style.display="block"
    }
    else {
        prob.style.border = "1px solid black";
        $$("#probErr").textContent = "";
        $$("#probErr").style.display="none"
    }
    return isValid;
} // validProb()

function validBac() {
    let isValid = true;
    if (bac.value === "" || isNaN(bac.value)) {
        isValid = false;
        bac.style.border = "3px solid rgb(255, 104, 104)";
        $$("#bacErr").textContent = "⚠Numero de bac invalide"
        $$("#bacErr").style.display="block"
    }
    else {
        bac.style.border = "1px solid black";
        $$("#bacErr").textContent = "";
    }
    return isValid;
} // validBac()

function validPiece() {
    let isValid = true;
    if (piece.value === "unselected") {
        isValid = false;
        piece.style.border = "3px solid rgb(255, 104, 104)";
        $$("#pieceErr").textContent = "⚠Vous devez sélectionner une piece."
        $$("#pieceErr").style.display="block"
    }
    else {
        piece.style.border = "1px solid black";
        $$("#pieceErr").textContent = "";
        $$("#pieceErr").style.display="none"
    }
    return isValid;
} // validBac()

function validType() {
    let isValid = true;
    if (type.value === "unselected") {
        isValid = false;
        type.style.border = "3px solid rgb(255, 104, 104)";
        $$("#typeErr").textContent = "⚠Vous devez sélectionner un bac."
        $$("#typeErr").style.display="block"
    } else {
        type.style.border = "1px solid black";
        $$("#typeErr").textContent = "";
        $$("#typeErr").style.display="none"
    }
    return isValid;
} // validType()

function validateForm(event) {
    event.preventDefault();
    let isValid = true;
    if (!validNom()) isValid = false;
    if (!validPrenom()) isValid = false;
    if (!validEmail()) isValid = false;
    if (!validTel()) isValid = false;
    if (!validAddr()) isValid = false;
    if (!validProb()) isValid = false;
    if (!validBac()) isValid = false;
    if (!validType()) isValid = false;
    if (!validPiece()) isValid = false;
    if (isValid) {

        let formData = new FormData();

        formData.append("nom", nom.value);
        formData.append("prenom", prenom.value);
        formData.append("courriel", email.value);
        formData.append("telephone", tel.value);
        formData.append("adresse", addr.value);
        formData.append("nb_bac", bac.value);
        formData.append("piece", piece.value);
        formData.append("type", type.value);
        formData.append("message", prob.value);

        const request = new XMLHttpRequest();
        request.open("POST", "/ajouter");
        request.send(formData);
        
        request.onload = () => {
            response = request.responseText;
            ticket=response;
            tTicket.innerHTML="Votre requête a été reçu avec le numero de tiquet: "+ticket
            tTicket.style.display="block"
        }

        nom.value = "";
        prenom.value = "";
        email.value = "";
        tel.value = "";
        addr.value = "";
        bac.value = "";
        piece.value = "-";
        type.value = "-";
        prob.value = "";

    }
    return isValid;
} // validateForm()

nom.onchange = validNom;
prenom.onchange = validPrenom;
email.onchange = validEmail;
tel.onchange = validTel;
prob.onchange = validProb;
addr.onchange = validAddr;
bac.onchange = validBac;
piece.onchange = validPiece;
type.onchange = validType;

const form = $$("#form");
form.onsubmit = validateForm;
