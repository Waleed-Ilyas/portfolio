from playwright.sync_api import sync_playwright
import base64, os
B="http://localhost:3333"; out="../../assets/work/forma/"; os.makedirs(out,exist_ok=True)
with sync_playwright() as p:
    b=p.chromium.launch(args=["--use-angle=swiftshader","--enable-unsafe-swiftshader","--ignore-gpu-blocklist"])
    ctx=b.new_context(viewport={"width":1440,"height":900},accept_downloads=True,permissions=["clipboard-read","clipboard-write"]); pg=ctx.new_page(); errs=[]
    pg.on("console",lambda m: errs.append(m.text[:150]) if m.type=="error" else None); pg.on("pageerror",lambda e: errs.append(str(e)[:150]))
    pg.goto(B); pg.wait_for_selector("canvas"); pg.wait_for_timeout(3500)
    pg.screenshot(path=out+"default.png")
    print("default total:",pg.locator("[aria-live=polite]").inner_text().replace("\n"," "))
    pg.get_by_label("Walnut").check(force=True) if False else pg.locator("input[name=frame][value=walnut]").check(force=True)
    pg.locator("input[name=upholstery][value=leather]").check(force=True)
    pg.locator("input[name=color][value=clay]").check(force=True)
    pg.locator("input[name=base][value=sled]").check(force=True)
    pg.get_by_role("switch").check(force=True)
    pg.wait_for_timeout(2500)
    print("configured total:",pg.locator("[aria-live=polite]").inner_text().replace("\n"," "),"| url:",pg.url)
    pg.screenshot(path=out+"configured.png")
    pg.get_by_role("button",name="Copy share link").click(); pg.wait_for_timeout(400)
    print("clipboard:",pg.evaluate("navigator.clipboard.readText()"), "| toast:",pg.locator("p[role=status]").inner_text())
    with pg.expect_download() as d: pg.get_by_role("button",name="Download PNG").click()
    path=out+"export.png"; d.value.save_as(path); print("png bytes:",os.path.getsize(path))
    # shared link renders same config, no flash
    pg2=ctx.new_page(); pg2.goto(pg.url); pg2.wait_for_selector("canvas"); pg2.wait_for_timeout(2500)
    print("shared link checked:",[pg2.locator(f"input[name={n}]:checked").get_attribute("value") for n in ["frame","upholstery","color","base"]], pg2.get_by_role("switch").is_checked())
    pg2.screenshot(path=out+"shared.png")
    pg2.goto(B+"?f=zzz&c=ink&a=1"); pg2.wait_for_timeout(1500)
    print("bad param fallback:",pg2.locator("input[name=frame]:checked").get_attribute("value"),pg2.locator("input[name=color]:checked").get_attribute("value"))
    # mobile
    m=b.new_context(viewport={"width":390,"height":844}); pm=m.new_page(); pm.goto(B); pm.wait_for_selector("canvas"); pm.wait_for_timeout(3000)
    pm.screenshot(path=out+"mobile-fold.png"); pm.screenshot(path=out+"mobile-full.png",full_page=True)
    print("mobile overflowX:",pm.evaluate("document.documentElement.scrollWidth>innerWidth"))
    print("errors:",errs)
    b.close()
