describe('nav-bar-toggle.spec.js', () => {

  describe('mobileNavToggleClickInit()', () => {

    let $navPanel;
    beforeEach(() => {
      viewport.set(320);
      $navPanel = $(
        `<div>
          <button class="navbar-burger" id="toggler"></button>
          </div>
          <div class="navigation-panel">
          </div>
        </div>
        `
      );
      $(document.body).append($navPanel);
    });

    afterEach(() => {
      viewport.reset();
      $($navPanel).remove();
    });

    it('should ADD height to the nav panel and active class when the toggle is clicked for open', () => {
      sakura.public.mobileNavToggleClickInit();
      $('#toggler').click();
      const navPanel = $('.navigation-panel');
      const toggle = $('#toggler');
      expect(navPanel.css('height')).toContain('px');
      expect(toggle.hasClass('active')).toBe(true);
    });

    it('should REMOVE height to the nav panel and active class when the toggle is clicked for close', () => {
      sakura.public.mobileNavToggleClickInit();
      $('.navigation-panel').css('height', '400px');
      $('.navigation-panel').addClass('active');
      $('#toggler').addClass('active');
      $('#toggler').click();
      const navPanel = $('.navigation-panel');
      const toggle = $('#toggler');
      expect(navPanel.css('height')).toBe('0px');
      expect(toggle.hasClass('active')).toBe(false);
    });
  });

  describe('navBarFixTopInit()', () => {
    let $navBar;
    beforeEach(() => {
      $navBar = $(
        `<div class="navigation-main" style="height:2000px;">
        <button class="btn btn-outline-success singin-button" type="button" id="signin" data-toggle="modal" data-target="#signInFormModal">
        Sign In</button>
        </div>
        `
      );
      $(document.body).append($navBar);
    });

    afterEach(() => {
      viewport.reset();
      $($navBar).remove();
    });

    it('should ADD scrolled class and change button class on scroll event', () => {
      sakura.public.navBarFixTopInit();
      // set the position
      $(document).scrollTop(1000);
      // Trigger scroll() event
      $(document).scroll();
      console.log('Checking scrolled positon ', window.scrollY);
      const navMain = $('.navigation-main');
      const signInBtn = $('#signin');
      expect(navMain.hasClass('scrolled')).toBe(true);
      expect(signInBtn.hasClass('btn-primary')).toBe(true);
    });

    it('should REMOVE scrolled class and change button class when scrolled to top', () => {
      sakura.public.navBarFixTopInit();
      // scroll down first
      $(document).scrollTop(1000);
      $(document).scroll();
      // then scroll up to the top
      $(document).scrollTop(0);
      $(document).scroll();
      const navMain = $('.navigation-main');
      const signInBtn = $('#signin');
      expect(navMain.hasClass('scrolled')).toBe(false);
      expect(signInBtn.hasClass('btn-outline-success')).toBe(true);
    });
  });
})
;
