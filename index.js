const merge = require('utils-merge');

module.exports = function (app, _options) {
    // Default options values
    var _options = _options || {};
    _options.separator = _options.separator || '::';
    _options.global = _options.global || 'views-namespaces';


    // Default namespaces
    var namespaces = app.get(_options.global);
    if (namespaces) {
        if (!Array.isArray(namespaces)) {
            namespaces = [namespaces];
            app.set(_options.global, namespaces);
        }
    } else {
        namespaces = [];
        app.set(_options.global, namespaces);
    }


    /**
     * Override of app.render function
     * @param name
     * @param options
     * @param callback
     * @type {any}
     */
    app.render = function (name, options, callback) {
        var cache = app.cache;
        var done = callback;
        var engines = app.engines;
        var opts = options;
        var renderOptions = {};
        var view;

        // support callback function as second arg
        if (typeof options === 'function') {
            done = options;
            opts = {};
        }

        // merge app.locals
        merge(renderOptions, app.locals);

        // merge options._locals
        if (opts._locals) {
            merge(renderOptions, opts._locals);
        }

        // merge options
        merge(renderOptions, opts);

        // set .cache unless explicitly provided
        if (renderOptions.cache == null) {
            renderOptions.cache = app.enabled('view cache');
        }

        // primed cache
        if (renderOptions.cache) {
            view = cache[name];
        }

        var result;
        var root = app.get('views');

        if (result = name.match((new RegExp('^(\\w+)' + _options.separator)))) {
            name = (name.substring(result[0].length));
            root = getRoot(app, _options, result[1])
        }
        // view
        if (!view) {
            var View = app.get('view');
            view = new View(name, {
                defaultEngine: app.get('view engine'),
                root: root,
                engines: engines
            });
            if (!view.path) {
                var dirs = Array.isArray(view.root) && view.root.length > 1
                    ? 'directories "' + view.root.slice(0, -1).join('", "') + '" or "' + view.root[view.root.length - 1] + '"'
                    : 'directory "' + view.root + '"';
                var err = new Error('Failed to lookup view "' + name + '" in views ' + dirs);
                err.view = view;
                return done(err);
            }

            // prime the cache
            if (renderOptions.cache) {
                cache[name] = view;
            }
        }
        // render
        options.settings = app.settings;
        try {
            view.render(renderOptions, callback);
        } catch (err) {
            callback(err);
        }
    }.bind(app)

    /**
     * Add Namespace
     * @param name
     * @param path
     */
    app.namespaceView = function (name, path) {
        app.get(_options.global).push(`${name} ${path}`);
    }.bind(app);

};

/**
 * Get Current root base of namespace
 * @param app
 * @param options
 * @param name
 */
function getRoot(app, options, name) {

    var namespaces = app.get(options.global);
    // search
    return namespaces.find(function (view) {
        return view.split(' ')[0] == name;
    }).split(' ')[1];
}
