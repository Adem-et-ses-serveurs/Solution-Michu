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
  L’utilisateur est alerté que sa requête a été rejetée.
  `);
}

let tickets = [];

const request = new XMLHttpRequest();

request.open("POST", "/get-all");
request.setRequestHeader('Authorization', 'test');
request.send();

request.onload = () => {
  response = request.responseText;
  jsonRes = JSON.parse(response);
  tickets = jsonRes;
  console.log(response)
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
        <td>${ticket.type}</td>
        <td>${ticket.message}</td>
        <td align="right">
        <fieldset id="group${ticket.id}" class="btn-group btn-group-toggle" data-toggle="buttons">
        <label class="btn btn-secondary" onclick="modification(${ticket.id}, 'consideration', ${JSON.stringify(ticket).replaceAll('"', "'")})" >
          <input name="group${ticket.id}" type="radio" name="options" id="option1" autocomplete="off" ${ticket.etat == 'consideration' ? 'checked' : ''}> Considération
        </label>
        <label class="btn btn-secondary" onclick="modification(${ticket.id}, 'travail', ${JSON.stringify(ticket).replaceAll('"', "'")})" >
          <input name="group${ticket.id}" type="radio" name="options" id="option2" autocomplete="off" ${ticket.etat == 'travail' ? 'checked' : ''}> Travail
        </label>
        <label class="btn btn-secondary" onclick="modification(${ticket.id}, 'fini', ${JSON.stringify(ticket).replaceAll('"', "'")})" >
          <input name="group${ticket.id}" type="radio" name="options" id="option3" autocomplete="off" ${ticket.etat == 'fini' ? 'checked' : ''}> Complété
        </label><br>
        <label class="btn btn-secondary">
            <input name="group${ticket.id}" type="radio" name="options" id="option3" autocomplete="off" onclick="supprimer(event,${ticket.id})"> Rejeter
          </label>
      </fieldset>
        </td>`;

    table.appendChild(newTd);
  });

}

const modification = (id, etat, ticket) => {
  let formData = new FormData();

  formData.append("id", id)
  formData.append("nom", ticket.nom);
  formData.append("prenom", ticket.prenom);
  formData.append("courriel", ticket.courriel);
  formData.append("telephone", ticket.telephone);
  formData.append("adresse", ticket.adresse);
  formData.append("etat", etat)
  formData.append("nb_bac", ticket.nb_bac);
  formData.append("piece", ticket.piece);
  formData.append("type", ticket.type);
  formData.append("message", ticket.message);

  const request = new XMLHttpRequest();
  request.open("POST", "/modifier");
  request.setRequestHeader('Authorization', 'test');
  request.send(formData);
  console.log(request)
}

const supprimer = (event,id) => {
  let formData = new FormData();
  console.log(event.target)
  formData.append("id", id)

  const request = new XMLHttpRequest();

  request.open("DELETE", "/supprimer");
  request.setRequestHeader('Authorization', 'test');
  request.send(formData);

  event.target.parentElement.parentElement.parentElement.parentElement.remove()
}
