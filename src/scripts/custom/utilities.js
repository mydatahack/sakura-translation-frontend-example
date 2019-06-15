(function(jQuery, sakuraNamespace) {

  var namespeceSakura = sakuraNamespace.public || (sakuraNamespace.public = {});

  namespeceSakura.addCopyRightYear = function () {
    var target = jQuery('#copyright-year');
    var today = new Date();
    target.text(today.getFullYear());
  };
})(jQuery, window.sakura || (window.sakura = {}));
