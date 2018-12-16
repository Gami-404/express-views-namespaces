# express-views-namespaces

You can switch between express's views directories using namespaces easily, 

[GITHUB](https://github.com/Gami-404/express-views-namespaces)


## Documentation 
### 1-Install
  
        npm i express-views-namespaces

### 2- Add plugin to application

    
       var express = require('express');
       var namespace = require('express-views-namespaces');
       
       var app=express()
       // Activte  namespaceing 
       namespace(app[,options]);
       ...
       ...
       ...
       
#### options default values
    {
        "separator":"::", // namespace's separator
        "global":"views-namespaces" // application setting 
            
     } 

    
### Add namespace
       // Add namespace
       
       var viewPath= path.join(__dirname,'/anydirectory/views')
       app.namespaceView('mynamespace', viewsPath);
   
### Render using namespace 
   
      app.get('/test', function (req, res, next) {
          
          // using  view's path which has namespace
          res.render('mynamespace::index');
      });

## Author

For any question [abdulrhmangaml@gmail.com](mailto:abdulrhmangaml@gmail.com)
:)

## License

The express-views-namespaces package licensed under the [MIT license](https://opensource.org/licenses/MIT).
