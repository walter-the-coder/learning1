'use strict';

angular.module('stylingMaler')
  .controller('ImagesCtrl', function ($scope) {
  	var ae = angular.element;

  	ae(function(){
		ae('.rightClickImage').each(function(){
			ae(this).bind('contextmenu', function(event){
		        event.preventDefault();
		        var currentImage = ae(this);
		        var largeImage = currentImage.clone();
		        currentImage.parent().append(largeImage);

		        largeImage
		        .addClass('larger');

		        var height = largeImage.height()/2;
		        var width = largeImage.width()/2;
		        
		        largeImage
		        .css({'top': (event.pageY-height), 'left': (event.pageX-width) })
		        .each(function(){
					ae(this).bind('contextmenu', function(event){
						event.preventDefault();
						this.remove();
					});
				});
		    });
		});
	});

  });