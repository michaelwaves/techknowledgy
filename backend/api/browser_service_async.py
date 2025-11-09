from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from playwright.async_api import async_playwright
import os
import base64
from typing import Optional, List

router = APIRouter()

class BrowserActionRequest(BaseModel):
    url: str
    action: str  # 'navigate', 'screenshot', 'click', 'type', 'get_text'
    selector: Optional[str] = None
    text: Optional[str] = None
    instruction: Optional[str] = None

class BrowserStepRequest(BaseModel):
    url: str
    steps: List[dict]  # List of actions to perform
    instruction: str

@router.post("/api/browser/action")
async def perform_browser_action(request: BrowserActionRequest):
    """Perform a single browser action"""
    try:
        async with async_playwright() as p:
            browser = await p.chromium.launch(headless=True)
            context = await browser.new_context(
                viewport={'width': 1280, 'height': 720},
                user_agent='Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
            )
            page = await context.new_page()
            
            result = {"success": False, "data": None, "message": ""}
            
            try:
                # Navigate to URL
                await page.goto(request.url, wait_until='networkidle', timeout=30000)
                await page.wait_for_timeout(2000)
                
                if request.action == 'screenshot':
                    screenshot = await page.screenshot(full_page=False)
                    screenshot_base64 = base64.b64encode(screenshot).decode('utf-8')
                    result = {
                        "success": True,
                        "data": {
                            "screenshot": screenshot_base64,
                            "url": page.url,
                            "title": await page.title()
                        },
                        "message": "Screenshot captured successfully"
                    }
                    
                elif request.action == 'click':
                    if not request.selector:
                        raise ValueError("Selector required for click action")
                    await page.click(request.selector, timeout=5000)
                    await page.wait_for_timeout(1000)
                    screenshot = await page.screenshot()
                    screenshot_base64 = base64.b64encode(screenshot).decode('utf-8')
                    result = {
                        "success": True,
                        "data": {
                            "screenshot": screenshot_base64,
                            "url": page.url
                        },
                        "message": f"Clicked on {request.selector}"
                    }
                    
                elif request.action == 'type':
                    if not request.selector or not request.text:
                        raise ValueError("Selector and text required for type action")
                    await page.fill(request.selector, request.text)
                    await page.wait_for_timeout(500)
                    screenshot = await page.screenshot()
                    screenshot_base64 = base64.b64encode(screenshot).decode('utf-8')
                    result = {
                        "success": True,
                        "data": {
                            "screenshot": screenshot_base64,
                            "url": page.url
                        },
                        "message": f"Typed into {request.selector}"
                    }
                    
                elif request.action == 'get_text':
                    if request.selector:
                        text = await page.text_content(request.selector)
                    else:
                        text = await page.content()
                    result = {
                        "success": True,
                        "data": {"text": text, "url": page.url},
                        "message": "Text extracted successfully"
                    }
                    
                elif request.action == 'navigate':
                    screenshot = await page.screenshot()
                    screenshot_base64 = base64.b64encode(screenshot).decode('utf-8')
                    result = {
                        "success": True,
                        "data": {
                            "screenshot": screenshot_base64,
                            "url": page.url,
                            "title": await page.title()
                        },
                        "message": "Navigated successfully"
                    }
                    
            finally:
                await context.close()
                await browser.close()
                
            return result
            
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/api/browser/demonstrate")
async def demonstrate_steps(request: BrowserStepRequest):
    """Demonstrate a series of steps with screenshots"""
    try:
        async with async_playwright() as p:
            browser = await p.chromium.launch(headless=True)
            context = await browser.new_context(
                viewport={'width': 1280, 'height': 720},
                user_agent='Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
            )
            page = await context.new_page()
            
            screenshots = []
            
            try:
                # Navigate to initial URL
                await page.goto(request.url, wait_until='networkidle', timeout=30000)
                await page.wait_for_timeout(2000)
                
                # Initial screenshot
                screenshot = await page.screenshot()
                screenshot_base64 = base64.b64encode(screenshot).decode('utf-8')
                screenshots.append({
                    "step": 0,
                    "description": f"Starting at {request.url}",
                    "screenshot": screenshot_base64,
                    "url": page.url
                })
                
                # Perform each step
                for idx, step in enumerate(request.steps, 1):
                    action = step.get('action')
                    selector = step.get('selector')
                    text = step.get('text')
                    description = step.get('description', f'Step {idx}')
                    
                    if action == 'click':
                        await page.click(selector, timeout=5000)
                        await page.wait_for_timeout(1000)
                    elif action == 'type':
                        await page.fill(selector, text)
                        await page.wait_for_timeout(500)
                    elif action == 'scroll':
                        await page.evaluate(f"window.scrollTo(0, {text or 500})")
                        await page.wait_for_timeout(500)
                    elif action == 'wait':
                        await page.wait_for_timeout(int(text or 1000))
                    
                    # Capture screenshot after action
                    screenshot = await page.screenshot()
                    screenshot_base64 = base64.b64encode(screenshot).decode('utf-8')
                    screenshots.append({
                        "step": idx,
                        "description": description,
                        "screenshot": screenshot_base64,
                        "url": page.url,
                        "action": action
                    })
                    
            finally:
                await context.close()
                await browser.close()
                
            return {
                "success": True,
                "instruction": request.instruction,
                "screenshots": screenshots,
                "message": f"Demonstrated {len(screenshots)} steps"
            }
            
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/api/browser/health")
async def browser_health():
    """Check if browser automation is working"""
    try:
        async with async_playwright() as p:
            browser = await p.chromium.launch(headless=True)
            await browser.close()
            return {"status": "healthy", "message": "Browser automation is working"}
    except Exception as e:
        return {"status": "unhealthy", "message": str(e)}