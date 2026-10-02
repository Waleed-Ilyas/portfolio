from playwright.sync_api import sync_playwright
B="http://localhost:3222"; A="5F9Ucr7QfvyFadzHxy25ftztsqayrFA7rUs6AHfBS7Tk"; E="5N41qRmFqbqnjKqXUVuyrbtyH2bvjiP8nhZcQq3kMpNr"
out="portfolio/public/work/solscope/"
with sync_playwright() as p:
    b=p.chromium.launch()
    for w,h,t in [(1440,900,"desktop"),(390,844,"mobile")]:
        pg=b.new_page(viewport={"width":w,"height":h}); errs=[]
        pg.on("console",lambda m: errs.append(m.text[:140]) if m.type=="error" else None)
        pg.goto(B); pg.wait_for_timeout(1500); pg.screenshot(path=out+f"home-{t}.png")
        pg.goto(f"{B}/wallet/{A}?network=devnet"); pg.wait_for_selector("text=Recent activity"); pg.wait_for_timeout(9000)
        pg.screenshot(path=out+f"wallet-{t}-fold.png"); pg.screenshot(path=out+f"wallet-{t}.png",full_page=True)
        print(t,"errors",errs[:3],"overflowX",pg.evaluate("document.documentElement.scrollWidth>innerWidth"))
        if t=="desktop":
            pg.goto(f"{B}/wallet/{E}?network=devnet"); pg.wait_for_timeout(5000); pg.screenshot(path=out+"empty-desktop.png")
            pg.goto(f"{B}/wallet/notanaddress"); pg.wait_for_timeout(1500); pg.screenshot(path=out+"invalid-desktop.png")
    b.close()
