(function() {

  StackMob.init({
    appName: "travelators",
    clientSubdomain: "johanyepeshotmailcom",
    publicKey: "020d2fd5-8466-4cec-8c08-44ff1bd03d43",
    apiVersion: 0
  });
  
  var Lugar = StackMob.Model.extend({ schemaName: 'lugar'});
  var comentario = StackMob.Model.extend({ schemaName: 'comentario'});

    cargarComentarios();

  $('#enviar').click(function(e) {
    e.preventDefault();

    var sitio = $('#sitio').val();
    var descripcion = $('#descripcion').val();
    var distancia = $('#distancia').val();
    var puntuacion = $('#puntuacion').val();
    
    
    
    var entry = new Lugar({sitio:sitio, descripcion:descripcion, distancia:distancia, puntuacion:puntuacion,})
    entry.create({
        success: function(model) {
            var files = $('#imagen')[0].files;
    
            for (var i = 0, f; f = files[i]; i++) {
         
              var reader = new FileReader();
         
              // Closure to capture the file information
              reader.onload = (function(theFile) {
                return function(e) {
         
                  var base64Content = e.target.result.substring(e.target.result.indexOf(',') + 1, e.target.result.length);
                  var fileName = theFile.name;
                  var fileType = theFile.type;
                   
                  model.setBinaryFile('imagen', fileName, fileType, base64Content);
                  model.save();
                };
              })(f);
         
              // Read in the file as a data URL
              fileContent = reader.readAsDataURL(f);
         
            }
        },
        error: function(model, response) {
            console.log(response);
        } 
        
      });
    
    console.log("exito");
  });


    $('#comentario').click(function(e) {
    e.preventDefault();

    var opinion = $('#opinion').val();
    var nombre =  $('#nombre').val();
    
    var entry = new comentario({opinion:opinion, nombre:nombre})
    entry.create({
        success: function(model) {
            cargarComentarios();
        }
    })
    
   
    
    console.log("¡bien!")

  });
  
  function cargarComentarios() {
              
    var comment = new comentario();

    comment.fetch({
        success: function(model) {
          var opiniones = model.toJSON();
          var container = $('#comentarios');
          $.each(opiniones, function(ix, opinion) {
              
              container.append("<p class='well well-small colorcito'>" + '<strong>' + opinion.nombre + '</strong>' + "<br>" + opinion.opinion + "</p>");
              
          });
        },
        error: function(mode, response) {
            console.log(response);
        }
    });
  }
  
  
    
    
    
    
    

})();


