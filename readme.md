# express-views-namespaces

Switch between express's views directories using namespaces

[GITGUB](https://github.com/Gami-404/express-views-namespaces)


## Using 

### Main setting 
    ```
       var app = require('express')();
       var namespace = require('express-views-namespaces');
       
       // Activte  namespaceing 
       namespace(app);
       
       // Add namespace
       app.namespaceView('namespace', viewsPath);
       
       
    ```
### Routing 
    ```
      app.get('/test', function (req, res, next) {
          
          // using  view's path which has namespace
          res.render('namespace::index');
      });
       
       
    ```
    
## TESTED
    ** This test with ejs and hbs view engine **
## License

The express-views-namespaces package licensed under the [MIT license](https://opensource.org/licenses/MIT).
