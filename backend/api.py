from flask import Flask , request
from pymongo import MongoClient
import json
from bson.json_util import dumps
from flask_cors import CORS , cross_origin


app = Flask(__name__)
CORS(app)

client = MongoClient('localhost', 27017)
db = client.falsk_db

collection = db["data"]


@app.route('/get-data', methods=["GET"])
@cross_origin()
def get_data():
    output = collection.find()
    resp = dumps(output)
    return resp


@app.route('/get-data', methods=["POST"])
@cross_origin()
def post_data():
    with open('jsondata.json') as file:
        file_data = json.load(file)
    response = collection.insert_many(file_data)
    output = {'Status': 'Successfully Inserted',
              'Document_ID': str(response.inserted_id)}
    return output

# @app.route('/data/filter/<string:country>' , methods=["GET"])
# @cross_origin()
# def get_filtered(country : str):
#     output = collection.find({'country':country})
#     resp = dumps(output)
#     return resp

@app.route('/get-data/filter', methods=["POST"])
def get_filtered_data():
    key = request.json['key']
    value = request.json['value']
    print('*********', key , value)
    output = collection.find({key:value})
    resp = dumps(output)
    return resp
