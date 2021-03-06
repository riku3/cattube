(function(jQuery) {
    var searchTerm = '猫 かわいい 子猫';
    getRequest(searchTerm);
  
  function getRequest(searchTerm){
      var params = {
        "q": searchTerm,
        "part": 'snippet',
        "maxResults": '50',
        "order": 'viewCount',
        "type": 'video',
        "videoEmbeddable": true,
        "fields": 'nextPageToken,items(id(videoId),snippet(title,channelTitle,publishedAt,thumbnails(high(url))))',
        "key": 'AIzaSyBbXBs8EDxfHpmERAqPTa6GOU5PcWpQzXk'
      }
      url = 'https://www.googleapis.com/youtube/v3/search';
    
      jQuery.getJSON(url, params, function(data){
        var results = data.items;
        var pageToken = data.nextPageToken;
  
        var params = {
          "pageToken": pageToken,
          "q": searchTerm,
          "part": 'snippet',
          "maxResults": '50',
          "order": 'viewCount',
          "type": 'video',
          "videoEmbeddable": true,
          "fields": 'nextPageToken,items(id(videoId),snippet(title,channelTitle,publishedAt,thumbnails(high(url))))',
          "key": 'AIzaSyDwaBmLa0FISGnYce9vASXS0k-z99IpVMo'
        }
  
        jQuery.getJSON(url, params, function(data){
          jQuery.each(data.items, function(index,value){
            results.push(value);
          })
          var pageToken = data.nextPageToken;
          var params = {
            "pageToken": pageToken,
            "q": searchTerm,
            "part": 'snippet',
            "maxResults": '50',
            "order": 'viewCount',
            "type": 'video',
            "videoEmbeddable": true,
            "fields": 'items(id(videoId),snippet(title,channelTitle,publishedAt,thumbnails(high(url))))',
            "key": 'AIzaSyDTSJ7dw4DMq-WsCV9_sEUovYjk_5fSRKI'
          }
          
          jQuery.getJSON(url, params, function(data){
            jQuery.each(data.items, function(index,value){
              results.push(value);
            })
            showResults(results);
          })
        })
       })
    }
  
  function showResults(results){
    var html = "";
  
    jQuery.each(results, function(index,value){
      html += 
        '<div class="item large-4 medium-6 columns grid-medium popular-selection" id="popular-page-' + index + '">' +
            '<div class="post thumb-border">' +
                '<div class="post-thumb">' +
                    '<div class="yt">' +
                        '<div class="yt_video" youtube="https://www.youtube.com/embed/' + value.id.videoId + '?rel=0&showinfo=0&autoplay=1">' + '<img src="' + value.snippet.thumbnails.high.url + '">' + '</div>' +
                    '</div>' +
                    '<div class="video-stats clearfix">' +
                        '<div class="thumb-stats pull-left">' +
                            '<i class="fas fa-paw"></i>' +
                            '</div>' +
                    '</div>' +
                '</div>' +
            '</div>' +
            '<div class="post-des">' +
                '<h6>'+ value.snippet.title +'</h6>' +
                '<div class="post-stats clearfix">' +
                    '<p align="justify">' +
                        '<i class="fa fa-user"></i>' +
                        '<small>'+ value.snippet.channelTitle +'</small>' +
                        '<br>' +
                        '<i class="fa fa-clock-o"></i>' +
                        '<small>'+ value.snippet.publishedAt.substr(0,10) +'</small>' +
                    '</p>' +
                    // '<p class="pull-left">' +
                    //     '<i class="fa fa-eye"></i>' +
                    //     '<span>1,862K</span>' +
                    // '</p>' +
                '</div>' +
                // '<div class="post-summary">' +
                //     '<p>'+ value.snippet.description +'</p>' +
                // '</div>' +
            '</div>' +
        '</div>';
      console.log(value.snippet.thumbnails.high.url);
      console.log(value);
    })
    jQuery('#popular-videos').html(html);
  }
})(jQuery);
