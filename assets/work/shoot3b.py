from playwright.sync_api import sync_playwright
with sync_playwright() as p:
    b=p.chromium.launch(args=["--use-angle=swiftshader","--enable-unsafe-swiftshader","--ignore-gpu-blocklist"])
    for w,h,t in [(1440,900,"desktop"),(390,844,"mobile")]:
        ctx=b.new_context(viewport={"width":w,"height":h}); pg=ctx.new_page()
        pg.add_init_script("localStorage.setItem('motion','on')")
        pg.goto("http://localhost:3111/?debug"); pg.wait_for_timeout(3500)
        pg.screenshot(path=f"../screenshots/phase3/{t}-hero.png")
        y_work=pg.evaluate("document.querySelector('#work').getBoundingClientRect().top+scrollY")
        y_con=pg.evaluate("document.querySelector('#contact').getBoundingClientRect().top+scrollY")
        for name,y in [("work",y_work-h*0.12),("stack",pg.evaluate("document.querySelector('#stack').getBoundingClientRect().top+scrollY")-h*0.05),("contact",y_con-h*0.1)]:
            cur=pg.evaluate("scrollY")
            steps=30
            for i in range(steps):
                pg.mouse.wheel(0,(y-cur)/steps); pg.wait_for_timeout(60)
            pg.wait_for_timeout(2500)
            print(t,name,"scrollY",round(pg.evaluate("scrollY")),"state",pg.evaluate("[window.__scene.m1,window.__scene.m2].map(v=>+v.toFixed(2)).join(\",\")"))
            pg.screenshot(path=f"../screenshots/phase3/{t}-{name}.png")
        ctx.close()
    b.close()
