//오름지도
window.initMap = function () {
  const map1 = new google.maps.Map(document.getElementById("map1"), {
    center: {
      lat: 33.4426234,
      lng: 126.537055
    },
    zoom: 10,

  });
  //    let marker = new google.maps.Marker({position: {lat:33.4426234,lng:126.537055}, map: map});
  fetch("https://api.odcloud.kr/api/15096996/v1/uddi:6738a90c-ec96-4245-a187-9528cea62904?page=1&perPage=30&serviceKey=9llzYCL8YbC8lWXtECA%2BJnP3bstFGvI2%2Bp9PEqwH5FLw05ZcSF6JtRjsUQvr7ScQhG5yqowpLUJMeLviQZozVw%3D%3D")
    .then((r) => r.json())
    .then(data => {
      // console.log(data.data[0])
      // initMap(data) 
      let pos = data.data
      const infowindow = new google.maps.InfoWindow();

      for (let i = 0; i < pos.length; i++) {
        // console.log(pos[i].경도);
        let 오름명 = pos[i].오름명
        let 설명 = pos[i].설명
        let 위도 = Number(pos[i].위도)
        let 경도 = Number(pos[i].경도)

        new google.maps.Circle({
          strokeColor: "blue",
          strokeOpacity: 0.8,
          strokeWeight: 2,
          fillColor: "blue",
          fillOpacity: 0.35,
          map1,
          center: {
            lat: 위도,
            lng: 경도
          },
          radius: 600,
        });

        let marker = new google.maps.Marker({
          position: {
            lat: 위도,
            lng: 경도
          },
          map: map1
        })

        marker.addListener("click", () => {
          map1.panTo(marker.position);
          const info = document.querySelector('.info')
          const explain = `${오름명} : ${설명}`
          info.innerText = explain
          infowindow.setContent(explain);
          infowindow.open({
            anchor: marker,
            map1,
          });
        });
      }
    })
    //올레길 지도
    const map2 = new google.maps.Map(document.getElementById("map2"), {
      center: {
        lat: 33.4426234,
        lng: 126.537055
      },
      zoom: 10,
  
    });
    //    let marker = new google.maps.Marker({position: {lat:33.4426234,lng:126.537055}, map: map});
    fetch("https://open.jejudatahub.net/api/proxy/1Daaa177batDba8b8t711D17D18atDa7/_j1bt091bjrt__71r00_et0ebep_01rc")
      .then((r) => r.json())
      .then(data => {
        console.log(data.data);
        let ollehPos = data.data;
        const infowindow = new google.maps.InfoWindow();

        for(let i = 0; i<ollehPos.length;i++){
          let 길이름 = ollehPos[i].courseNumber;
          let 코스이름 = ollehPos[i].courseName;
          let 시작위도 = ollehPos[i].startLatitude
          let 시작경도 = ollehPos[i].startLongitude
          let 시작지점 = ollehPos[i].startPoint
          let 도착지점 = ollehPos[i].endPoint


          let marker = new google.maps.Marker({
            position: {
              lat: 시작위도,
              lng: 시작경도
            },
            map: map2
          })
          marker.addListener("click", () => {
            map2.panTo(marker.position);

            const info = document.querySelector('.info')
            const explain = `${길이름} : ${코스이름} `
            info.innerText= explain +  ` \n 코스 :  ${시작지점}~${도착지점}`;
            infowindow.setContent(explain);
            infowindow.open({
              anchor: marker,
              map2,
            });
          })
        }
      })
      const map3 = new google.maps.Map(document.getElementById("map3"), {
        center: {
          lat: 33.24591,
          lng: 126.56396,
        },
        zoom: 15,
    
      });
     
      fetch("https://open.jejudatahub.net/api/proxy/11D8at1abba0ttaDa8t8atta01188t81/_j1bt091bjrt__71r00_et0ebep_01rc")
        .then((r) => r.json())
        .then(data => {
          console.log(data.data)
          let giftPos = data.data;
          const infowindow = new google.maps.InfoWindow();

          for(let i = 0; i<giftPos.length;i++){
            let 가게이름 = giftPos[i].placeName;
            let 코스이름 = giftPos[i].courseName;
            let 위도 = giftPos[i].latitude
            let 경도 = giftPos[i].longitude
            let 주소 = giftPos[i].addressDoro
            let url = giftPos[i].placeUrl
  
  
            let marker = new google.maps.Marker({
              position: {
                lat: 위도,
                lng: 경도
              },
              map: map3
            })
            marker.addListener("click", () => {
              map3.panTo(marker.position);

              const info = document.querySelector('.info')
              const explain = `${가게이름} `
              
              info.innerText= `${explain} : ${주소} \n <a href="${url}">${url}</a>`;
              infowindow.setContent(explain);
              infowindow.open({
                anchor: marker,
                map3,
              });
            })
          }
        })
  };

  const tab = document.querySelector('.tab')
  const oruemTab = tab.querySelector('.oruem')
  const ollehTab = tab.querySelector('.olleh')
  const giftTab = tab.querySelector('.gift')

  const oruemMap = document.getElementById('map1')
  const ollehMap = document.getElementById('map2')
  const giftMap = document.getElementById('map3')

  oruemTab.addEventListener('click',()=>{
    oruemTab.classList.add('click')
    oruemMap.classList.add('click')
    ollehTab.classList.remove('click')
    ollehMap.classList.remove('click')
    giftTab.classList.remove('click')
    giftMap.classList.remove('click')
  })

  ollehTab.addEventListener('click',()=>{
    ollehTab.classList.add('click')
    ollehMap.classList.add('click')
    oruemTab.classList.remove('click')
    oruemMap.classList.remove('click')
    giftTab.classList.remove('click')
    giftMap.classList.remove('click')
  })

  giftTab.addEventListener('click',()=>{
    giftTab.classList.add('click')
    giftMap.classList.add('click')
    oruemTab.classList.remove('click')
    oruemMap.classList.remove('click')
    ollehTab.classList.remove('click')
    ollehMap.classList.remove('click')
  })