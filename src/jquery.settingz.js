;(function ( $, window, document, undefined ) {



    var pluginName = "settingz",
        dataPlugin = "plugin_" + pluginName, // the name of using in .data()
        incrementId = 0, // used to create the incremental ID
        defaults = {
            name: 'settingz',
            data: [
                {
                    title: "Connection Style", // Type whatever name you want
                    type: 'radioimg',   // "toggle", "radioimg"(needs plugin to be included)
                    var: 'connectionStyle',
                    options: [{value: "edgyLine", img: "http://placehold.it/150x100/35d/fff&text=L"},
                              {value: "straightLine", img: "http://placehold.it/150x100/35d/fff&text=J"}]
                },
                {
                    title: "Color Theme", // Type whatever name you want
                    type: 'radioimg',   // "toggle", "radioimg"(needs plugin to be included)
                    var: 'color',
                    options: [{value: "light", img: "http://placehold.it/150x50/012/"},
                              {value: "soft", img: "http://placehold.it/150x50/683/"},
                              {value: "dark", img: "http://placehold.it/150x50/aae/"}]
                },
                {
                    title: "Orientation", // Type whatever name you want
                    type: 'radioimg',   // "toggle", "radioimg"(needs plugin to be included)
                    var: 'orientation',
                    options: [{value: "top-to-bottom", img: "http://placehold.it/100x100/012/"},
                              {value: "right-to-left", img: "http://placehold.it/100x100/683/"},
                              {value: "bottom-to-top", img: "http://placehold.it/100x100/683/"},
                              {value: "left-to-right", img: "http://placehold.it/100x100/aae/"}]
                }
            ]
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

            // Save data onto the element
            this.element.data('data', o.data);

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
                var content = $('<div>', {
                    class: o.name + i
                });

                // Append dom elements first so you can select and attach new elements later (ie. radioimg plugin)
                e.append([title,content])


                switch (d.type) {
                    case "radioimg":
                        console.log('radioimg', "with data", d.options)
                        $('.' + o.name + i).radioimg({data: d.options})
                        break;
                }







            });

        },

        destroy: function () {
            // unset Plugin data instance
            this.element.data( dataPlugin, null );
        },

        // public get method
        results: function () {
            console.log(this.element);

            var e = this.element;

            var data = e.data('data');


            var results = {};
            e.find('div').each(function(i,d){
                results[data[i].var] = $(d).find("input[type='radio']:checked").val()
            })

            return results
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