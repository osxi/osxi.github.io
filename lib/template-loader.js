function getTemplate(path) {
  return $.ajax({
    url: 'templates/' + path + '.handlebars',
    cache: true,
    async: false
  });
}
