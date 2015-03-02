angular.module('angularFocusPoint', [])
  
  .directive('focusPoint', function() {

    coordsToPercentage = function(x, y) {

      return {
        left: ((Number(x) + 1) / 2) * 100,
        top: (1 - ((Number(y) + 1) / 2)) * 100
      }
    };

    getMousePosition = function(event, imgAttrs) {
      
      return {
        x: event.pageX - imgAttrs.offsetLeft,
        y: event.pageY - imgAttrs.offsetTop
      };
    };

    getFocusPoints = function(offset, imgAttrs) {
      
      return {
        x: ((offset.x / imgAttrs.width - .5) * 2).toFixed(2),
        y: ((offset.y / imgAttrs.height - .5) * -2).toFixed(2)
      }
    };

    getPercentage = function(offset, imgAttrs) {
      
      return {
        left: ((offset.x / imgAttrs.width) * 100).toFixed(2),
        top: ((offset.y / imgAttrs.height) * 100).toFixed(2)
      }
    };
  	
  	return {
  	  
  	  restrict: 'E',
  	  template: '<div class="afp-container" style="float:left;max-width:100%;overflow:hidden;position:relative"><img class="afp-img" style="cursor:pointer;display:block;height:auto;max-width:100%;" ng-src="{{ imageUrl }}" /><img class="afp-circle" style="position:absolute;top:50%;left:50%;-webkit-transform:translate(-50%, -50%);-ms-transform:translate(-50%, -50%);transform:translate(-50%, -50%);transition:all 500ms ease-in-out;-webkit-transition:all 500ms ease-in-out;-moz-transition:all 500ms ease-in-out;" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAQAAADa613fAAAELUlEQVR4Ae3c0UubVxjH8V9SBG2BrBqHUQsTLW2glZYCjqVQgc71rtX4N6j/gNbaSu9UoZa5SHCT3mgva9E1QKHSG4WNrYBEwEV7Y0iKoK/N7Qblu5sCZxMxNnmT9wQ/d89NQE6O5Jzz/B5Z4tQpfLTSzQhzvOYdKTLkgBwZUrzjNXOM0E0rPnkVVxkkgcMOCSbp5w43uEQTAYkATVziBnfoY5IEOzgkGOQqPi+tQYRp0mwTo5cG5YUGeomxTZZpImX/c6hlkE3STBDWFyHMBGn+YpCgyoNviPORBW7jV0Hwc5sFPhKnRaVFiFkcJmlU0dDIJA6zhFQa1PAQhynqVXTUM4XDQ2rkNm6RYpk2uYY2lkjRKfdQxVOy9Mh19JDhKVVyAy38xiJ1KgnqWOR3FzY/d9llQCXFALvcVTExTIYOlRwdZBhWceAnTpILKgsukCSOX4XiDAus8ZXKhgCrPOdMoasxz1vOqaw4x1sWCloV4qxxVmXHWdaIF7LFkwTkCQRIfuG2J0qaZnkGzaSJ6qS4zB7fylPoYI/LOgmq2WBAnsMAG1Qrf8R4KU/iJT8pX3SSpU6eRC1ZbuX7tdoiKs8iylZeXy9G+VWexjKj+Rw497koT+Mi+8cespllSp7HE2aPOzw5fC3Pox6HFh2NGOOyAuPM6CgEyRGSFQiRO/JKj0HmZQ3muX/UHW6Km7IGN0nh02F8R0pWYZOIDuNHHssqPGZa/4ePDGFZhTBZfIefad7LOrynXf/FfWZkHWKH/nORoFfWoZeETPhxaJB1aMDB3CW0sSMrkabVLLtJyEok6DbLESZkJcYZMctf6JeV6GfOLN/QJSvxAytmuc41WYlrrJtllkZZiUY+mGWOgKxEgJxZ/k2VrEQV/5glchGrrMo1ULIVYZU1N1ekIvdIlpCsRIgPZrnOFVmJK6yb5Ru+l5XoYqUif2vZ/+u30s4jNp8Q2yrnzG4iQVTWIUri8L1WzOp7LftvGivr7tfEtMW38SYibFbG+4iPFBFZgwjmi5WJIdveECvzVddEjDFZgTFmjut8qLe288HELE+s7UUx0Yjj+e6gNhya8unXWpanscRoJXTQ9bBFdf49jbXyJGrJ0Kl8EWNRnsQLYsofNR7t++1ngxqdBGH26JCn0ME+4crvjbc/rWBdfqTQYJJXEj1nCs1YPWeVgOUZKw+k3pqN1FvheFDGHOIDFRP3ypAM7WeXe25kdf8oYVa3lhf8SYt76emMxelpE52kWHI9z75FZ+kmDARVdATNCQOlm/kwRqionznGAT8TUmnRYvkUDhNBhkgVYS5KiiGC3phUk2WbGN0nmFTT7ZlJNSZ8XGf48+ygV4zTRxftNHEev4Sf8zTRThd9jPPq8+ygYa7j8/I0px4e8YwVkmQ54BPwiQOyJFnhGY/ooRWfKtqpfwGhkLUjFyM97QAAAABJRU5ErkJggg==" /></div>',
      replace: true,
      scope: {
      	imageUrl: '@',
      	pointX: '@',
      	pointY: '@',
      	onFocusPoint: '&'
      },
  	  
  	  link: function (scope, element, attrs) {

        var img     = element.find('.afp-img');
        var circle  = element.find('.afp-circle');

        var imgAttrs = { width: null, height: null, offsetLeft: null, offsetTop: null }

  	  	attrs.$observe('imageUrl', function() {
  	  		//circle.css({'left': '50%', 'top': '50%'});
  	  	});

        /* Get image dimensions and set focus point, when the image is fully loaded */

  	  	img.bind('load', function() {

          imgAttrs.width       = img.width();
          imgAttrs.height      = img.height();
          imgAttrs.offsetLeft  = img.offset().left;
          imgAttrs.offsetTop   = img.offset().top;
      	  	
      	  if(attrs.pointX && attrs.pointY) {

            var percentage = coordsToPercentage(attrs.pointX, attrs.pointY);

      	  	circle.css({'left': percentage.left + '%', 'top': percentage.top + '%'});
      	  }

  	  	});

        /* Set focus point when the image is clicked */

  	  	element.on('click', function(event) {
	      
	        event.preventDefault();

          var offset = getMousePosition(event, imgAttrs);

          var focusPoint = getFocusPoints(offset, imgAttrs);

		      scope.onFocusPoint({'x': focusPoint.x, 'y': focusPoint.y });

          var percentage = getPercentage(offset, imgAttrs);

		      circle.css({'left': percentage.left + '%', 'top': percentage.top + '%'});
	      });
  	  }
  	}

  });