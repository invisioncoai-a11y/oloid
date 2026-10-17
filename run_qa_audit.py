import os
import time
import json
from playwright.sync_api import sync_playwright

BASE_URL = "http://127.0.0.1:4173"
CHROME_PATH = r"C:\Program Files\Google\Chrome\Application\chrome.exe"
SCREENSHOT_DIR = "docs/screenshots"
os.makedirs(SCREENSHOT_DIR, exist_ok=True)

ROUTES = [
    "/",
    "/about",
    "/mission",
    "/partners",
    "/products-services",
    "/products-services/valves-actuators-smart-positioners",
    "/products-services/industrial-pumps-multiphase-systems",
    "/products-services/turbines-compressors-rotating-trains",
    "/products-services/heat-exchangers-cooling-towers-effluent-treatment",
    "/products-services/industrial-dryers-filtration-systems",
    "/products-services/pipeline-scada-leak-detection-systems",
    "/products-services/fiscal-custody-transfer-metering-systems",
    "/products-services/process-instruments-sensors-gauges",
    "/products-services/automation-plc-dcs-safety-systems",
    "/products-services/motors-variable-frequency-drives",
    "/products-services/wellheads-chokes-christmas-trees",
    "/products-services/electric-submersible-pumps-artificial-lift",
    "/products-services/early-production-facilities-separation",
    "/products-services/systems-integration-commissioning-services",
    "/products-services/valve-actuator-maintenance-overhaul",
    "/products-services/metering-instrument-calibration-services",
    "/products-services/technical-manpower-consultancy-services",
    "/news",
    "/news/expanding-turnkey-automation-pipeline-integrity",
    "/news/national-iraq-energy-expo-conference",
    "/news/3rd-basra-oil-gas-conference-exhibition",
    "/careers",
    "/contact",
    "/sitemap",
    "/random-404-test"
]

VIEWPORTS = [
    {"name": "mobile_320", "width": 320, "height": 640},
    {"name": "mobile_375", "width": 375, "height": 667},
    {"name": "mobile_430", "width": 430, "height": 932},
    {"name": "tablet_768", "width": 768, "height": 1024},
    {"name": "laptop_1024", "width": 1024, "height": 768},
    {"name": "desktop_1440", "width": 1440, "height": 900},
    {"name": "wide_1920", "width": 1920, "height": 1080}
]

audit_results = {
    "total_routes_checked": len(ROUTES),
    "routes": {},
    "responsive_overflows": [],
    "console_errors": [],
    "failed_requests": []
}

print(f"--- STARTING COMPREHENSIVE QA AUDIT AT {BASE_URL} ---")

