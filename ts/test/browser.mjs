import { chromium, firefox, webkit } from 'playwright';
import { strict as assert } from 'assert';

for (const browserType of [chromium, firefox]) { // We'd like to test webkit, but playwright doesn't support it on Debian (?!)
	var browser;
	if (browserType == chromium)
		browser = await browserType.launch(["--js-flags=\"--expose-gc\""]);
	else
		browser = await browserType.launch();
	const context = await browser.newContext();
	const page = await context.newPage();
	page.on('console', async msg => {
		const values = [];
		for (const arg of msg.args())
			values.push(await arg.jsonValue());
		console.log(...values);
	});
	await page.goto('http://localhost:8000/test/index.html');
	var ret;
	// On chromium we expose the GC and can run it manually, otherwise we really can't leak-check
	if (browserType == chromium) {
		ret = await page.evaluate(() => { return test_runner('../liblightningjs.wasm', true); });
	} else {
		ret = await page.evaluate(() => { return test_runner('../liblightningjs.wasm', false); });
	}
	assert(ret);

	await browser.close();
}
