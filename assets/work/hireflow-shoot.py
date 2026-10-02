import sys, os, re
from playwright.sync_api import sync_playwright, expect

BASE = sys.argv[1] if len(sys.argv) > 1 else "https://hireflow-one-gold.vercel.app"
OUT = sys.argv[2] if len(sys.argv) > 2 else "hireflow-shots/final"
os.makedirs(OUT, exist_ok=True)

def sign_in(pg, email, password):
    pg.goto(BASE + "/login")
    pg.get_by_label("Email").fill(email)
    pg.get_by_label("Password").fill(password)
    pg.get_by_role("button", name="Sign in", exact=True).click()
    expect(pg.get_by_role("button", name="Sign out").first).to_be_visible()

with sync_playwright() as p:
    b = p.chromium.launch()
    ctx = b.new_context(viewport={"width": 1440, "height": 900}, device_scale_factor=1)
    pg = ctx.new_page()
    pg.goto(BASE)
    expect(pg.get_by_role("heading", name="Latest jobs")).to_be_visible()
    pg.wait_for_load_state("networkidle")
    pg.screenshot(path=f"{OUT}/home.png")
    pg.goto(BASE + "/jobs?workMode=remote")
    expect(pg.locator("article").first).to_be_visible()
    pg.wait_for_load_state("networkidle")
    pg.screenshot(path=f"{OUT}/jobs.png")

    sign_in(pg, "recruiter@waleed.dev", "Recruit@1234")
    pg.wait_for_load_state("networkidle")
    pg.wait_for_timeout(1500)
    pg.screenshot(path=f"{OUT}/dashboard.png", full_page=True)
    pg.goto(BASE + "/recruiter/jobs")
    pg.get_by_role("link", name="Frontend Engineer, Dashboards").click()
    expect(pg.get_by_role("heading", level=1)).to_contain_text("Frontend Engineer")
    pg.locator("main button[aria-pressed]").nth(2).click()
    expect(pg.get_by_role("button", name="Close candidate details")).to_be_visible()
    pg.wait_for_timeout(400)
    pg.screenshot(path=f"{OUT}/pipeline.png", full_page=True)
    pg.get_by_role("button", name="Sign out").first.click()

    sign_in(pg, "demo@waleed.dev", "Demo@1234")
    pg.goto(BASE + "/applications")
    expect(pg.locator("li.card").first).to_be_visible()
    pg.locator("li.card").first.get_by_role("button", name="Show history").click()
    pg.screenshot(path=f"{OUT}/applications.png")
    m = b.new_context(viewport={"width": 390, "height": 844}, device_scale_factor=2)
    mp = m.new_page()
    mp.goto(BASE + "/jobs")
    expect(mp.locator("article").first).to_be_visible()
    mp.wait_for_load_state("networkidle")
    mp.screenshot(path=f"{OUT}/mobile.png")
    b.close()
print("done")
