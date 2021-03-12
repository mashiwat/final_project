
let db = firebase.firestore()

firebase.auth().onAuthStateChanged(async function(user) {
    if (user) {
      // Signed in
      console.log('signed in')
      document.querySelector('.sign-in-or-sign-out').innerHTML = `
        <button class="text-blue-500 underline sign-out">Sign Out</button>
      `
      document.querySelector('.sign-out').addEventListener('click', function(event) {
        console.log('sign out clicked')
        firebase.auth().signOut()
        document.location.href = 'browse.html'
      })
      //render furniture from firestore
      // let response = await fetch('/.netlify/functions/get_furniture')
      // let furnitures = await response.json()
      // for (let i=0; i<furnitures.length;i++){
      //   let furniture = furnitures[i]
      //   renderFurniture(furniture)
      db.collection('users').doc(user.uid).set({
        name: user.displayName,
        email: user.email
      })

      document.querySelector('.hello').insertAdjacentHTML('beforeend', `
      <div class="block">Hello, ${user.displayName}</div>
      `)

      let querySnapshot = await db.collection('furniture').get()
      let furnitures = querySnapshot.docs

       // loop through the returned data


      for (let i=0; i<furnitures.length; i++) {
  
        let furnitureId = furnitures[i].id
        let furnitureData = furnitures[i].data()
        let furniturePrice = furnitureData.price
        let furnitureName = furnitureData.productName
        let furnitureImage = furnitureData.link

        document.querySelector('.furnitures').insertAdjacentHTML('beforeend', `
        <div class="bg-white rounded-xl border-2 border-blue-400 pb-4">
        <img src="${furnitureImage}" class="block p-4">
        <p class="block font-semibold px-6">${furnitureName}</p>
        <p class="block px-6 py-2">${furniturePrice}</p>
        <button class="furniture-${furnitureId}-${user.uid} inline-block font-semibold text-white mx-4 px-4 py-2 bg-blue-800 rounded-xl">Add to interest list</button>
        </div>
        `)

        document.querySelector(`.furniture-${furnitureId}-${user.uid}`).addEventListener('click', async function(event) {
          event.preventDefault()
          console.log (`.furniture-${furnitureId} was clicked by ${user.uid}`)
         await db.collection('interested').add({
           owneremail: furnitureData.useremail,
           productID: furnitureId,
           productName: furnitureData.productName,
           productImage: furnitureData.link,
           productPrice: furnitureData.price,
           requestoremail: user.email,
           userId: user.uid
         })
        })
      


      }

    } else {
      // Signed out
      console.log('signed out')
      //Hide browse capabilties
      document.querySelector
  
      // Initializes FirebaseUI Auth
      let ui = new firebaseui.auth.AuthUI(firebase.auth())
  
      // FirebaseUI configuration
      let authUIConfig = {
        signInOptions: [
          firebase.auth.EmailAuthProvider.PROVIDER_ID
        ],
        signInSuccessUrl: 'browse.html'
      }
  
      // Starts FirebaseUI Auth
      ui.start('.sign-in-or-sign-out', authUIConfig)
    }
  })
  // async function renderFurniture(furniture) {
  //     let furnitureId = furniture.id
  //     document.querySelector('.furnitures').insertAdjacentHTML('beforeend', `
  //     <div class="post-${furnitureId} bg-white rounded-xl border-2 border-blue-400 pb-4">
  //     <img src="${furniture.link}" class="block p-4">
  //     <p class="block font-semibold px-6">${furniture.productName}</p>
  //     <p class="block px-6 py-2">${furniture.price}</p>
  //     <button class="inline-block font-semibold text-white mx-4 px-4 py-2 bg-blue-800 rounded-xl">SWAP!</button>
  // </div>
  //     `)
  // }
  