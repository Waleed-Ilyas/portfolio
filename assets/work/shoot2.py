from playwright.sync_api import sync_playwright
with sync_playwright() as p:
    b=p.chromium.launch()
    for w,h,t in [(1440,900,"desktop"),(390,844,"mobile")]:
        pg=b.new_page(viewport={"width":w,"height":h})
        errs=[]; pg.on("console",lambda m: errs.append(m.text) if m.type=="error" else None)
        pg.goto("http://localhost:3111"); pg.wait_for_timeout(1500)
        pg.screenshot(path=f"../screenshots/phase2/{t}-fold.png")
        H=pg.evaluate("document.body.scrollHeight")
        for y in range(0,H,400): pg.evaluate(f"window.scrollTo(0,{y})"); pg.wait_for_timeout(120)
        pg.wait_for_timeout(900); pg.evaluate("window.scrollTo(0,0)"); pg.wait_for_timeout(300)
        pg.screenshot(path=f"../screenshots/phase2/{t}-full.png",full_page=True)
        print(t,"height",H,"overflowX",pg.evaluate("document.documentElement.scrollWidth>innerWidth"),"errors",errs)
    b.close()
