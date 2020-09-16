export const getPhoto = (rover, sol, camera) =>
    fetch(`https://api.nasa.gov/mars-photos/api/v1/rovers/${rover}/photos?sol=${sol}&camera=${camera}&api_key=CMmKidrraZtZG62lBQz4zbQYziw1sAKfufDdZBC8`)
        .then((resp) => resp.json()
        )
        .then((data) => obj = data.photos
        )
        .then(()=>console.log(obj))

var obj