//bson 파일은 스키마가 존재하지 않는다. (파일 형식이 존재하지 않는다)

// db 보여주기
show databases

// db 생성 및 선택 
use aiproject // database를 사용하겠다

// collection 생성
db.createCollection("") // db를 묶어줄 collection을 만들겠다

// 컬랙션 확인 
show collections

// 문서 추가 (한개)
db.user.insertOne({userid: "apple", name: "김사과", age:20})
db.user.insertOne({userid: "김사과", age: "20", job:"프로그래머"})

// 데이터 조회
db.user.find()

// 문서 여러개 추가
db.user.insertMany([
    {name: "반하나", age:25, job:"공무원"},
    {name: "이메론", age:30, job:"의사"},    
    {name: "오렌지", age:33, job:"교직원"},
])

// 문서 수정 (한개)
db.user.updateOne({name: "반하나"}, {$set:{age:22}}) //set을 이용해 변경가능

// 문서 여러 개 수정 
db.user.updateMany({name: "김사과"}, {$set:{age:27}}) 

// 문서 삭제
db.user.deleteOne({name: "오렌지"})

// collection 삭제
db.user.drop()

// db 삭제
db.dropDatabase()

// db 보여주기
show databases



use aiproject
// 여러문서 추가하기

// students 라는 collection 추가
db.students.insertMany([
    {name:"김사과", age:20, major:"컴퓨터공학", grade:3.8},
    {name:"반하나", age:23, major:"수학", grade:3.4},
    {name:"오렌지", age:25, major:"물리", grade:3.6},
    {name:"이메론", age:30, major:"수학", grade:3.9},
    {name:"채애리", age:33, major:"컴퓨터공학", grade:3.2}
])

// 모든 문서 보기
db.students.find()


//조건 검색
//$eq	같다 (equal)	{ age: { $eq: 20 } }
//$ne	같지 않다 (not equal)	{ age: { $ne: 20 } }
//$gt	크다 (greater than)	{ age: { $gt: 20 } }
//$gte	크거나 같다	{ age: { $gte: 20 } }
//$lt	작다 (less than)	{ age: { $lt: 20 } }
//$lte	작거나 같다	{ age: { $lte: 20 } }


// 나이가 23살인 학생
db.students.find({age:23})
// 나이가 21살보다 많은 학생
db.students.find({age: {$gt:21}})
// 컴퓨터공학 전공이 아닌 학생
db.students.find({major:{$ne:"컴퓨터공학"}})




//$and: 모든 조건을 만족해야 함
//$or: 하나라도 만족하면 됨
//$not: 조건 부정
//$nor: 모든 조건을 불만족해야 함

// 나이가 21살 이상이면서 전공이 수학인 학생
db.students.find({
    $and: [
        {age:{$gte:21}}, {major: "수학"}
    ]
})

// 나이가 20살이거나 전공이 물리인 학생
db.students.find({
    $or: [
        {age:20}, {major:"물리"}
    ]
})

// 전공이 수학 또는 물리인 학생
db.students.find({
    major: {$in: ["수학", "물리"]}
})


//sort 정렬

// 나이로 내림차순 정렬
db.students.find().sort({ age: -1 })

// 성적으로 오름차순 정렬
db.students.find().sort({ grade: 1 })




// limit(n)
// 결과에서 앞에서부터 n개 문서만 가져옵니다.
// 데이터가 너무 많을 때 일부만 보고 싶을 때 사용합니다.

// skip(n)
// 결과에서 앞에서부터 n개 문서를 건너뜁니다.
// 페이지네이션에서 특정 페이지의 앞부분을 건너뛸 때 사용합니다.

db.students.find()

// 상위 2명만 보기
db.students.find().limit(2)

// 2명을 건너뛰고 나머지 보기
db.students.find().skip(2)

// 전공이 수학 또는 물리인 학생 중 성적이 3.3 이상인 학생을 성적 높은 순으로 2명만 조회
db.students.find({
    $and: [
        {major: { $in: ["수학", "물리"]}},
        {grade: { $gte: 3.3 }} 
    ]
}).sort({ grade: -1 }).limit(2)



// ObjectID

//MongoDB에서 ObjectId는 각 문서(document)의 12바이트(24자리 16진수(hex))고유한 ID로 사용되는 데이터 타입입니다. 
//SQL의 기본키(Primary Key)와 비슷한 역할을 합니다. MongoDB는 각 문서에 _id 필드를 기본적으로 생성하며, 
//특별히 지정하지 않으면 자동으로 ObjectId 형태로 생성됩니다.

db.students.find()
db.students.insertOne({name:"김사과", age:20, major:"컴퓨터공학", grade:3.8})

db.students.find({_id:ObjectId("6834505523671bb3c944153a")}) // _id 와 objectID를 이용해서 특정 객체만 찾을수 있다.
db.students.updateOne({_id:ObjectId("6834505523671bb3c944153a")}, {$set:{name:"피치"}}) // 특정 객체를 업데이트

ObjectId("6834505523671bb3c944153a").getTimestamp() // MongoDB에 데이터가 들어간 시간







// Aggregation

