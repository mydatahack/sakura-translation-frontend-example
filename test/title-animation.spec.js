describe('title-animation.spec.js', () => {
  // Example of using JQuery to inject Elements
  let $titleGroup;
  beforeEach(() => {
    $titleGroup = $(`
      <div class="hero-header-main-title" id="fixture">
        <h1 class="hero-heading-mobile">Connect You to Japan</h1>
        <h1 class="hero-heading-lg">Connect
        <span class="hero-heading-lg animated delay-1s fadeInDown title-animation" id="title-animation-1">Your Business to Japan</span>
        <span class="hero-heading-lg animated delay-1s fadeInDown title-animation" id="title-animation-2">Japan to Your Business</span>
        </h1>
      </div>
    `);
    $(document.body).append($titleGroup);
  });

  afterEach(() => {
    $($titleGroup).remove();
  });

  it('should hide 1st title when it is visible', () => {
    sakura.public.titleAnimation();
    expect($('#title-animation-1').css('display')).toBe('none');
    expect($('#title-animation-1').hasClass('active')).toBe(false);
  });

  it('should hide 2st title when 1st title is visible', () => {
    $('#title-animation-1').hide();
    $('#title-animation-2').addClass('active');
    sakura.public.titleAnimation();
    expect($('#title-animation-2').css('display')).toBe('none');
    expect($('#title-animation-2').hasClass('active')).toBe(true);
  });
})
;
