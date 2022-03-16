
	mapboxgl.accessToken = 'pk.eyJ1IjoibmF2eWExMDk5IiwiYSI6ImNrejgyM3ZubjEwN3AycHFuaXMwM3dpZzQifQ.Y8L6ip9d8LdBPlcYfkDOBA';
    const map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [-90.486052, 39.830348],
        zoom: 5
    });

const csvUrl = "https://raw.githubusercontent.com/navya1099/test/main/FinalCountydata.csv";


let hoveredStateId = null;

    map.on('load', function() {
        map.resize();
        
        // csvPromise.then(function (results) {
        //     console.log(results.data);
        //     results.data.forEach((row) => {
              map.setFeatureState(
                {
                  //YOUR TURN: Replace with your source tileset and source layer
                  source: "county",
                  sourceLayer: "county-fill",
                  
                }
        //         //YOUR TURN: Add rows you want to style/interact with
        //         {
        //           deviceD: row.DevDef,
        //           intInsuf: row.Intinsuf,
        //           digitalDis: row.DigDis
        //         }
        );
            
              
    

        map.addSource('county', {
            'type': 'geojson',
            'data': "https://raw.githubusercontent.com/navya1099/test/main/geojson",               
            'generateId': true
        });
        

    map.addLayer({
        'id': 'county-fill',
        'type': 'fill',
        'source': 'county',
        'layout': {},
        'paint': {
        'fill-color': '#627BC1',
        'fill-opacity': [
        'case',
        ['boolean', ['feature-state', 'hover'], false],
            1,
            0.5
        ]  
        }
     });
 
    map.addLayer({
            'id': 'countyBound',
            'type': 'line',
            'source': 'county',
            'layout': {
                'line-join': 'round',
                'line-cap': 'butt'
            },
            'paint': {
                'line-color': '#88 ',
                'line-width': 1
            }
    });


    // var popup = new mapboxgl.Popup({
    //     closeButton: false,
    //     closeOnClick: false,
    //   });

    //   map.on("mousemove", "ca-district-fill", function (e) {
    //     map.getCanvas().style.cursor = "pointer";

    //     var district = map.queryRenderedFeatures(e.point, {
    //       layers: ["ca-district-fill"],
    //     });

    //     var props = district[0].properties;

    //     var state = district[0].state;

    //     var content = "<b>" + "District Details" + "</b>" + "<br>";
    //     content += "Representative: " + state.candidate + "<br>";
    //     content += "District: " + props.CD116FP + "<br>";
    //     popup.setLngLat(e.lngLat).setHTML(content).addTo(map);
    //   });

    //   map.on("mouseleave", "county-fill", function () {
    //     map.getCanvas().style.cursor = "";
    //     popup.remove();
    //   });



    map.on("mousemove", "county-fill", function(e) {
        map.getCanvas().style.cursor = 'pointer';
        if (e.features.length > 0) {
            if (hoveredStateId) {
                map.setFeatureState({source: 'county', id: hoveredStateId}, { hover: false});
            }
            console.log(e.features[0].id)
            hoveredStateId = e.features[0].id;
            map.setFeatureState({source: 'county', id: hoveredStateId}, { hover: true});  
            const cName = e.features[0].properties.name;
            var popup = new mapboxgl.Popup()
            
            .setHTML(cName)
            .addTo(map);    
        }
        
    });

    map.on("mouseleave", "county-fill", function() {
        map.getCanvas().style.cursor = '';
        if (hoveredStateId) {
            map.setFeatureState({source: 'county', id: hoveredStateId}, { hover: false});
        }
        hoveredStateId =  null;
    });
});
