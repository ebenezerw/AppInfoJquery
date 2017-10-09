$(document).ready(() => {

// listen for keypress - need to fix this to only listen for ENTER key (key 13)
  $("#search").on("click", () => {

// pass input value to variable, format, and pass to another variable. Need to update input field to have drop downs for Android or iOS apps
    var searchType = $('input[name=searchType]:checked').val()+"=";
    var input = $("#appid").val()
    var newData = input.split(" ").join(',');

    // console.log(newData)

// api call - will update to pull Android and iOS apps from single API. 448999087 com.thechive.Chive
    var url = "https://itunes.apple.com/lookup?"+searchType+newData
    // var url = "http://api.searchman.io/v1/ios/us/apps?appIds="+newData+"&apiKey=c9f83085f98870d234ddeaec234c235f"
    $.ajax({
      type: 'GET',
      dataType: 'json',
      url: url
    }).done((response) => {

// pass response to variable and loop through each object and display in UI
      var apps = response.results
      $(apps).each(function (index, value) {
        $("table").append(
          "<tr>" +
              "<td>" + "<img src="+value.artworkUrl60+">" + "</td>" +
              "<td>" + "<a href="+value.trackViewUrl+">" + value.trackName  + "</a>" + "</td>" +
              "<td>" + value.sellerName + "</td>" +
              "<td>" + value.bundleId + "</td>" +
              "<td>" + value.trackId + "</td>" +
              "<td>" + value.genres + "</td>" +
              "<td>" + value.currentVersionReleaseDate.slice(0,-10) + "</td>" +
              "<td>" + value.averageUserRating + "</td>" +
              "<td>" + value.trackContentRating + "</td>" +
              // "<td>" + "<a href="+value.trackViewUrl+">" + "Click Here" + "</a>" + "</td>" +
          "</tr>"
        )
      })
      $("a").attr('target','_blank');
      $('#appid').val(" ");
    }).fail((response) => {
      swal("Error", "Please verify that the data entered corresponds with your 'Search by' selection", "error");
      console.log("Ajax get request failed.");
    })
  })

  var currentdate = new Date();
    var datetime = "App_Search_" + currentdate.getDate() + "."
                + (currentdate.getMonth()+1)  + "."
                + currentdate.getFullYear() + "-"
                + currentdate.getHours() + ":"
                + currentdate.getMinutes();

  $("#download").on("click", () => {

    $("table").tableExport({
      formats: ['xlsx'],
      filename: datetime,
      exportButtons: true,
      ignoreCols: 0
    });

  })

})
