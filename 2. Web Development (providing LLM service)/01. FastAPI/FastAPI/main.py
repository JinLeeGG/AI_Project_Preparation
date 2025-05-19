from fastapi import FastAPI, Request
from fastapi.responses import HTMLResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates

app = FastAPI() # FastAPi 객체 생성

# 정적 파일 (JS, CSS 등) 제공 
# 폴더를 static이라고 만들고 JavaScript, CSS 파일은 다 static 파일에 넣어준다.
# 정적 파일들을 연결해준다는 뜻이다.
app.mount("/static", StaticFiles(directory="static"), name="static") 


# HTML 템플릿 디렉토리
# templates 라는 이름을 꼭 만들어서 html 파일을 만든다
# jinja2라는 템플릿을 디렉토리에연결해준다.
templates = Jinja2Templates(directory="templates")


# HTML 페이지 제공
# app.get 방식: url에 데이터를 실어서 넘겨주는 방식
# app.post 방식: url에 데이터를 숨겨서 넘겨주는 방식

@app.get("/", response_class=HTMLResponse) # 127.0.0.1:8000/ 라고 쓰면 도메인만 넣고 아무것도 안넣었을때 
async def get_page(request: Request):
    return templates.TemplateResponse("index.html", {"request": request}) # 이쪽으로 들어와라

# 백엔드 API – JSON 데이터 제공
@app.get("/api/data")	# http://127.0.0.1:8000/api/data 를 호출했을때
async def get_data(): 
    return {"message": "FastAPI에서 보내는 데이터입니다"} # 이 jason 데이터를 호출