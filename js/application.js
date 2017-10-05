$(document).ready(() => {

// listen for keypress - need to fix this to only listen for ENTER key (key 13)
  $("#appid").on("keypress", () => {

// pass input value to variable, format, and pass to another variable. Need to update input field to have drop downs for Android or iOS apps
    var input = $("#appid").val()
    var newData = input.split(" ").join(',');
    // console.log(newData)

// api call - will update to pull Android and iOS apps from single API.
    // var url = "https://itunes.apple.com/lookup?id="+newData
    var url = "https://itunes.apple.com/lookup?bundleId="+newData
    $.ajax({
      type: 'GET',
      dataType: 'json',
      url: url
    }).done((response) => {

// pass response to variable and loop through each object and display in UI
      var apps = response.results
      $(apps).each(function (index, value) {
        $("a").attr('target','_blank');
        $("table").append(
          "<tr>" +
              "<td>" + value.sellerName + "</td>" +
              "<td>" + value.trackName + "</td>" +
              "<td>" + value.bundleId + "</td>" +
              "<td>" + value.trackId + "</td>" +
              "<td>" + value.genres + "</td>" +
              "<td>" + value.currentVersionReleaseDate.slice(0,-10) + "</td>" +
              "<td>" + value.averageUserRating + "</td>" +
              "<td>" + value.trackContentRating + "</td>" +
              "<td>" + "<a href="+value.trackViewUrl+">" + "Click Here" + "</a>" + "</td>" +
          "</tr>"
        )
      })
      $('#appid').val(" ");
    }).fail((response) => {
      console.log("Ajax get request failed.");
    })
  })
})
