// Run Script on document ready
$( document ).ready(function(){
  sakura.public.titleAnimation();
  setInterval(function(){sakura.public.titleAnimation();}, 4000);
  sakura.public.addCopyRightYear();
  sakura.public.initCardEventListener();
});
