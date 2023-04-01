from flask import Flask, Response, request, send_file, make_response, send_from_directory
import json
import requests
import xlsxwriter
from flask_sqlalchemy import SQLAlchemy
from flask_sqlalchemy.inspection import inspect


fichier = 'tickets.json'

autorises=["test"]

app = Flask(__name__, template_folder='../Frontend')
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///tickets.sqlite3'

@app.route("/ajouter", methods=["POST"])
def ajouter():
    nom = request.form.get("nom")
    prenom = request.form.get("prenom")
    courriel = request.form.get("courriel")
    telephone = request.form.get("telephone")
    adresse = request.form.get("adresse")
    nb_bac = request.form.get("nb_bac")
    piece = request.form.get("piece")
    type_bac = request.form.get("type")
    message = request.form.get("message")

    if None in [nom, prenom, courriel, telephone, adresse, piece, nb_bac, type_bac, message]:
        return Response(status=400)

    ticket = Ticketer(nom, prenom, courriel, telephone, adresse, "consideration", nb_bac, type_bac, piece, message)
    db.session.add(ticket)
    db.session.commit()

    resp = Response(str(ticket.id))
    resp.headers['Access-Control-Allow-Origin'] = '*'

    return resp

@app.route("/supprimer", methods=["DELETE"])
def supprimer():
    autorisation = request.headers.get('Authorization')
    if autorisation == None or autorisation not in autorises:
        return Response(status=401)

    try:
       id = int(request.form.get('id'))
    except:
        return Response(status=400)
    
    # with open(fichier, 'r') as f:
    #     tickets = json.load(f)

    # if id != 0:
    #     index = None
    #     for i, ticket in enumerate(tickets):
    #         if ticket['id'] == id:
    #             index = i
    # else:
    #     index = 0

    # if index == None:
    #     return Response(status=400)

    # del tickets[index]
    
    # with open(fichier, 'w') as f:
    #     if len(tickets) == 0:
    #         f.write('[]')
    #     else:
    #         f.write(json.dumps(tickets))

    ticket = db.session.query(Ticketer).get(id)
    db.session.delete(ticket)
    db.session.commit()

    return Response(status=200)

@app.route("/get-all", methods=["POST"])
def get_all():
    autorisation = request.headers.get('Authorization')
    if autorisation == None or autorisation not in autorises:
        return Response(status=401)

    #resp = make_response(send_file(fichier, mimetype="application/json"))
    tickets = Ticketer.query.all()
    resp = flask.jsonify(Ticketer.serialize_list(tickets))
    resp.headers['Access-Control-Allow-Origin'] = '*'
    return resp

@app.route("/get", methods=["GET"])
def get_info_test():
    with open(fichier, 'r') as f:
        return f.read()

