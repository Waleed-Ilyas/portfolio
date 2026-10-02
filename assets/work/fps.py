from playwright.sync_api import sync_playwright
FPS = """() => new Promise(r=>{let n=0,t0=performance.now();function f(){n++;if(performance.now()-t0>3000){r(n/((performance.now()-t0)/1000))}else requestAnimationFrame(f)}requestAnimationFrame(f)})"""
with sync_playwright() as p:
    b=p.chromium.launch(args=["--use-angle=swiftshader","--enable-unsafe-swiftshader","--ignore-gpu-blocklist"])
    for w,h,t,thr in [(1440,900,"desktop 1440 (software GL)",1),(390,844,"mobile 390 (software GL)",1),(390,844,"mobile 390, CPU 4x throttle",4),(390,844,"mobile 390, CPU 6x throttle",6)]:
        ctx=b.new_context(viewport={"width":w,"height":h}); pg=ctx.new_page()
        if thr>1: ctx.new_cdp_session(pg).send("Emulation.setCPUThrottlingRate",{"rate":thr})
        pg.add_init_script("localStorage.setItem('motion','on')")
        pg.goto("http://localhost:3111"); pg.wait_for_timeout(4000)
        res=[round(pg.evaluate(FPS),1)]
        for _ in range(8): pg.mouse.wheel(0,500); pg.wait_for_timeout(80)
        res.append(round(pg.evaluate(FPS),1))
        print(t,"fps idle/scrolling",res); ctx.close()
    b.close()
