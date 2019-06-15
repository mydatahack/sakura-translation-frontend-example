describe('Testing Karma', () => {

  describe('Checking', () => {
    beforeEach(()=> {
      const fixture =`
      <div id="fixture">
        <h1 id="check">Hello World</h1>
      </div>
      `;

      document.body.insertAdjacentHTML(
        'afterbegin',
        fixture);
    }); // end of beforeEach()

    afterEach(() => {
      document.body.removeChild(document.getElementById('fixture'));
    });

    it('Trying to manipulate dom and do assertion', () => {
      $('#check').attr('data', 'new-data');
      expect($('#check').attr('data')).toBe('new-data');
    });
  });
});
