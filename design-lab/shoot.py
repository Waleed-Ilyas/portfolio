from playwright.sync_api import sync_playwright
import pathlib
root=pathlib.Path(__file__).parent
with sync_playwright() as p:
    b=p.chromium.launch()
    for n in ["a-night-terminal","b-editorial-engineer","c-onchain-neon"]:
        for w,h,t in [(1440,900,"desktop"),(390,844,"mobile")]:
            pg=b.new_page(viewport={"width":w,"height":h})
            pg.goto((root/f"{n}.html").as_uri()); pg.wait_for_timeout(1200)
            pg.screenshot(path=str(root/"shots"/f"{n}-{t}.png"))
            pg.screenshot(path=str(root/"shots"/f"{n}-{t}-full.png"),full_page=True)
    b.close()
