function getTemplateAjax(path, callback) {
  var source;
  var template;

  $.ajax({
    url: path,
      success: function(data) {
        source    = data;
        template  = Handlebars.compile(source);

        // execute the callback if passed
        // if (callback) callback(template);

        return template;
      },
      failure: function(err) {
        console.error('Could not load template: ' + err);
        // Unneccessary undefined for legibility
        return;
      }
  });
}
