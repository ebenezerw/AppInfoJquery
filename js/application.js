$(document).ready(() => {
  $("#appid").on("keypress", () => {
    var input = $("#appid").val()
    var newData = input.split(" ").join(',');
    // console.log(newData)
    var url = "https://itunes.apple.com/lookup?id="+newData
    // var url = "https://itunes.apple.com/lookup?bundleId="+newData
    $.ajax({
      type: 'GET',
      dataType: 'json',
      url: url
    }).done((response) => {
      var apps = response.results
      $(apps).each(function (index, value) {
        $("a").attr('target','_blank');
        $("table").append(
          "<tr>" +
              "<td>" + value.sellerName + "</td>" +
              "<td>" + value.trackName + "</td>" +
              "<td>" + value.bundleId + "</td>" +
              "<td>" + value.trackId + "</td>" +
              "<td>" + value.currentVersionReleaseDate.slice(0,-10) + "</td>" +
              "<td>" + value.averageUserRating + "</td>" +
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
