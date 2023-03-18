from flask import Flask, Response, request
import json


fichier = 'tickets.json'

app = Flask(__name__, template_folder='../Frontend')

@app.route("/ajouter", methods=["POST"])
def ajouter():
    nom = request.form.get("nom")
    prenom = request.form.get("prenom")
    courriel = request.form.get("courriel")
    telephone = request.form.get("telephone")
    addresse = request.form.get("addresse")
    nb_bac = request.form.get("nb_bac")
    message = request.form.get("message")

    if None in [nom, prenom, courriel, telephone, addresse, nb_bac, message]:
        return Response(status=400)

    tickets = None
    with open(fichier, 'r') as f:
        tickets  = json.load(f)
 
    id = len(tickets)

    tickets.append({
        "id": id,
        "nom": nom,
        "prenom": prenom,
        "courriel": courriel,
        "telephone": telephone,
        "nb_bac": nb_bac,
        "message": message
        })

    with open(fichier, 'w') as f:
        f.write(json.dumps(tickets))

    return str(id)

@app.route("/supprimer", methods=["DELETE"])
def supprimer():
    autorisation = request.headers.get('Authorization')
    if autorisation == None:
        return Response(satus=401)

    try:
       id = int(resquest.form.get('id'))
    except:
        return Response(status=400)

    if autorisation in autorises:
        with open(fichier, 'r') as f:
            tickets = json.load(f)

        del tickets[id]
        


@app.route("/get", methods=["GET"])
def get_info_test():
    with open(fichier, 'r') as f:
        return f.read()

if __name__ == "__main__":
    app.run(host="0.0.0.0")
