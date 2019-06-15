describe('specialisation-card.spec.js', function() {

  // todo: fix loading fixture with karma-fixture: https://www.npmjs.com/package/karma-fixture
  // Erroring now: ReferenceError: Cannot find fixture 'test/fixtures/card.html'
  // beforeEach(function (){
  //   fixture.setBase('test/fixtures');
  //   this.result = fixture.load('card.html');
  // });

  // afterEach(function() {
  //   fixture.cleanup();
  // });
  var spyEvent;
  beforeEach(()=> {
    viewport.set(320);

    const fixture =`
      <div id="fixture">
        <div class="flip-card-inner">
          <div class="flip-card-front">
            <div class="circle"><div class="arrow"></div></div>
          </div>
          <div class="flip-card-back">   
          </div>
        </div>
        <div class="flip-card-inner">
          <div class="flip-card-front">
            <div class="circle"><div class="arrow active"></div></div>
          </div>
          <div class="flip-card-back active">   
          </div>
        </div>
      </div>
      `;

    document.body.insertAdjacentHTML(
      'afterbegin',
      fixture);
    sakura.public.initCardEventListener();
  });

  afterEach(() => {
    document.body.removeChild(document.getElementById('fixture'));
    viewport.reset();
  });

  it('should add the active class when clicking the closed card', function(){
    const targetElement = $($('.flip-card-inner')[0]).trigger('click');
    // const getElement = $($('.flip-card-inner')[0]);
    // console.log(getElement);
    const arrowElement = $($('.arrow')[0]);
    const detailedInfo = $($('.flip-card-back')[0]);
    expect(arrowElement.hasClass('active')).toBe(true);
    expect(detailedInfo.hasClass('active')).toBe(true);
  });

  it('should remove the active class when clicking the open card', function(){
    const targetElement = $($('.flip-card-inner')[1]).trigger('click');
    // const getElement = $($('.flip-card-inner')[1]);
    // console.log(getElement);
    const arrowElement = $($('.arrow')[1]);
    const detailedInfo = $($('.flip-card-back')[1]);
    expect(arrowElement.hasClass('active')).toBe(false);
    expect(detailedInfo.hasClass('active')).toBe(false);
  });
});
