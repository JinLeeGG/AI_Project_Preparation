# 변수
PI = 3.141592653589793

# 함수
def add(a, b):
	return a + b

def subtract(a, b):
	return a - b

# 클래스
class Circle:
	def __init__(self, radius):
		self.radius = radius

	def area(self):
		return PI * self.radius * self.radius

if __name__ == '__main__':
	print('이 모듈은 직접 실행되었습니다')
else:
	print('이 모듈은 import 되었습니다')