const table = document.querySelector('#table-rows');

const request = new XMLHttpRequest();

request.open("POST", "/get-all");
request.setRequestHeader('Auth', 'test');
request.send();

request.onload = () => {
    response = request.responseText;
    jsonRes = JSON.parse(response);

    jsonRes.forEach(ticket => {
        newTd = document.createElement('tr');
        newTd.innerHTML = `<th scope="row">${ticket.id}</th>
        <td>${ticket.nom}</td>
        <td>${ticket.prenom}</td>
        <td>${ticket.courriel}</td>
        <td>${ticket.telephone}</td>
        <td>${ticket.addresse}</td>
        <td>${ticket.nb_bac}</td>
        <td>${ticket.message}</td>
        <td>
        <div class="btn-group btn-group-toggle" data-toggle="buttons">
        <label class="btn btn-secondary active">
          <input type="radio" name="options" id="option1" autocomplete="off" ${ticket.etat == 'consideration' ? 'checked' : ''}> Consideration
        </label>
        <label class="btn btn-secondary">
          <input type="radio" name="options" id="option2" autocomplete="off" ${ticket.etat == 'travail' ? 'checked' : ''}> Travaille
        </label>
        <label class="btn btn-secondary">
          <input type="radio" name="options" id="option3" autocomplete="off" ${ticket.etat == 'fini' ? 'checked' : ''}> Fini
        </label>
        <label class="btn btn-secondary">
            <input type="radio" name="options" id="option3" autocomplete="off"> Supprimer
          </label>
      </div>
        </td>`;

        table.appendChild(newTd);
    });

}