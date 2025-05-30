from pymongo import MongoClient
from bson import ObjectId

url = 'mongodb+srv://aiproject:MkFAAzdKquhP3hph@cluster0.arbx7wl.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'

client = MongoClient(url)

db = client['food_review_db'] # 없으면 새 db를 생성

# collection 생성
foods = db['foods']
users = db['users']
ratings = db['ratings']

# 사용자 등록
def register_user():
	username = input('닉네임을 입력하세요: ')
	result = users.insert_one({"username" : username}) # insert username data in users collection 
	print(f'환영합니다! {username}님!')
	return result.inserted_id # object id return 

# 음식 목록 보여주기
def show_foods():
	print('현재 등록된 음식:')
	for food in foods.find(): # 전체를 한줄씩 들고온다
		print(f"- (id: {food['_id']}) {food['name']} | 종류: {food['category']} | 지역: {food['region']}")

# 음식 추가
def add_food():
	name = input('음식 이름: ')
	category = input('음식 종류 (예: 중식, 한식, 분식 등): ')
	region = input('배달 가능 지역: ')
	foods.insert_one({"name" : name, "category" : category, "region" : region})
	print("음식이 등록되었습니다.")

# 음식 삭제
def delete_food():
	show_foods() # 입력한 음식들이 나오게 한다 (id를 보기위함)
	food_id = input('삭제할 음식의 ID를 입력하세요: ')
	foods.delete_one({"_id": ObjectId(food_id)}) 
	print('음식이 삭제되었습니다.')

# 음식에 평점 주기
def rate_food(user_id):
	show_foods() # 입력한 음식들이 나오게 한다 (id를 보기위함)
	food_id = input('평점 줄 음식의 ID 입력: ')
	score = float(input("평점 (0~10): "))
	comment = input("한줄 리뷰: ")
	ratings.insert_one({
		"user_id" : user_id,
		"food_id" : ObjectId(food_id),
		"score" : score,
		"comment" : comment
	})
	print('평점이 등록되었습니다.')

# 평점 수정
def update_rating(user_id):
	print("\n내 리뷰 목록: ")
	for r in ratings.find({"user_id" : user_id}): #ratings collections 안에서 user_id가 뭔지 찾아준다.
		food = foods.find_one({"_id" : r["food_id"]}) # id가 작성한 food id를 찾는다.
		print(f" - ({r['_id']}) {food['name']}: {r['score']}점 | {r['comment']}")
	
	rating_id = input('수정할 리뷰 ID 입력: ')
	new_score = float(input("새 평점: "))
	new_comment = input("새 리뷰: ")
	ratings.update_one(
		{"_id": ObjectId(rating_id)},
		{"$set": {"score": new_score, "comment": new_comment}}
	)
	print("리뷰가 수정되었습니다.")

# 특정 음식 리뷰 보기
def show_food_reviews():
	show_foods()
	food_id = input("리뷰를 보고 싶은 음식 ID 입력: ")
	print("\n 해당 음식의 리뷰 목록: ")
	for r in ratings.find({"food_id" : ObjectId(food_id)}): # 하나 또는 이상의 아이디에대한 리뷰를 다 꺼내온다
		user = users.find_one({"_id" : r["user_id"]}) # 그 리뷰남긴 사람을 가져온다.
		print(f"- {user['username']} 님: {r['score']}점 | \"{r['comment']}\"")

# 평점 높은 음식 Top3
def show_best_foods():
	print("\n 별점이 높은 음식 Top 3:")
	pipline = [
		# food id로 그룹을 맺고(같은 음식의 평가) 평균을 구한다.
		{"$group": {"_id": "$food_id", "avg": {"$avg":"$score"}}},
		{"$sort": {"avg":-1}},
		{"$limit": 3}
	]
	results = ratings.aggregate(pipline)
	for r in results:
		food = foods.find_one({"_id":r["_id"]})
		print(f" - {food['name']} | 평균 별점: {round(r['avg'], 2)}점")

# 메인 메서드
def main():
	print('음식 평점 앱에 오신 걸 환영합니다.')
	user_id = register_user() # 입력한 username이 db에 저장되고 user_id에 저장된다
	
	while True:
		print("\n📋 메뉴:")
		print("1. 음식 목록 보기")
		print("2. 음식 등록하기")
		print("3. 음식 삭제하기")
		print("4. 음식 별점 남기기")
		print("5. 내 리뷰 수정하기")
		print("6. 음식 리뷰 보기")
		print("7. 별점 높은 음식 TOP 3 보기")
		print("0. 종료하기")
			
		choice = input('메뉴 선택: ')
		if choice == "1":
			show_foods()
		elif choice == "2":
			add_food()
		elif choice == "3":
			delete_food()
		elif choice == "4":
			rate_food(user_id) # 누가 별점을 썼는지 알기 하기위해 user_id를 넣는다.
		elif choice == "5":
			update_rating(user_id)
		elif choice == "6":
			show_food_reviews()
		elif choice == "7":
			show_best_foods()
		elif choice == '0':
			print('안녕히 가세요! 맛있는 하루 되세요!')
			break
		else:
			print('유효한 메뉴번호를 입력해주세요.')

if __name__ == "__main__": # 다른곳이 아닌 이 파일 안에서 실행 했을때 main 실행
	main()

