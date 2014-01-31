var httpGet = function(theUrl)
{
    var xmlHttp = null;

    xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", theUrl, false );
    xmlHttp.send( null );
    return xmlHttp.responseText;
};

var data = jQuery.parseJSON(httpGet("https://api.github.com/users/RichardLitt/repos"));
console.log(data);

var data = _.pluck(data, "name");


rivets.bind(document, {
  controller: data
})

console.log(data);

// var issues = jQuery.parseJSON(httpGet("https://api.github.com/issues"));
// console.log(issues);