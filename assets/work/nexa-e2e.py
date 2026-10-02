import sys, os, re, json
from playwright.sync_api import sync_playwright, expect

BASE = sys.argv[1] if len(sys.argv) > 1 else "http://localhost:5173"
OUT = sys.argv[2] if len(sys.argv) > 2 else "nexa-shots/local"
READONLY = len(sys.argv) > 3 and sys.argv[3] == "readonly"  # the public demo blocks product writes for the demo admin
os.makedirs(OUT, exist_ok=True)
errors = []

def step(msg): print(f"\n== {msg}", flush=True)
def ok(msg): print(f"   PASS {msg}", flush=True)

with sync_playwright() as p:
    b = p.chromium.launch()
    ctx = b.new_context(viewport={"width": 1440, "height": 900})
    pg = ctx.new_page()
    pg.on("console", lambda m: errors.append(m.text[:160]) if m.type == "error" else None)
    pg.on("pageerror", lambda e: errors.append("pageerror: " + str(e)[:160]))

    step("home")
    pg.goto(BASE); pg.wait_for_selector("text=Featured"); pg.wait_for_selector("article")
    assert pg.locator("article").count() == 4, "4 featured products"
    pg.screenshot(path=f"{OUT}/home.png")
    ok("hero, featured products and categories render")

    step("shop filters")
    pg.goto(f"{BASE}/shop"); pg.wait_for_selector("article")
    assert pg.locator("article").count() == 12, "12 products on the first page"
    pg.get_by_role("button", name=re.compile(r"^Tech")).click()
    pg.wait_for_function("document.querySelectorAll('article').length === 3")
    assert "category=Tech" in pg.url
    ok("category filter narrows to 3 and updates the URL")
    pg.get_by_role("button", name="All", exact=True).click()
    pg.fill("#min", "50"); pg.fill("#max", "90"); pg.get_by_role("button", name="Apply").click()
    pg.wait_for_function("document.querySelectorAll('article').length === 3")
    assert "minPrice=5000" in pg.url and "maxPrice=9000" in pg.url
    ok("price range $50 to $90 gives 3 products")
    pg.fill("#min", "abc"); pg.get_by_role("button", name="Apply").click()
    expect(pg.locator("#price-error")).to_be_visible(); ok("invalid price shows an inline error")
    pg.get_by_role("button", name="Clear all filters").click()
    pg.fill("#shop-search", "lamp"); pg.press("#shop-search", "Enter")
    pg.wait_for_function("document.querySelectorAll('article').length === 1")
    ok("search finds the lamp")
    pg.goto(f"{BASE}/shop?q=zzzz"); expect(pg.get_by_text("Nothing matches")).to_be_visible(); ok("empty search shows the empty state")
    pg.goto(f"{BASE}/shop?sort=price-asc"); pg.wait_for_selector("article")
    first = pg.locator("article").first.inner_text()
    assert "$18.00" in first, first
    ok("sort by price ascending puts the $18 mug first")
    pg.screenshot(path=f"{OUT}/shop.png")

    step("product page and cart")
    pg.goto(f"{BASE}/product/table-lamp"); pg.wait_for_selector("h1")
    expect(pg.get_by_role("heading", name="Table Lamp")).to_be_visible()
    pg.select_option("#qty", "2"); pg.get_by_role("button", name="Add to cart").click()
    expect(pg.get_by_text("View cart")).to_be_visible()
    pg.goto(f"{BASE}/product/steel-bottle"); expect(pg.get_by_text(re.compile(r"Only [0-9] left"))).to_be_visible(); pg.get_by_role("button", name="Add to cart").click()
    pg.goto(f"{BASE}/product/round-sunglasses"); expect(pg.get_by_text("Sold out").first).to_be_visible()
    assert pg.get_by_role("button", name="Add to cart").count() == 0
    ok("sold out product cannot be added")
    pg.goto(f"{BASE}/product/does-not-exist"); expect(pg.get_by_text("We could not find that product")).to_be_visible(); ok("unknown product shows a friendly 404")
    pg.goto(f"{BASE}/cart"); pg.wait_for_selector("text=Your cart")
    total_text = pg.locator("aside[aria-label='Order summary']").inner_text()
    assert "$136.00" in total_text, total_text
    ok("cart total is 2 x $54 + $28 = $136.00")
    pg.reload(); pg.wait_for_selector("text=Your cart"); assert "$136.00" in pg.locator("aside[aria-label='Order summary']").inner_text()
    ok("cart survives a reload")
    pg.screenshot(path=f"{OUT}/cart.png")

    step("sign in and check out through Stripe")
    pg.get_by_role("button", name="Sign in to check out").click()
    pg.wait_for_url("**/login"); pg.get_by_role("button", name="Demo shopper").click()
    pg.wait_for_url("**/cart"); ok("signed in with the demo shopper and returned to the cart")
    pg.get_by_role("button", name="Checkout with Stripe").click()
    pg.wait_for_url(re.compile(r"checkout\.stripe\.com"), timeout=60000)
    pg.wait_for_timeout(4000)
    pg.screenshot(path=f"{OUT}/stripe.png")
    print("   Stripe page title:", pg.title(), flush=True)
    pg.locator("#cardNumber").fill("4242424242424242")
    pg.locator("#cardExpiry").fill("12 / 34")
    pg.locator("#cardCvc").fill("123")
    for sel, val in [("#billingName", "Demo Shopper"), ("#shippingName", "Demo Shopper"), ("#shippingAddressLine1", "12 Test Street"), ("#shippingLocality", "Lahore"), ("#shippingPostalCode", "54000"), ("#shippingAdministrativeArea", "Punjab")]:
        loc = pg.locator(sel)
        if loc.count():
            try:
                loc.first.fill(val, timeout=3000)
            except Exception as e:
                print("   (could not fill", sel, str(e)[:60], ")")
    pg.wait_for_timeout(800)
    pg.screenshot(path=f"{OUT}/stripe-filled.png")
    pg.get_by_test_id("hosted-payment-submit-button").click()
    pg.wait_for_url(re.compile(r"/checkout/success"), timeout=90000)
    ok("paid on Stripe and redirected back")
    pg.wait_for_selector("text=Thank you.", timeout=30000)
    ok("success page confirmed the order")
    pg.screenshot(path=f"{OUT}/success.png")
    txt = pg.inner_text("main"); assert "$136.00" in txt and "Table Lamp" in txt, txt
    assert pg.locator("header a[aria-label^='Cart']").inner_text().strip().endswith("0"), "cart cleared"
    ok("order total is right and the cart was cleared")

    step("orders page")
    pg.get_by_role("link", name="View my orders").click(); pg.wait_for_url("**/orders"); pg.wait_for_selector("h1:has-text('Your orders')")
    expect(pg.locator("article").first).to_contain_text(re.compile("paid", re.I), timeout=15000)
    assert "12 Test Street" in pg.inner_text("main"), "shipping address from Stripe is shown"
    ok("order appears in history as paid")

    step("customer cannot reach admin")
    pg.goto(f"{BASE}/admin"); expect(pg.get_by_text("Admins only")).to_be_visible(); ok("customer sees Admins only")
    pg.get_by_role("button", name="Sign out").first.click(); pg.wait_for_url("**/login")

    step("admin")
    pg.get_by_role("button", name="Demo admin").click(); pg.wait_for_url("**/admin")
    pg.wait_for_selector("text=Revenue, last 30 days")
    pg.wait_for_selector(".recharts-surface"); pg.wait_for_timeout(1500)
    assert pg.locator(".recharts-surface").count() >= 2
    pg.screenshot(path=f"{OUT}/admin-overview.png", full_page=True)
    ok("dashboard shows stats and both charts")
    pg.get_by_role("link", name="Products").click(); pg.wait_for_selector("tbody tr")
    pg.screenshot(path=f"{OUT}/admin-products.png")
    n = pg.locator("tbody tr").count(); assert n == 12, n
    pg.get_by_role("button", name="New product").click()
    dlg = pg.get_by_role("dialog"); expect(dlg).to_be_visible()
    dlg.get_by_role("button", name="Save product").click()
    expect(dlg.locator("[role=alert]").first).to_be_visible(); ok("empty product form shows validation errors")
    if READONLY:
        dlg.get_by_label("Name").fill("Read only check"); dlg.get_by_label("Description").fill("This should be refused by the public demo.")
        dlg.get_by_label("Price (USD)").fill("9.99"); dlg.get_by_label("Stock").fill("1")
        dlg.get_by_role("button", name="Save product").click()
        expect(dlg.get_by_text("read-only", exact=False)).to_be_visible(timeout=15000)
        ok("live demo admin is refused product writes with a clear message")
        dlg.get_by_role("button", name="Cancel").click()
    else:
        dlg.get_by_label("Name").fill("E2E Test Kettle"); dlg.get_by_label("Description").fill("A kettle created by the end to end test run.")
        dlg.get_by_label("Price (USD)").fill("19.99"); dlg.get_by_label("Stock").fill("7")
        png = os.path.join(OUT, "kettle.png")
        from PIL import Image
        Image.new("RGB", (400, 400), (200, 90, 40)).save(png)
        dlg.locator("input[type=file]").set_input_files(png)
        dlg.locator("img[alt='Product image 1']").wait_for(timeout=30000); ok("image uploaded to Cloudinary and previewed")
        dlg.get_by_role("button", name="Save product").click()
        pg.wait_for_function("document.querySelectorAll('tbody tr').length === 13"); ok("product created")
        pg.get_by_role("button", name="Edit E2E Test Kettle").click(); dlg = pg.get_by_role("dialog")
        dlg.get_by_label("Price (USD)").fill("24.50"); dlg.get_by_role("button", name="Save product").click()
        pg.wait_for_selector("tr:has-text('E2E Test Kettle'):has-text('$24.50')"); ok("product edited")
        pg.goto(f"{BASE}/shop?q=kettle"); pg.wait_for_selector("article"); ok("new product is in the storefront")
        pg.goto(f"{BASE}/admin/products"); pg.wait_for_selector("tbody tr")
        pg.once("dialog", lambda d: d.accept())
        pg.get_by_role("button", name="Delete E2E Test Kettle").click()
        pg.wait_for_function("document.querySelectorAll('tbody tr').length === 12"); ok("product deleted")
    pg.get_by_role("navigation", name="Admin sections").get_by_role("link", name="Orders").click(); pg.wait_for_selector("tbody tr")
    pg.screenshot(path=f"{OUT}/admin-orders.png")
    pg.get_by_role("button", name="paid", exact=True).click(); pg.wait_for_timeout(800)
    btn = pg.get_by_role("button", name="Mark shipped").first; btn.click()
    expect(pg.get_by_text("Order marked shipped.")).to_be_visible(); ok("order marked shipped")

    step("mobile")
    m = b.new_context(viewport={"width": 390, "height": 844}); mp = m.new_page()
    mp.goto(BASE); mp.wait_for_selector("article"); mp.screenshot(path=f"{OUT}/mobile-home.png")
    mp.goto(f"{BASE}/shop"); mp.wait_for_selector("article"); mp.screenshot(path=f"{OUT}/mobile-shop.png")
    assert not mp.evaluate("document.documentElement.scrollWidth > innerWidth"), "horizontal overflow on mobile"
    ok("no horizontal scroll at 390px")

    b.close()

print("\nconsole errors:", errors)
print("ALL DONE" if not errors else "DONE WITH CONSOLE ERRORS")
