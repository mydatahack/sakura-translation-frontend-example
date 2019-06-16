(function(jQuery, sakuraNamespace) {

  const namespaceSakura = sakuraNamespace.public || (sakuraNamespace.public = {});

  const cardOpenClose = (element) => {
    if (jQuery(window).width() <= 991) {
      var arrowElement = element.find('.arrow');
      var detailedInfo = element.find('.flip-card-back');
      if(!arrowElement.hasClass('active') && !detailedInfo.hasClass('active')){
        arrowElement.addClass('active');
        detailedInfo.addClass('active');
      } else if (arrowElement.hasClass('active') && detailedInfo.hasClass('active')) {
        arrowElement.removeClass('active');
        detailedInfo.removeClass('active');
      }
    }
  };

  const init = namespaceSakura.initCardEventListener = () => {
    // not using () => {} to avoid lexical scoping for this.
    // Alternatively, can use (event) => { const $this = $(event.currentTarget)}
    jQuery('.flip-card-inner').click(function() {
      cardOpenClose(jQuery(this));
    });
  };

})(jQuery, window.sakura || (window.sakura = {}));
