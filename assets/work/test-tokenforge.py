from playwright.sync_api import sync_playwright
import os
B="http://localhost:3444"; out="../../assets/work/tokenforge/"; os.makedirs(out,exist_ok=True)
with sync_playwright() as p:
    b=p.chromium.launch()
    for w,h,t in [(1440,900,"desktop"),(390,844,"mobile")]:
        pg=b.new_page(viewport={"width":w,"height":h}); errs=[]
        pg.on("console",lambda m: errs.append(m.text[:150]) if m.type=="error" else None); pg.on("pageerror",lambda e: errs.append(str(e)[:150]))
        pg.goto(B); pg.wait_for_selector("text=Create a token"); pg.wait_for_timeout(1200)
        pg.screenshot(path=out+f"home-{t}.png")
        if t=="desktop":
            pg.get_by_role("button",name="Connect a wallet to create").click(); pg.wait_for_timeout(300)
            print("empty submit errors:",[e.inner_text() for e in pg.locator("[role=alert]").all()])
            pg.fill("#name","Forge Coin"); pg.fill("#symbol","frg!"); pg.fill("#decimals","0"); pg.fill("#supply","1.5")
            pg.get_by_role("button",name="Connect a wallet to create").click(); pg.wait_for_timeout(300)
            print("bad fields:",[e.inner_text() for e in pg.locator("[role=alert]").all()])
            pg.screenshot(path=out+"validation-desktop.png")
            pg.fill("#symbol","frg"); pg.fill("#decimals","6"); pg.fill("#supply","1000000")
            pg.get_by_role("button",name="Connect a wallet to create").click(); pg.wait_for_timeout(300)
            print("valid but no wallet:",[e.inner_text() for e in pg.locator("[role=alert]").all()])
            pg.fill("#imageUrl","https://example.com/"+"a"*120); pg.fill("#description","d"*100)
            pg.get_by_role("button",name="Connect a wallet to create").click(); pg.wait_for_timeout(300)
            print("uri too long:",[e.inner_text()[:90] for e in pg.locator("[role=alert]").all()])
            pg.get_by_role("tab",name="My tokens").click(); pg.wait_for_timeout(300)
            print("my tokens disconnected:",pg.locator("[role=tabpanel]").inner_text())
            pg.screenshot(path=out+"mytokens-desktop.png")
        print(t,"errors",errs,"overflowX",pg.evaluate("document.documentElement.scrollWidth>innerWidth"))
    b.close()
