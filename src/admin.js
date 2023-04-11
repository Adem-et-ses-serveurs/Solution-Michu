/*
    Copyright (C) 2023 Antoine Meloche and HackMeMan and Sabrina Tochkov

    This file is part of Solution-Michu.

    Solution-Michu is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.

    Solution-Michu is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.

    You should have received a copy of the GNU General Public License along with Solution-Michu. If not, see <https://www.gnu.org/licenses/>. 
*/

let password;
const body = document.querySelector('body');
body.style.display = "none"
body.style.display = "block"
const table = document.querySelector('#table-rows');

let tickets = [];

const request = new XMLHttpRequest();

request.open("POST", "/get-all");
request.setRequestHeader('Authorization', 'test');
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
        <td>${ticket.type_bac}</td>
        <td>${ticket.message}</td>
        <td align="right">
        <fieldset id="group${ticket.id}" class="btn-group btn-group-toggle" data-toggle="buttons">
        <label class="btn btn-secondary" onclick="modification(${ticket.id}, 'consideration', ${JSON.stringify(ticket).replaceAll('"', "'")});selectBtn(event)" ${ticket.etat == 'consideration' ? 'style="background-color:#484848;"' : ''}>
          <input name="group${ticket.id}" type="radio" name="options" id="option1" autocomplete="off" ${ticket.etat == 'consideration' ? 'checked' : ''}> Considération
        </label>
        <label class="btn btn-secondary" onclick="modification(${ticket.id}, 'travail', ${JSON.stringify(ticket).replaceAll('"', "'")});selectBtn(event)" ${ticket.etat == 'travail' ? 'style="background-color:#484848;"' : ''}>
          <input name="group${ticket.id}" type="radio" name="options" id="option2" autocomplete="off" ${ticket.etat == 'travail' ? 'checked' : ''}> Travail
        </label>
        <label class="btn btn-secondary" onclick="modification(${ticket.id}, 'fini', ${JSON.stringify(ticket).replaceAll('"', "'")});selectBtn(event)" ${ticket.etat == 'fini' ? 'style="background-color:#484848;"' : ''}>
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

const selectBtn = (event) => {
  let siblings = Array.from(event.target.parentElement.children);

  siblings.forEach(element => {
    if (element != event.target) {
      element.style = "";
    } else {
      element.style = "background-color:#484848;";
    }
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
  formData.append("type", ticket.type_bac);
  formData.append("message", ticket.message);

  const request = new XMLHttpRequest();
  request.open("POST", "/modifier");
  request.setRequestHeader('Authorization', 'test');
  request.send(formData);
}

const supprimer = (event,id) => {
  let formData = new FormData();
  formData.append("id", id)

  const request = new XMLHttpRequest();

  request.open("DELETE", "/supprimer");
  request.setRequestHeader('Authorization', 'test');
  request.send(formData);

  event.target.parentElement.parentElement.parentElement.parentElement.remove()
}
