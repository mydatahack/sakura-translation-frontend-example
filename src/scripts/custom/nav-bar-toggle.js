(function(jQuery, sakuraNamespace) {

  const namespaceSakura = sakuraNamespace.public || (sakuraNamespace.public = {});

  const mobileToggleAnimation = namespaceSakura.mobileToggleAnimation = () => {
    const navPanel = jQuery('.navigation-panel');
    const toggle = jQuery('#toggler');
    navPanel.css('height', '');
    if( navPanel.hasClass('active') && toggle.hasClass('active') ) {
      navPanel.removeClass('active');
      toggle.removeClass('active');
    } else {
      navPanel.css('height', jQuery( window ).height() + 'px');
      navPanel.addClass('active');
      toggle.addClass('active');
    }
  };

  jQuery('#toggler').click( () => {
    mobileToggleAnimation();
  });

  const navBarFixTop = namespaceSakura.navBarFixTop = () => {
    const navMain = jQuery('.navigation-main');
    const signInBtn = jQuery('#signin');
    if (!navMain.hasClass('scrolled')) {
      navMain.addClass('scrolled');
      if (!signInBtn.hasClass('btn-primary') && signInBtn.hasClass('btn-outline-success')) {
        signInBtn.removeClass('btn-outline-success');
        signInBtn.addClass('btn-primary');
      }
    }
    if (jQuery(document).scrollTop() === 0) {
      if (navMain.hasClass('scrolled')) {
        navMain.removeClass('scrolled');
      }
      if (!signInBtn.hasClass('btn-outline-success') && signInBtn.hasClass('btn-primary')) {
        signInBtn.removeClass('btn-primary');
        signInBtn.addClass('btn-outline-success');
      }
    }
  };

  jQuery(document).scroll( () => {
    navBarFixTop();
  });

})(jQuery, window.sakura || (window.sakura = {}));

