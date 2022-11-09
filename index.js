window.initMap = function () {
    const map = new google.maps.Map(document.getElementById("map"), {
      center: { lat: 33.4426234, lng: 126.537055 },
      zoom: 10,
      
    });
//    let marker = new google.maps.Marker({position: {lat:33.4426234,lng:126.537055}, map: map});
    fetch("https://api.odcloud.kr/api/15096996/v1/uddi:6738a90c-ec96-4245-a187-9528cea62904?page=1&perPage=90&serviceKey=9llzYCL8YbC8lWXtECA%2BJnP3bstFGvI2%2Bp9PEqwH5FLw05ZcSF6JtRjsUQvr7ScQhG5yqowpLUJMeLviQZozVw%3D%3D")
    .then((r) => r.json())
    .then(data => {
        console.log(data.data[0])
        // initMap(data) 
        let pos = data.data
        
        for(let i = 0;i<pos.length;i++){
            // console.log(pos[i].경도);
        let 오름명 = pos[i].오름명
        let 설명 = pos[i].설명
        let 위도 = Number(pos[i].위도)
        let 경도 = Number(pos[i].경도)

        let marker = new google.maps.Marker({position: {lat:위도,lng:경도}, map: map})
        const infowindow = new google.maps.InfoWindow();
        marker.addListener("click", () => {
            map.panTo(marker.position);
            const explain = `${오름명} : ${설명}`
            infowindow.setContent(explain);
            infowindow.open({
              anchor: marker,
              map,
            });
          });
    }
    }
    )
  };



