const request = new XMLHttpRequest();

request.open("POST", "/get-all");
request.setRequestHeader('Auth', 'test');
request.send();

request.onload = () => {
    response = request.responseText;
    JSON.parse(response);

    for () {
        newTd = document.createElement('td');
        newTd.innerHTML = `<th scope="row">${ticket.id}</th>
        <td>${ticket.}</td>
        <td>${ticket.}</td>
        <td>${ticket.}</td>
        <td>${ticket.}</td>
        <td>${ticket.}</td>
        <td>${ticket.}</td>
        <td>${ticket.}</td>
        <td>
          <div class="btn-group btn-group-toggle" data-toggle="buttons">
            <label class="btn btn-secondary active">
              <input type="radio" name="options" id="option1" autocomplete="off" checked> Approve
            </label>
            <label class="btn btn-secondary">
              <input type="radio" name="options" id="option2" autocomplete="off"> Report
            </label>
            <label class="btn btn-secondary">
              <input type="radio" name="options" id="option3" autocomplete="off"> Delete
            </label>
          </div>
        </td>`;
    }
}