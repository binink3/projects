from pymongo import MongoClient           # pymongo를 임포트 하기(패키지 인스톨 먼저 해야겠죠?)

client1 = MongoClient('localhost', 27017)  # mongoDB는 27017 포트로 돌아갑니다.
db1 = client1.publicfund                    # 'publicfund'라는 이름의 db를 만듭니다.

client2 = MongoClient('mongodb://spartahoya:123456@15.164.222.219', 27017)  # mongoDB는 27017 포트로 돌아갑니다.
db2 = client2.publicfund                    # 'publicfund'라는 이름의 db를 만듭니다.


infos = list(db1.funds.find({},{'_id':0}))
db2.funds.insert_many(infos)