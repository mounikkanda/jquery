var noimage;
function searchmovies(){
	var input = $("#input-search").val();
    $(".result").empty();
    input != '' ?
	 
    $.ajax({
    	url: "http://www.omdbapi.com/?s="+input,
    	dataType: "json",
    	cache: false,
    	success: function(data){
            if(data.Error){
                $(".error").each( function(){
                    alert("oops....movie not there");
                });
            }
    		$.each(data.Search, function(key,value){
                if(value.poster=='N/A'){
                    noimage="image not found";

                }
                var tabs =$(".result");
                data.Search.sort(function(i,j){
                    return j.Year-i.Year;
                });
    			// console.log(value);
                var finalResult  ={
                    dataSource :data.Search,
                    pageSize :5,
                    callback: function (response,pagination){
                        var final =" ";
                        $.each(response,function (index,value){
                            final += "<div class='well'>"+
                                        "<div  class='row'>"+
                                            "<div class='col-md-6'><img class='thumbnail' src="+value.Poster+"/></div>"+
                                             "<div class='col-md-6'>"+
                                               "<h4> Movie Title :"+value.Title+"</h4>"+
                                               "<ul class='list-group'>"+
                                               "<li class='list-group-item'>Release Year:"+value.Year+"</li>"+
                                               "<li class='list-group-item'>Movie Id: "+value.imdbID+"</li>"+
                                               "</ul>"+
                                               '<a class =" btn btn-primary" href=http://www.imdb.com/title/'+value.imdbID+'> IMDB Info</a>'+
                                             "</div>"+


                                         "</div>"+
                                    "</div>"
                        });
                        tabs.prev().html(final);

                    }

                };
                tabs.pagination(finalResult);
            });
        }.bind(this),
        error:function(err){
            console.log(err);
        }.bind(this)
    }): $(".error").html('<div class="alert alert-danger">'+
    'please enter a movie name'+ '</div>');
}

              // // * $(".result").append("<div class='well'>"+
              //                           "<div  class='row'>"+
              //                               "<div class='col-md-6'><img class='thumbnail' src="+value.Poster+"/></div>"+
              //                                "<div class='col-md-6'>"+
              //                                  "<h4> Movie Title :"+value.Title+"</h4>"+
              //                                  "<ul class='list-group'>"+
              //                                  "<li class='list-group-item'>Release Year:"+value.Year+"</li>"+
              //                                  "<li class='list-group-item'>Movie Id: "+value.imdbID+"</li>"+
              //                                  "</ul>"+
              //                                  '<a class =" btn btn-primary" href=http://www.imdb.com/title/'+value.imdbID+'> IMDB Info</a>'+S
              //                                "</div>"+


              //                            "</div>"+
              //                       "</div>"
              //                           );//*

