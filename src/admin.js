let password;
const body = document.querySelector('body');
body.style.display = "none"
do {
  password = prompt("Mot de passe: ");
} while (password !== "ademetserveurs")
body.style.display = "block"
const table = document.querySelector('#table-rows');

const btn = document.querySelector("#info");

btn.onclick = function () {
  alert(`Information: 
  Consideration:
  L'utilisateur est informé par courriel que sa requête est en état de consideration.
  Travail:
  La requête est en travaille
  Mr Action reçoit courriel de la requête et commence à travailler
  L’utilisateur est informé par courriel de l'état de la requête.
  Si Mr. Action ne prend pas action dans une limite du temp, l’administrateur est alerté.
  Complété
  La requête est complétée.
  M. Action a fini son travail.
  L’utilisateur est informé par courriel.
  Rejeter:
  Enlève la requête de la base de données.
  L’utilisateur est alerté que sa requête a été rejetée.s
  `);
}

let tickets = [];

const request = new XMLHttpRequest();

request.open("POST", "/get-all");
request.setRequestHeader('Auth', 'test');
request.send();

request.onload = () => {
  response = request.responseText;
  jsonRes = JSON.parse(response);
  tickets = jsonRes;

  jsonRes.forEach(ticket => {
    newTd = document.createElement('tr');
    newTd.innerHTML = `<th scope="row">${ticket.id}</th>
        <td>${ticket.nom}</td>
        <td>${ticket.prenom}</td>
        <td>${ticket.courriel}</td>
        <td>${ticket.telephone}</td>
        <td>${ticket.adresse}</td>
        <td>${ticket.nb_bac}</td>
        <td>${ticket.piece}</td>
        <td>${ticket.message}</td>
        <td align="right">
        <fieldset id="group${ticket.id}" class="btn-group btn-group-toggle" data-toggle="buttons">
        <label class="btn btn-secondary" onclick="modification(${ticket.id}, 'consideration')" ${ticket.etat == 'consideration' ? 'checked' : ''}>
          <input name="group${ticket.id}" type="radio" name="options" id="option1" autocomplete="off"> Consideration
        </label>
        <label class="btn btn-secondary" onclick="modification(${ticket.id}, 'travail')" ${ticket.etat == 'travail' ? 'checked' : ''}>
          <input name="group${ticket.id}" type="radio" name="options" id="option2" autocomplete="off"> Travail
        </label>
        <label class="btn btn-secondary" onclick="modification(${ticket.id}, 'fini')" ${ticket.etat == 'fini' ? 'checked' : ''}>
          <input name="group${ticket.id}" type="radio" name="options" id="option3" autocomplete="off"> Complété
        </label>
        <label class="btn btn-secondary">
            <input name="group${ticket.id}" type="radio" name="options" id="option3" autocomplete="off" onclick="supprimer(${ticket.id})"> Rejeter
          </label>
      </fieldset>
        </td>`;

    table.appendChild(newTd);
  });

}

const modification = (id, etat) => {
  let formData = new FormData();

  formData.append("id", id)
  formData.append("nom", tickets.nom);
  formData.append("prenom", tickets.prenom);
  formData.append("courriel", tickets.courriel);
  formData.append("telephone", tickets.telephone);
  formData.append("adresse", tickets.adresse);
  formData.append("etat", etat)
  formData.append("nb_bac", tickets.nb_bac);
  formData.append("piece", tickets.piece);
  formData.append("message", tickets.message);

  const request = new XMLHttpRequest();
  request.open("POST", "/modifier");
  request.send(formData);
}

const supprimer = (id) => {
  let formData = new FormData();
  
  formData.append("id", id)

  const request = new XMLHttpRequest();

  request.open("DELETE", "/supprimer");
  request.setRequestHeader('Auth', 'test');
  request.send(formData);
}