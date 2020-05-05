describe('Editor App', () => {
  it('should display {%name%} text', async () => {
    await page.goto('https://localhost:3100/editor/{%name%}');
    await page.waitForSelector('button');

    expect(await page.$eval('button', e => e.textContent)).toEqual('click me');
  });
});
