from flask import Flask, Response, request, send_file, make_response, send_from_directory
import json

fichier = 'tickets.json'

autorises=["test"]

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

    resp = Response(str(id))
    resp.headers['Access-Control-Allow-Origin'] = '*'

    return resp

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
        
        with open(fichier, 'w') as f:
            f.write(json.dumps())

        return Response(status=200)

@app.route("/get-all", methods=["POST"])
def get_all():
    autorisation = request.headers.get('Auth')
    print(autorisation)
    # if autorisation == None:
    #     return Response(status=401)

    if autorisation in autorises:
        resp = make_response(send_file(fichier, mimetype="application/json"))
        resp.headers['Access-Control-Allow-Origin'] = '*'
        return resp

    resp = make_response(send_file(fichier, mimetype="application/json"))
    resp.headers['Access-Control-Allow-Origin'] = '*'
    return resp

@app.route("/get", methods=["GET"])
def get_info_test():
    with open(fichier, 'r') as f:
        return f.read()

@app.route('/<path:path>')
def send_report(path):
    return send_from_directory('src/', path)

if __name__ == "__main__":
    app.run(host="0.0.0.0")
