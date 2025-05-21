import asyncio
import time

# Synchronous Programming
# the task is completed in order. next task will be waited until the one task is finished

# every function with 'def' initialization is working as synchronous
def sync_func():
    print('start sync function')
    time.sleep(2) # whole system stops for 2 seconds          
    print('end of sync function')

# Asynchronous Programming
# the task is completed independently. If there is time delay, we can do different task
async def async_func():
    print('async function start')
    await asyncio.sleep(2) # waits for two seconds but other tasks can be computed
    print('end of async function')

async def main():
    print('--Sync program-- ')
    sync_func() # this runs
    sync_func() # after previous task is completed, this runs
    print("--Async program-- ")
    await asyncio.gather(
        async_func(), # this runs
        async_func()  # when previous one awaits, this runs
    )

asyncio.run(main())