//여러 문서를 그룹화하거나, 통계/요약/변환된 결과를 만들어내는 복잡한 데이터 처리 도구입니다. 
//SQL의 GROUP BY, SUM(), AVG(), JOIN 등과 비슷한 역할을 합니다. 
//여러 문서를 묶어서 계산하거나 새로운 형식으로 가공된 데이터를 만들고 통계, 분석, 리포트 등에 활용할 수 있는 기능입니다.


//$match	조건으로 필터링 (find와 비슷)
//$group	필드로 그룹화하고 통계 계산
//$project	필드를 선택하거나 계산된 필드를 생성
//$sort	정렬
//$limit	개수 제한
//$skip	건너뛰기
//$lookup	다른 컬렉션과 조인
//$unwind	배열을 펼치기

db.users.insertMany([
    {
        _id: 1,
        name: "김사과",
        age: 20,
        gender: "여",
        joinDate: ISODate("2023-01-10T00:00:00Z"), // 회원가입한 날짜
        tags: ["몽고DB", "집계"], //관심있는 분야 
        orders: [ // 주문 리스트
            { orderId: 101, amount: 200000, orderDate: ISODate("2024-01-15T00:00:00Z") }, // 주문 ID, 가격, 주문된 날짜 
            { orderId: 102, amount: 450000, orderDate: ISODate("2024-03-22T00:00:00Z") }  
        ],
        products: [ //물건 리스트
            { productId: "p1", category: "전자제품", price: 500000, rating: 4.8 },
            { productId: "p2", category: "의류", price: 50000, rating: 4.2 }
        ]
    },
    {
        _id: 2,
        name: "반하나",
        age: 25,
        gender: "여",
        joinDate: ISODate("2024-02-20T00:00:00Z"),
        tags: ["데이터베이스", "몽고DB"],
        orders: [
            { orderId: 103, amount: 300000, orderDate: ISODate("2024-02-18T00:00:00Z") }
        ],
        products: [
            { productId: "p3", category: "전자제품", price: 120000, rating: 4.6 }
        ]
    },
    {
        _id: 3,
        name: "오렌지",
        age: 30,
        gender: "남",
        joinDate: ISODate("2024-03-05T00:00:00Z"),
        tags: ["몽고DB", "집계", "데이터베이스"],
        orders: [],
        products: [
            { productId: "p4", category: "의류", price: 80000, rating: 4.1 }
        ]
    }
])


db.users.find()

// 그룹을 묶지말고 하나로 통째로 가져와라
db.users.aggregate([{$match:{}}]) 
// 30세 이상인 사람만 선택
db.users.aggregate([{$match:{age:{$gte:30}}}])

// 이름과 나이만 보여주기
db.users.aggregate([
    {$project: {name: 1, age: 1, _id: 0}} //원하는것만 키를 선택해서 가져오기
])

// 모든 사용자의 평균 나이 구하기
// _id: null --> 전체를 한 덩어리로 묶음 (group 대상이 없음)
db.users.aggregate([{$group: {_id:null, avgAge:{$avg: "$age"}}}]) //$age 는 함수, "$age" 는 인풋, avgAge는 키값

// 성별로 인원 수 세기
db.users.aggregate([
    { $group: { _id: "$gender", count: { $sum: 1 }}} //gender 키값을 가지고 그룹을 만들기 "$sum"은 함수 
])

// 나이가 많은 순으로 상위 2명만 보기
db.users.aggregate([
    {$sort: {age: -1}},
    {$limit: 2}
])

// 연도별 가입자 수 구하기
db.users.aggregate([
    {
          $group: {
              _id:{$year: "$joinDate"}, //날자 형식의 년도를 뽑아올 수 있다.
              userCount: {$sum: 1}
          }
    },
    {$sort: { "_id": 1}} // 유저 id로 오름차순
])

// 태그별로 몇 번 등장했는지 세기
db.users.aggregate([
    { $unwind: "$tags" }, // 배열의 각 객체 개수만큼 체크를 해준다. (배열안에 있는 내용을 별도로 때준다)
    { $group: { _id: "$tags", count: { $sum: 1}}}, // tag별로 그룹을 만든다. 그리고 카운트 세기
    { $sort: {count: -1}} // 키 이름으로 내림차순 정렬
])

// 사용자별 총 금액 구하기
db.users.aggregate([
    { $unwind: "$orders"},
    {
        $group: {
            _id: "$_id",
            total: { $sum: "$orders.amount"}
        }
    }
])



// 카테고리별 평균/최고 가격
db.users.aggregate([
    { $unwind: "$products"},
    {
        $group: {
            _id: "$products.category", // category 별로 그룹 만들기
            avgPrice: { $avg: "$products.price"},
            maxPrice: { $max: "$products.price"}
        }
    }
])


// 평점 4.5 이상인 전자제품만 보기
db.users.aggregate([
    { $unwind: "$products" },
    { $match: { "products.category": "전자제품", "products.rating": { $gte: 4.5 } }},
    { $sort: { "products.rating": -1 }}
])


// 2024년 월별 매출 계산하기
db.users.aggregate([
    { $unwind: "$orders"},
    {
        $match: {
            "orders.orderDate": { $gte: ISODate("2024-01-01"), $lte: ISODate("2024-12-31")}
        }
    },
    {
        $group: {
            _id: { month: { $month: "$orders.orderDate"}},
            totalSales: { $sum: "$orders.amount"}
        }
    },
    { $sort: { "_id.month": 1 }}
])






