// Run Script on document ready
$( document ).ready(function(){
  titleAnimation();
  setInterval(function(){titleAnimation()}, 4000);
  addCopyRightYear();
})

// Event Listeners
// (1) Toggler for mobile Nav
$("#toggler").click(function() {

  var navPanel = $(".navigation-panel");
  var toggle = $("#toggler")
  navPanel.css("height", "");

  if( navPanel.hasClass("active") && toggle.hasClass("active") ) {
    navPanel.removeClass("active");
    toggle.removeClass("active");
  } else {
    navPanel.css("height", $( window ).height() + "px");
    navPanel.addClass("active");
    toggle.addClass("active");
  }
})

// (2) Change on the top nav bar on scroll for desktop
$(document).scroll(function(){

  var navMain = $(".navigation-main");
  var signInBtn = $("#signin");

  if (!navMain.hasClass("scrolled")) {
    navMain.addClass("scrolled");
    if (!signInBtn.hasClass("btn-primary") && signInBtn.hasClass("btn-outline-success")) {
      signInBtn.removeClass("btn-outline-success");
      signInBtn.addClass("btn-primary");
    }
  };

  if ($(document).scrollTop() === 0) {
    if (navMain.hasClass("scrolled")) {
      navMain.removeClass("scrolled");
    }
    if (!signInBtn.hasClass("btn-outline-success") && signInBtn.hasClass("btn-primary")) {
      signInBtn.removeClass("btn-primary");
      signInBtn.addClass("btn-outline-success");
    }
  };
})

// Home hero title animation
function titleAnimation(){
  var firstAnimatedTitle = $("#title-animation-1");
  var secondAnimatedTitle = $("#title-animation-2");

  if(firstAnimatedTitle.is(":visible")) {
    // cleaning up the first element
    firstAnimatedTitle.hide();
    if(firstAnimatedTitle.hasClass("active")) {
      firstAnimatedTitle.removeClass("active");
    }
    // Adding the second element on the screen
    secondAnimatedTitle.show();
    if(!secondAnimatedTitle.hasClass("active")) {
      secondAnimatedTitle.addClass("active")
    }
  } else if(secondAnimatedTitle.is(":visible")) {
    // cleaning up the second element
    secondAnimatedTitle.hide();
    if(secondAnimatedTitle.hasClass("active")) {
      secondAnimatedTitle.removeClass("active");
    }
    // Adding the first element on the screen
    firstAnimatedTitle.show();
    if(!firstAnimatedTitle.hasClass("active")) {
      firstAnimatedTitle.addClass("active")
    }
  } 
}

// Adding year to the copyright in footer
function addCopyRightYear() {
  var target = $("#copyright-year");
  var today = new Date();
  target.text(today.getFullYear());
}

// (3) Event listener for specialization card for mobile
$(".flip-card-inner").click(function() {
  if ($(window).width() <= 991) {
    var arrowElement = $(this).find(".arrow");
    var detailedInfo = $(this).find(".flip-card-back")
    if(!arrowElement.hasClass("active") && !detailedInfo.hasClass("active")){
      arrowElement.addClass("active");
      detailedInfo.addClass("active");
    } else if (arrowElement.hasClass("active") && detailedInfo.hasClass("active")) {
      arrowElement.removeClass("active");
      detailedInfo.removeClass("active");
    }
  }
});
