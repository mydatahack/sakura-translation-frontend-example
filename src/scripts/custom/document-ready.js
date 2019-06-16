// Run Script on document ready
$( document ).ready(function(){

  // Enabling title animation
  sakura.public.titleAnimation();
  setInterval(function(){sakura.public.titleAnimation();}, 4000);

  // Adding current year to footer
  sakura.public.addCopyRightYear();

  // Initialising event listeners
  sakura.public.initCardEventListener();
  sakura.public.mobileNavToggleClickInit();
  sakura.public.navBarFixTopInit();

  // Initialising form validation
  var validation = new sakura.validation.ValidationEventHandler();
  validation.init();
});
