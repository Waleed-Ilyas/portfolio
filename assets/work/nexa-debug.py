from playwright.sync_api import sync_playwright
with sync_playwright() as p:
    b = p.chromium.launch(); pg = b.new_page(viewport={"width":1440,"height":900})
    pg.goto("http://localhost:5173/login"); pg.get_by_role("button", name="Demo shopper").click(); pg.wait_for_url("**/")
    pg.goto("http://localhost:5173/orders"); pg.wait_for_timeout(4000)
    print(pg.inner_text("main")[:600])
    print("articles:", pg.locator("article").count())
    pg.screenshot(path="nexa-shots/orders-debug.png")
    b.close()
