(function(jQuery, sakuraNamespace) {

  const namespeceSakura = sakuraNamespace.public || (sakuraNamespace.public = {});

  const titleAnimation = namespeceSakura.titleAnimation = () => {
    const firstAnimatedTitle = jQuery('#title-animation-1');
    const secondAnimatedTitle = jQuery('#title-animation-2');

    if(firstAnimatedTitle.is(':visible')) {
      // cleaning up the first element
      firstAnimatedTitle.hide();
      if(firstAnimatedTitle.hasClass('active')) {
        firstAnimatedTitle.removeClass('active');
      }
      // Adding the second element on the screen
      secondAnimatedTitle.show();
      if(!secondAnimatedTitle.hasClass('active')) {
        secondAnimatedTitle.addClass('active');
      }
    } else if(secondAnimatedTitle.is(':visible')) {
      // cleaning up the second element
      secondAnimatedTitle.hide();
      if(secondAnimatedTitle.hasClass('active')) {
        secondAnimatedTitle.removeClass('active');
      }
      // Adding the first element on the screen
      firstAnimatedTitle.show();
      if(!firstAnimatedTitle.hasClass('active')) {
        firstAnimatedTitle.addClass('active');
      }
    }
  };
})(jQuery, window.sakura || (window.sakura = {}));
