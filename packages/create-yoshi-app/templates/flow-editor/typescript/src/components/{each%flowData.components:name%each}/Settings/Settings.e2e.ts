describe('Settings Panel', () => {
  it('should display a header', async () => {
    await page.goto('https://localhost:3100/settings/{%name%}');

    expect(await page.$$eval('input', inputs => inputs.length)).toBe(1);
  });
});
