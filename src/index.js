var url = 'https://api.edamam.com/search?q=tomato&app_id=cc72277f&app_key=fd7b3902835e935b09f511a64f8c7068';
    params = {
        method: 'GET'
    };     
 
var request = new Request( url, params );
 
fetch( request )
  .then( r => r.json() )
  .then( data => console.dir( data ) )
  .catch( e => console.error( 'Something went wrong' ) );