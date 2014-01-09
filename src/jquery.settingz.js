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
            ],
            defaults: {
                connectionStyle: "edgyLine",
                color: "soft",
                orientation: "left-to-right"
            }
        };

    var createRadioImg = function (container, uniqueID, options) {
            $.each(options.options, function(i,d){

                // Create input box
                 var input = $('<input>', {
                        'type': 'radio',
                        'name': uniqueID,
                        'id': uniqueID + i,
                        'value': d.value
                })

                // Create label with img
                var label = $('<label>', {
                        'for': uniqueID + i,
                        'html': $('<img>', {
                                    src: d.img
                        })
                })

                // By default select the first one
                if (i == 0) input.prop("checked", true);

                // Append items to the dom
                container.append([input,label])
            });
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
            this.element.data('options', o);

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

                var uniqueID = o.name + i

                // Depending on style
                var container = $('<div>', {
                    class: [uniqueID, d.type].join(" ")
                });




                switch (d.type) {
                    case "radioimg":
                        createRadioImg(container, uniqueID, d)
                        break;
                }


                // Append dom elements first so you can select
                e.append([title,container])





            });

            return e;

        },

        destroy: function () {
            // unset Plugin data instance
            this.element.data( dataPlugin, null );
        },


        results: function () {

            // Make life easy
            var e = this.element;
            var data = e.data('options').data;

            // Build the results array
            var results = {};
            e.find('div').each(function(i,d){

                // Depending on type use different technique to get the value
                switch (data[i].type) {
                    case "radioimg":
                        results[data[i].var] = $(d).find("input[type='radio']:checked").val();
                        break;
                }

            })

            return results;
        },

        setDefault: function(defaultInput){

            // Make life easy
            var e = this.element;
            var options = e.data('options');

            // Check if default is provided otherwise fallback onto old settings
            var d = (typeof defaultInput === "undefined") ? options.defaults : defaultInput;

            // Loop through defaults and try and find a match in data.var
            $.each(d, function(key, value){
                // Find match for key

                console.log(key)
                $.each(options.data, function(i, a){

                    if (a.var == key) {

                        $(e.find('div')[i]).find('input[value=' + value + ']').prop('checked', true);
                    }
                })
            })

            return e;

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