with sync_playwright() as p:
    browser = p.chromium.launch(executable_path=CHROME_PATH, headless=True)
    
    # 1. Test every single route at desktop resolution
    context = browser.new_context(viewport={"width": 1440, "height": 900})
    page = context.new_page()

    # Capture console messages
    page.on("console", lambda msg: audit_results["console_errors"].append({"text": msg.text, "type": msg.type}) if msg.type in ["error"] else None)
    
    # Capture failed network requests
    page.on("requestfailed", lambda req: audit_results["failed_requests"].append({"url": req.url, "failure": req.failure}))

    for route in ROUTES:
        url = f"{BASE_URL}{route}"
        try:
            resp = page.goto(url, wait_until="networkidle", timeout=10000)
            status = resp.status if resp else "unknown"
            title = page.title()
            
            # Scroll down to trigger lazy loading for offscreen images
            page.evaluate("() => window.scrollTo(0, document.body.scrollHeight)")
            time.sleep(0.3)
            page.evaluate("() => window.scrollTo(0, 0)")
            
            # Check for horizontal scroll on page body
            has_h_scroll = page.evaluate("() => document.documentElement.scrollWidth > window.innerWidth")
            
            # Check images
            broken_imgs = page.evaluate("""() => {
                const imgs = Array.from(document.querySelectorAll('img'));
                return imgs.filter(i => !i.complete || i.naturalWidth === 0).map(i => i.src);
            }""")

            audit_results["routes"][route] = {
                "status": status,
                "title": title,
                "has_horizontal_overflow": has_h_scroll,
                "broken_images": broken_imgs
            }
            print(f"Route: {route:<50} | Status: {status} | Title: {title[:45]} | Broken Imgs: {len(broken_imgs)}")
            
        except Exception as e:
            print(f"ERROR on {route}: {e}")
            audit_results["routes"][route] = {"error": str(e)}

    # 2. Test Responsive Viewports on Key Pages (Home, Products, Contact, Partners)
    test_pages = ["/", "/products-services", "/partners", "/contact", "/about"]
    for vp in VIEWPORTS:
        print(f"\n--- Testing Viewport: {vp['name']} ({vp['width']}x{vp['height']}) ---")
        vp_context = browser.new_context(viewport={"width": vp["width"], "height": vp["height"]})
        vp_page = vp_context.new_page()

        for path in test_pages:
            vp_page.goto(f"{BASE_URL}{path}", wait_until="networkidle")
            time.sleep(0.3)
            overflow = vp_page.evaluate("() => document.documentElement.scrollWidth > window.innerWidth")
            if overflow:
                scroll_diff = vp_page.evaluate("() => document.documentElement.scrollWidth - window.innerWidth")
                print(f"  [OVERFLOW WARNING] {path} at {vp['width']}px has overflow by {scroll_diff}px!")
                audit_results["responsive_overflows"].append({
                    "path": path,
                    "viewport": vp["name"],
                    "width": vp["width"],
                    "overflow_px": scroll_diff
                })
            else:
                print(f"  [OK] {path} at {vp['width']}px — perfectly contained, no overflow.")

            # Capture screenshots for key pages at representative sizes
            if vp["name"] in ["mobile_375", "desktop_1440"]:
                clean_name = path.strip("/").replace("/", "_") or "home"
                ss_path = os.path.join(SCREENSHOT_DIR, f"{clean_name}_{vp['name']}.png")
                vp_page.screenshot(path=ss_path, full_page=False)
                print(f"  Screenshot saved: {ss_path}")

        vp_context.close()

    # 3. Interactive Component Testing
    print("\n--- Testing Interactive Components & Dialogs ---")
    page.goto(f"{BASE_URL}/", wait_until="networkidle")
    
    # Test Modal on Home Page
    proposal_btn = page.query_selector("button:has-text('Request Technical Proposal')")
    if proposal_btn:
        proposal_btn.click()
        time.sleep(0.4)
        modal_visible = page.is_visible("div[role='dialog']")
        print("  Proposal Modal open verification:", "PASSED" if modal_visible else "FAILED")
        
        # Test modal close
        close_btn = page.query_selector("div[role='dialog'] button[aria-label='Close dialog']")
        if close_btn:
            close_btn.click()
            time.sleep(0.3)
            modal_closed = not page.is_visible("div[role='dialog']")
            print("  Proposal Modal close verification:", "PASSED" if modal_closed else "FAILED")

    # Test Mobile Menu Open / Close at 375px
    m_ctx = browser.new_context(viewport={"width": 375, "height": 667})
    m_page = m_ctx.new_page()
    m_page.goto(f"{BASE_URL}/", wait_until="networkidle")
    
    burger = m_page.query_selector("button[aria-label='Open navigation menu']")
    if burger:
        burger.click()
        time.sleep(0.4)
        menu_open = m_page.is_visible("div[role='dialog']")
        print("  Mobile Drawer open verification:", "PASSED" if menu_open else "FAILED")
        
        close_menu = m_page.query_selector("div[role='dialog'] button[aria-label='Close navigation menu']")
        if close_menu:
            close_menu.click()
            time.sleep(0.3)
            menu_closed = not m_page.is_visible("div[role='dialog']")
            print("  Mobile Drawer close verification:", "PASSED" if menu_closed else "FAILED")
    
    m_ctx.close()

    # Test Catalog Search on /products-services
    page.goto(f"{BASE_URL}/products-services", wait_until="networkidle")
    search_box = page.query_selector("input[placeholder*='Search solutions']")
    if search_box:
        search_box.fill("SCADA")
        time.sleep(0.3)
        cards = page.query_selector_all("a:has-text('Pipeline SCADA')")
        print("  Catalog search filter 'SCADA':", "PASSED" if len(cards) > 0 else "FAILED")

    browser.close()

with open("qa_audit_results.json", "w", encoding="utf-8") as f:
    json.dump(audit_results, f, indent=2)

print("\n--- QA AUDIT COMPLETE! Results saved to qa_audit_results.json ---")
