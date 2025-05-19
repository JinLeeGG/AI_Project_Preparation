import asyncio # 비동기화 시켜줄수 있는 모듈
import time

def sync_func():
    print('동기 함수 시작')
    time.sleep(2)
    print('동기 함수 끝')
  
async def async_func():   # 비동기함수라는걸 알려주는것 
    print('비동기 함수 시작')
    await asyncio.sleep(2)
    print('비동기 함수 끝')

async def main():
    print('동기 방식: ')
    sync_func()
    sync_func()
    print('비동기 방식: ')
    await asyncio.gather(
        async_func(),
        async_func()
    )

asyncio.run(main())