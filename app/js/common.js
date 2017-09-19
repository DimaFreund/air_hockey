$(function() {

	$('#top-background-carousel').owlCarousel({
    loop: true,
    items: 1,
    nav: true,
  	navText: ['<i class="fa fa-chevron-left" aria-hidden="true"></i>','<i class="fa fa-chevron-right" aria-hidden="true"></i>'],
   	autoplay: true,
})


	$('#teams-carousel').owlCarousel({
    loop: true,
    margin: 20,
    items: 4,
    nav: true,
  	navText: ['<i class="fa fa-chevron-left" aria-hidden="true"></i>','<i class="fa fa-chevron-right" aria-hidden="true"></i>'],
   	autoplay: true,
})


$(".main").onepage_scroll({
   sectionContainer: "section", // контейнер, к которому будет применяться скролл
   easing: "ease", // Тип анимации "ease", "linear", "ease-in", "ease-out", "ease-in-out"
   animationTime: 1000, // время анимации
   pagination: true, // скрыть или отобразить пагинатор
   updateURL: false // обновлять URL или нет

});



});
