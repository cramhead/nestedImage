Router.configure({
    layoutTemplate: 'layout',
    notFoundTemplate: 'notFound',
    loadingTemplate: 'loading'
});


Router.map(function() {

    this.route('home', {
        path: '/',
        template: 'home',
        onBeforeAction: function() {
            this.subscribe('items');
            //this.subscribe('images'); // uncomment to subscribe to all images
        }
    });
});
