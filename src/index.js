let $$ = selector => document.querySelector(selector);

const nom = $$("#nom");
const prenom = $$("#prenom");
const email = $$("#email");
const tel = $$("#tel");
const addr = $$("#addr");
const prob = $$("#probleme");
const bac = $$("#bac");
const err = $$("#errors");

const tTicket = $$("#ticket");
let ticket = 0; 

function validNom() {
    let isValid = true;
    if (nom.value === "") {
        nom.style.border = "thin solid red";
        isValid = false;
        $$("#nomErr").textContent = "⚠Nom Invalide"
        $$("#nomErr").style.display="inline-block"
    }
    else {
        nom.style.border = "thin solid black";
        $$("#nomErr").textContent = "";
        $$("#nomErr").style.display="none"
    }
    return isValid;
} // validNom()

function validPrenom() {
    let isValid = true;
    if (prenom.value == "") {
        prenom.style.border = "thin solid red";
        isValid = false;
        $$("#prenomErr").textContent = "⚠Prenom Invalide"
        $$("#prenomErr").style.display="inline-block"
    }
    else {
        prenom.style.border = "thin solid black";
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
        email.style.border = "thin solid red";
        $$("#emailErr").textContent = "⚠Adresse Courriel Invalide"
        $$("#emailErr").style.display="block"
    }
    else {
        email.style.border = "thin solid black";
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
        tel.style.border = "thin solid red";
        $$("#telErr").textContent = "⚠Telephone Invalide"
        $$("#telErr").style.display="block"
    }
    else {
        tel.style.border = "thin solid black";
        $$("#telErr").textContent = "";
        $$("#telErr").style.display="none"
    }
    return isValid;
} // validTel()

function validAddr() {
    let isValid = true;
    if (addr.value === "") {
        isValid = false;
        addr.style.border = "thin solid red";
        $$("#addrErr").textContent = "⚠Adresse Invalide"
        $$("#addrErr").style.display="block"
    }
    else {
        addr.style.border = "thin solid black";
        $$("#addrErr").textContent = "";
    }
    return isValid;
} // validBac()

function validProb() {
    let isValid = true;
    if (prob.value === "") {
        isValid = false;
        prob.style.border = "thin solid red";
        $$("#probErr").textContent = "⚠Vous devez inclure une description du probleme."
        $$("#probErr").style.display="block"
    }
    else {
        prob.style.border = "thin solid black";
        $$("#probErr").textContent = "";
        $$("#probErr").style.display="none"
    }
    return isValid;
} // validProb()

function validBac() {
    let isValid = true;
    if (bac.value === "") {
        isValid = false;
        bac.style.border = "thin solid red";
        $$("#bacErr").textContent = "⚠Numero de bac invalide"
        $$("#bacErr").style.display="block"
    }
    else {
        bac.style.border = "thin solid black";
        $$("#bacErr").textContent = "";
    }
    return isValid;
} // validBac()

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
    if (isValid) {

        let formData = new FormData();

        formData.append("nom", nom.value);
        formData.append("prenom", prenom.value);
        formData.append("courriel", email.value);
        formData.append("telephone", tel.value);
        formData.append("addresse", addr.value);
        formData.append("nb_bac", bac.value);
        formData.append("message", prob.value);

        const request = new XMLHttpRequest();
        request.open("POST", "http://127.0.0.1:5000/ajouter");
        request.send(formData);
        
        request.onload = () => {
            response = request.responseText;
            ticket=response;
            tTicket.innerHTML="Votre requete a bien été recu avec le numero de tiquet: "+ticket
            tTicket.style.display="block"
        }
    }
    return isValid;
} // validateForm()

nom.onblur = validNom;
prenom.onblur = validPrenom;
email.onblur = validEmail;
tel.onblur = validTel;
prob.onblur = validProb;
addr.onblur = validAddr;
bac.onblur = validBac;

const form = $$("#form");
form.onsubmit = validateForm;

const piece = $$("#piece");

function validPiece() {
    let isValid = true;
    if (piece.value == "default"){
        isValid = false;
        piece.style.border = "thin solid red";
        $$("#pieceErr").textContent = "⚠Vous devez sélectionner une pièce."
        $$("#pieceErr").style.display="block"
    }
    else {
        piece.style.border = "thin solid black";
        $$("#pieceErr").textContent = "";
    }
    return isValid;
} // validPiece()
    if (!validPiece()) isValid = false;
piece.onblur = validPiece;
