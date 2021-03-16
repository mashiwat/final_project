let firebase = require('./firebase')

exports.handler = async function(event) {
  let db = firebase.firestore()
  let furnituresData = []

  let furnituresQuery = await db.collection('furniture')
                               .get()
  let furnitures = furnituresQuery.docs


//loop through firebase data collection furniture
for (let i=0; i<furnitures.length; i++) {
  
  let furnitureId = furnitures[i].id
  let furnitureData = furnitures[i].data()
  let furniturePrice = furnitureData.price
  let furnitureName = furnitureData.productName
  let furnitureImage = furnitureData.link
  let furnitureUser = furnitureData.userId  
  let furnitureUseremail = furnitureData.useremail  
  

  //add new furniture
  furnituresData.push({
    id: furnitureId,
    imageUrl: furnitureImage,
    price: furniturePrice,
    product: furnitureName,
    username: furnitureUser,
    useremail: furnitureUseremail
  })
}
  return {
    statusCode: 200,
    body: JSON.stringify(furnituresData)
  }
}






