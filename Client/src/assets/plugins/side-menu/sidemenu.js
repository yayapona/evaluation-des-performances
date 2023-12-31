(function () {
	"use strict";
	var slideMenu = $('.side-menu');

	// Toggle Sidebar
	$(document).on('click','[data-toggle="sidebar"]',function(event) {
		event.preventDefault();
		$('.app').toggleClass('sidenav-toggled');
	});

  $(document).on('mouseover','.app-sidebar', function (event) {
    event.preventDefault();
    if ($('.app').hasClass('sidenav-toggled')) {
      $('.app').addClass('sidenav-toggled1');
    }
  });

  $(document).on('mouseout','.app-sidebar', function (event) {
    event.preventDefault();
    if ($('.app').hasClass('sidenav-toggled1')) {
      $('.app').removeClass('sidenav-toggled1');
    }
  });

  /*$(document).on('click','[data-toggle="tab"]', function (event) {
    event.preventDefault();
    $('[data-toggle="tab"]').each(function(){
      if ($(this).hasClass('active show')) {
        $(this).removeClass('active show');
      }
    });
    $(this).addClass('active show');
    let att =   $(this).attr('href');
    $(att).addClass('active show');
    console.log(att);
  });*/




  // Activate sidebar slide toggle

  $(document).on('click','[data-toggle="slide"]',function(event) {
    event.preventDefault();
    if(!$(this).parent().hasClass('is-expanded')) {
      slideMenu.find("[data-toggle='slide']").parent().removeClass('is-expanded');
    }
    $(this).parent().toggleClass('is-expanded');
  });


  $(document).on('click','[data-toggle="sub-slide"]',function(event) {
    event.preventDefault();
    if(!$(this).parent().hasClass('is-expanded')) {
      slideMenu.find("[data-toggle='sub-slide']").parent().removeClass('is-expanded');
    }
    $(this).parent().toggleClass('is-expanded');
    $('.slide.active').addClass('is-expanded');
  });
	
	// Set initial active toggle
	$("[data-toggle='slide.'].is-expanded").parent().toggleClass('is-expanded');
	$("[data-toggle='sub-slide.'].is-expanded").parent().toggleClass('is-expanded');
	

	//Activate bootstrip tooltips
	$("[data-toggle='tooltip']").tooltip();
	
	
	$(".sidebar-scroll").mCustomScrollbar({
		theme:"minimal",
		autoHideScrollbar: true,
		scrollbarPosition: "outside"
	});
	
	// ______________Active Class
	$(".app-sidebar a").each(function() {
	  var pageUrl = window.location.href.split(/[?#]/)[0];
		if (this.href == pageUrl) { 
			$(this).addClass("active");
			$(this).parent().addClass("active"); // add active to li of the current link
			$(this).parent().parent().prev().addClass("active"); // add active class to an anchor
			$(this).parent().parent().parent().addClass("active"); // add active class to an anchor
			$(this).parent().parent().parent().parent().parent().addClass("active"); 
			$(this).parent().parent().prev().click(); // click the item to make it drop
		}
	});
	
	
	var toggleSidebar = function() {
		var w = $(window);
		if(w.outerWidth() <= 1024) {
			$("body").addClass("sidebar-gone");
			$(document).off("click", "body").on("click", "body", function(e) {
				if($(e.target).hasClass('sidebar-show') || $(e.target).hasClass('search-show')) {
					$("body").removeClass("sidebar-show");
					$("body").addClass("sidebar-gone");
					$("body").removeClass("search-show");
				}
			});
		}else{
			$("body").removeClass("sidebar-gone");
		}
	}
	toggleSidebar();
	$(window).resize(toggleSidebar);

})();
