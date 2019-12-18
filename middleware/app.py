from flask import Flask, jsonify, request
from flask_cors import CORS
import logging
from bandwidths import BANDWIDTHS
import time
import redis

app = Flask(__name__)
CORS(app)
cache = redis.Redis(host='redis', port=6379)
data = BANDWIDTHS
logging.getLogger('flask_cors').level = logging.DEBUG

def get_hit_count():
    retries = 5
    while True:
        try:
            return cache.incr('hits')
        except redis.exceptions.ConnectionError as exc:
            if retries == 0:
                raise exc
            retries -= 1
            time.sleep(0.5)

def filterByVals(key, vals, dataset):
    filterCriteria = []
    if isinstance(vals, str):
        filterCriteria.append(vals)
    if isinstance(vals, list):
        filterCriteria = range(vals[0], vals[1])
    print('filterCriteria: ')
    print(filterCriteria)
    filteredDataSet = [dpoint for dpoint in dataset if dpoint[key] in filterCriteria]
    return filteredDataSet


@app.route('/', methods=['GET'])
def parameters():
    device_id = request.args.get('device_id', default='')
    end_time = int(request.args.get('end_time', default=time.time()))
    window_time = int(request.args.get('window_time', default=60))
    num_windows = int(request.args.get('num_windows', default=10))
    start_time = end_time - (num_windows * window_time)
    print('end_time: ') 
    print(end_time)
    filteredList = filterByVals('device_id', device_id, data)
    filteredList = filterByVals('timestamp', [start_time, end_time], filteredList)
    bytes_fs, bytes_ts, end_time_labels = [], [], []
    bytes_fs = []
    bytes_ts = []
    end_time_labels = []
    i = 1
    while i < (num_windows + 1):
        interval_bytes_fs = 0
        interval_bytes_ts = 0
        interval_start = end_time - (window_time * i)
        interval_subset = filterByVals('timestamp', [interval_start, end_time], filteredList)
        for dp in interval_subset:
            interval_bytes_fs += dp['bytes_fs']
            interval_bytes_ts += dp['bytes_ts']
            filteredList.remove(dp)
        bytes_fs.append( interval_bytes_fs )
        bytes_ts.append( interval_bytes_ts )
        end_time_labels.append(end_time)
        end_time = interval_start
        i += 1
    print('length of result: ') 
    print(len(end_time_labels))
    datapoints = { 'device_id': device_id, 'end_time': end_time, 'bytes_ts': bytes_ts, 'bytes_fs': bytes_fs, 'end_time_labels': end_time_labels }
    return jsonify(datapoints)

if __name__ == '__main__':
    app.run(debug=True,port=5000)
