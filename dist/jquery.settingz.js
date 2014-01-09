/*
 *  Create simple html/css settings interface using JSON. - v0.0.1
 *  But it doesn't stop there. Get your
 *  http://xypaul.github.io/settingz.js/
 *
 *  Made by Paul Knittel
 *  Under MIT License
 */
;(function ( $, window, document, undefined ) {



    var pluginName = "settingz",
        dataPlugin = "plugin_" + pluginName, // the name of using in .data()
        incrementId = 0, // used to create the incremental ID
        defaults = {
            data: [{
                title: "Connection Style", // Type whatever name you want
                type: 'radioimg',   // "toggle", "radioimg"(needs plugin to be included)
                var: 'connectionStyle',
                options: [{value: "edgyLine", img: "http://placehold.it/100x100/35d/fff&text=L"},
                       {value: "straightLine", img: "http://placehold.it/100x100/35d/fff&text=J"}]
            }]
        };   // default options

    var privateMethod = function () {
        return "checked"
    };

    // The actual plugin constructor
    var Plugin = function ( element ) {
        // Plugin instantiation
        this.options = $.extend( {}, defaults );
    };

    Plugin.prototype = {

        init: function ( options ) {

            // Simplify common variables
            var o = this.options;
            var e = this.element;

            // Create unique id
            incrementId += 1;
            this.element.data('id', incrementId);
            o.name = o.name + this.element.data('id'); // Add unique ID to the name

            // Extend options
            $.extend(o, options);


            $.each(o.data, function(i,d){

                // Create Heading
                var title = $('<h3>', {
                        'html': d.title
                })

                // Depending on style
                switch (d.type) {
                    case "radioimg":

                        break;
                }





                e.append([title,label])

            });

        },

        destroy: function () {
            // unset Plugin data instance
            this.element.data( dataPlugin, null );
        },

        // public get method
        href: function () {
            return this.element.attr( 'href' );
        }
    }

    /*
     * Plugin wrapper, preventing against multiple instantiations and
     * allowing any public function to be called via the jQuery plugin,
     * e.g. $(element).pluginName('functionName', arg1, arg2, ...)
     */
    $.fn[ pluginName ] = function ( arg ) {

        var args, instance;

        // only allow the plugin to be instantiated once
        if (!( this.data( dataPlugin ) instanceof Plugin )) {

            // if no instance, create one
            this.data( dataPlugin, new Plugin( this ) );
        }

        instance = this.data( dataPlugin );

        instance.element = this;

        // Is the first parameter an object (arg), or was omitted,
        // call Plugin.init( arg )
        if (typeof arg === 'undefined' || typeof arg === 'object') {

            if ( typeof instance['init'] === 'function' ) {
                instance.init( arg );
            }

        // checks that the requested public method exists
        } else if ( typeof arg === 'string' && typeof instance[arg] === 'function' ) {

            // copy arguments & remove function name
            args = Array.prototype.slice.call( arguments, 1 );

            // call the method
            return instance[arg].apply( instance, args );

        } else {

            $.error('Method ' + arg + ' does not exist on jQuery.' + pluginName);

        }
    };

}(jQuery, window, document));