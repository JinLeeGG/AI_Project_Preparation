// showing current databases
show databases 

// use aiproject as db
use aiproject

// creating collection (datas -> collections -> database)
db.createCollection("user")

// showing collections
show collections

// this is called adding document to database
db.user.insertOne({userid : 'apple', name : '김사과', age : 20}) //이런 형식을 doucment 라고 한다.

// adding another datas
db.user.insertOne({name : '김사과', age : 20, job: "프로그래머"})

// datas
db.user.insertOne({name : '배애리', age : 29, gender: "여자"})

// find all datas in user collection
db.user.find()