@app.route("/modifier", methods=["POST"])
def modifier():
    autorisation = request.headers.get('Authorization')
    if autorisation == None or autorisation not in autorises:
        return Response(status=401)
    
    tickets = None
    with open(fichier, 'r') as f:
        tickets  = json.load(f)

    nom = request.form.get("nom")
    prenom = request.form.get("prenom")
    courriel = request.form.get("courriel")
    telephone = request.form.get("telephone")
    adresse = request.form.get("adresse")
    etat = request.form.get("etat")
    nb_bac = request.form.get("nb_bac")
    type_bac = request.form.get("type")
    piece = request.form.get("piece")
    message = request.form.get("message")

    if None in [nom, prenom, courriel, telephone, adresse, etat, nb_bac, type_bac, piece, message]:
        return Response(status=400)

    try:
       id = int(request.form.get('id'))
    except:
        return Response(status=400)

    ticket = db.session.query(Ticketer).get(id)
    ticket.etat = etat
    db.session.commit()

    resp = Response(status=200)

    @resp.call_on_close
    def on_close():
        workbook = xlsxwriter.Workbook('Bon_de_travail.xlsx')
        worksheet = workbook.add_worksheet()

        halign = workbook.add_format()
        halign.set_align('center')

        entetes = ['Numéro de requête', 'Numéro civique', 'Rue', 'Pièce', 'BAC BLEU - 360', 'BAC BRUN - 45', 'BAC BRUN - 80', 'BAC BRUN - 120', 'BAC BRUN - 240', 'BAC BRUN - 240', 'BAC GRIS 120', 'BAC GRIS 240', 'BAC GRIS 360']

        for col, entete in enumerate(entetes):
            worksheet.write(0, col, entete, halign)

        types = {
            'bleu360': 4,
            'brun45':  5,
            'brun80':  6,
            'brun120': 7,
            'brun240': 8,
            'gris120': 9,
            'gris240': 10,
            'gris360': 11,
        }

        row = 1

        for ticket in tickets:
            if ticket['etat'] == 'travail':
                worksheet.write(row, 0, ticket['id'])
                worksheet.write(row, 1, ticket['adresse'].split()[0])
                worksheet.write(row, 2, ' '.join(ticket['adresse'].split()[1:]).upper())
                worksheet.write(row, 3, ticket['piece'].upper())

                worksheet.write(row, types[ticket['type']], '1')

                row += 1

        worksheet.set_column(0, 1, 20, halign)
        worksheet.set_column(2, 2, 25)
        worksheet.set_column(3, 11, 15, halign)

        workbook.close()

        if etat == "travail":
            visits = {}
            for ticket in tickets:
                if ticket['etat'] != 'travail':
                    continue

                res = requests.get(f'https://nominatim.openstreetmap.org/search?q={ticket["adresse"]}&format=json')
                res_json = res.json()
                visits[ticket['id']] = {
                    "location": {
                        "name": ticket['adresse'],
                        "lng": res_json[0]['lon'],
                        "lat": res_json[0]['lat'],
                    }
                }

            fleet = {
                "vehicle_1": {
                    "start_location": {
                        "id": "UQO",
                        "name": "283 Alexandre-Taché",
                        "lat": 45.422472,
                        "lng": -75.738186,
                    }
                }
            }

            data = {
                "visits": visits,
                "fleet": fleet
            }

            token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDE2MzcxYWY4YWQ5YTAwMThlYjI3YjIiLCJpYXQiOjE2NzkyMjEyOTh9.FH4JTErksHAhYsKhVjcS35ZXuxY8GZQKqVP7Ni3cTeI'

            headers = {
                'Content-Type': 'application/json',
                'Authorization': f'bearer {token}'
            }

            res = requests.post('https://api.routific.com/v1/vrp', headers=headers, data=json.dumps(data))

            maps_url = 'https://www.google.com/maps/dir/'
            for location in res.json()['solution']['vehicle_1']:
                maps_url += location['location_name'] + '/'
            print(maps_url.replace(' ', '%20'))

    return resp


@app.route('/<path:path>')
def send_report(path):
    return send_from_directory('src/', path)


@app.route('/', methods=["GET"])
def send_index():
    return send_from_directory('src/', 'index.html')


db = SQLAlchemy(app);
class Ticketer(db.Model, Serializer):
    id        = db.Column('id', db.Integer, primary_key=True)
    nom       = db.Column(db.String(100))
    prenom    = db.Column(db.String(100))
    courriel  = db.Column(db.String(100))
    telephone = db.Column(db.String(100))
    adresse   = db.Column(db.String(100))
    etat      = db.Column(db.String(100))
    nb_bac    = db.Column(db.String(100))
    type_bac  = db.Column(db.String(100))
    piece     = db.Column(db.String(100))
    message   = db.Column(db.String(100))


    def __init__(self, nom, prenom, courriel, telephone, adresse, etat, nb_bac, type_bac, piece, message):
        self.nom       = nom
        self.prenom    = prenom
        self.courriel  = courriel
        self.telephone = telephone
        self.adresse   = adresse
        self.etat      = etat
        self.nb_bac    = nb_bac
        self.type_bac  = type_bac
        self.piece     = piece
        self.message   = message


class Serializer(object):
    def serialize(self):
        return {c: getattr(self, c) for c in inspect(self).attrs.keys()}

    @staticmethod
    def serialize_list(l):
        return [m.serialize() for m in l]


if __name__ == "__main__":
    with app.app_context():
        db.create_all()
    app.run()
