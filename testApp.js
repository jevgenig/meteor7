Router.route('', {
    name: 'home',
    controller: 'HomeController'
});
Router.route('about', {
    controller: 'HomeController'
});
Router.route('form', {});
Router.route('services', {});

if (Meteor.isClient) {
    Meteor.startup(function () {
        var myApp = new Framework7();
        var _animationEnd = 'oanimationend animationend webkitAnimationEnd otransitionend oTransitionEnd msTransitionEnd mozAnimationEnd MSAnimationEnd',
                _enterAnimation = 'fadeIn animated',
                _leaveAnimation = 'fadeOut animated',
                _animate = function ($el, anim, next) {
                    return $el.addClass(anim)
                            .on(_animationEnd, function () {
                                $(this).removeClass(anim);
                                next && next();
                            });
                };
        Router.onAfterAction(function () {
            _animate($(".view-main"), _enterAnimation);
        });
        $(document.body).click(function (event) {
            var $t = $(event.target).parents().andSelf().filter("[href]:last"), url;
            if ($t.size() && (url = $t.attr('href'))) {
                var currentRoute = Router.current();
                _animate($(".view-main"), _leaveAnimation, function () {
                    currentRoute.redirect(url);
                });
                event.preventDefault(), event.stopPropagation();
            } else {
                myApp.openPanel('right');
            }
        });

        
    });
    var mainView;
    ApplicationController = RouteController.extend({
        layoutTemplate: 'AppLayout',
        action: function () {
            console.log('this should be overridden!');
        }
    });

    HomeController = ApplicationController.extend({
        onBeforeUnload: function () {

        },
        action: function () {
            var self = this;

            switch (self.path) {
                case '/':
                    self.render('Home');
                    break;
                case '/about':
                    self.render('about');
                    break;
            }


        }
    });

    if (false)
        Meteor.startup(function () {
// Initialize your app
            var myApp = new Framework7({
                preprocess: function (content, url, next) {
                    debugger;
                }
            });

// Export selectors engine
            var $$ = Dom7;


            mainView = myApp.addView('.view-main', {
                // Because we use fixed-through navbar we can enable dynamic navbar
                dynamicNavbar: true
            });

        });

}

if (Meteor.isServer) {
    Meteor.startup(function () {
        // code to run on server at startup
    });
}
