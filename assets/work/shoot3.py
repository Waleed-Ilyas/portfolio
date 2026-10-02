from playwright.sync_api import sync_playwright
FPS = """() => new Promise(r=>{let n=0,t0=performance.now();function f(){n++;if(performance.now()-t0>3000){r(n/((performance.now()-t0)/1000))}else requestAnimationFrame(f)}requestAnimationFrame(f)})"""
with sync_playwright() as p:
    b=p.chromium.launch(args=["--use-angle=swiftshader","--enable-unsafe-swiftshader","--ignore-gpu-blocklist"])
    for w,h,t,thr in [(1440,900,"desktop",1),(390,844,"mobile",1),(390,844,"mobile-throttled4x",4)]:
        ctx=b.new_context(viewport={"width":w,"height":h},device_scale_factor=1)
        pg=ctx.new_page(); errs=[]
        pg.on("console",lambda m: errs.append(m.text[:160]) if m.type in("error","warning") else None)
        pg.on("pageerror",lambda e: errs.append(str(e)[:160]))
        if thr>1:
            cdp=ctx.new_cdp_session(pg); cdp.send("Emulation.setCPUThrottlingRate",{"rate":thr})
        pg.add_init_script("localStorage.setItem('motion','on')")
        pg.goto("http://localhost:3111"); pg.wait_for_timeout(4000)
        print(t,"scene",pg.evaluate("document.documentElement.dataset.scene"),"motion",pg.evaluate("document.documentElement.dataset.motion"),"canvas",pg.evaluate("!!document.querySelector('canvas')"))
        if t!="mobile-throttled4x":
            pg.screenshot(path=f"../screenshots/phase3/{t}-hero.png")
        print(t,"fps hero",round(pg.evaluate(FPS),1))
        for name,sel in [("work","#work"),("stack","#stack"),("contact","#contact")]:
            pg.evaluate(f"document.querySelector('{sel}').scrollIntoView()"); pg.wait_for_timeout(2500)
            if name=="work" and t!="mobile-throttled4x": 
                pg.evaluate("window.scrollBy(0,-200)"); pg.wait_for_timeout(1500)
            if t!="mobile-throttled4x": pg.screenshot(path=f"../screenshots/phase3/{t}-{name}.png")
            if name=="work": print(t,"fps work",round(pg.evaluate(FPS),1))
        print(t,"errors",errs[:5],"overflowX",pg.evaluate("document.documentElement.scrollWidth>innerWidth"))
        ctx.close()
    # reduced motion
    ctx=b.new_context(viewport={"width":1440,"height":900},reduced_motion="reduce"); pg=ctx.new_page()
    pg.goto("http://localhost:3111"); pg.wait_for_timeout(3500)
    print("reduced: canvas",pg.evaluate("!!document.querySelector('canvas')"),"motion",pg.evaluate("document.documentElement.dataset.motion"),"toggle",pg.inner_text("button[aria-pressed]"))
    pg.screenshot(path="../screenshots/phase3/desktop-reduced-hero.png"); ctx.close()
    b.close()
