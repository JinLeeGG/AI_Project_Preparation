import asyncio
import time

def sync_func():
    print('start sync function')
    time.sleep(2)
    print('end of sync function')

async def async_func():
    print('async function start')
    await asyncio.sleep(2)
    print('end of async function')

async def main():
    print('Sync program:')
    sync_func()
    sync_func()
    print("Async program")
    await asyncio.gather(
        async_func(),
        async_func()
    )

asyncio.run(main())