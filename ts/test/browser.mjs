import { chromium, firefox, webkit } from 'playwright';
import { strict as assert } from 'assert';

for (const browserType of [chromium, firefox]) { // We'd like to test webkit, but playwright doesn't support it on Debian (?!)
	const browser = await browserType.launch();
	const context = await browser.newContext();
	const page = await context.newPage();
	await page.goto('http://localhost:8000/ts/test/index.html');
	const ret = await page.evaluate(() => {
		return test_runner('../../liblightningjs.wasm');
	});
	assert(ret);

	await browser.close();
}
