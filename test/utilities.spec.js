describe('utilities.spec.js', () => {

  beforeEach(()=> {
    const fixture =`
      <div id="fixture">
        <div id="copyright-year">Hello World</h1>
      </div>
      `;

    document.body.insertAdjacentHTML(
      'afterbegin',
      fixture);
  }); // end of beforeEach()

  afterEach(() => {
    document.body.removeChild(document.getElementById('fixture'));
  });

  it('should add the current year to the target div with addCopyRightYear()', () => {
    sakura.public.addCopyRightYear();
    const year = $('#copyright-year').text();
    const today = new Date();
    const expectedYear = today.getFullYear().toString();
    expect(year).toBe(expectedYear);
  });
});
