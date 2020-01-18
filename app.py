from flask import Flask, render_template, jsonify, request
app = Flask(__name__)

from pymongo import MongoClient           # pymongo를 임포트 하기(패키지 인스톨 먼저 해야겠죠?)
client = MongoClient('localhost', 27017)  # mongoDB는 27017 포트로 돌아갑니다.
db = client.publicfund                    # 'publicfund'라는 이름의 db를 만듭니다.

## HTML을 주는 부분
@app.route('/')
def home():
   return render_template('public_fund.html')


@app.route('/fund', methods=['GET'])  #검색창에 클라이언트가 입력을 하면, 그때 자동완성 List 띄어주는 API
def f_list_active_name():
    result = list(db.funds.find({'Status': "Active"}, {'_id': 0}))
    return jsonify(result)


#책임 운용사, 투자일, 회수일, 수익률 front ajax 들어감


@app.route('/fund', methods=['POST']) #검색한 펀드의 운용역 이름이 포함된 List를 불러오는 API
def fm_past():
    fund_name_recieve = request.form['fund_name_give']
    target_fund_info = db.funds.find_one({'Status': "Active", 'fund_name':fund_name_recieve}, {'_id': 0})

    funds_info = list(db.funds.find({'Status': "Past",'manager_name':target_fund_info['manager_name']}, {'_id': 0}))

    return jsonify(funds_info)

if __name__ == '__main__':
   app.run('0.0.0.0',port=5000,debug=True)



