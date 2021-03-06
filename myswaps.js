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

      db.collection('users').doc(user.uid).set({
        name: user.displayName,
        email: user.email
      })

      document.querySelector('.hello').insertAdjacentHTML('beforeend', `
      <div class="block">Hello, ${user.displayName}</div>
      `)
    
      let response = await db.collection('interested').get()
     let interested = response.docs
      for (i = 0; i <interested.length; i++) {
          let interestedId = interested[i].id
          let interestedData = interested[i].data()
          let interestedProduct = interestedData.productName
          let interestedImage = interestedData.productImage
          let interestedPrice = interestedData.productPrice
          let interesteduser = interestedData.userId
          let interestedowner = interestedData.owneremail
          let interestedrequestor = interestedData.requestoremail
          
          if (interesteduser == user.uid){
            document.querySelector('.userspecificrequests').insertAdjacentHTML('beforeend', `
            <div class="bg-white rounded-xl border-2 border-blue-400 pb-4">
            <img src="${interestedImage}" class="block p-4">
            <p class="block px-6 py-2">${interestedProduct}</p>
            <p class="block px-6 py-2">${interestedPrice}</p>
            <p class="block px-6 py-2">Owner: ${interestedowner}</p>
            <button class="delete_request block mx-4 font-semibold text-white px-4 py-2 bg-red-700 rounded-xl shadow-md">Delete</button>
            </div>`)

            document.querySelector('.delete_request').addEventListener('click', async function(event) {
              event.preventDefault()
                await db.collection('interested').doc(interestedId).delete()
              document.location.href = 'myswaps.html'
              })
            
          }
          if (interestedowner == user.email){
            document.querySelector('.requestsreceived').insertAdjacentHTML('beforeend', `
            <div class="bg-white rounded-xl border-2 border-blue-400 pb-4">
            <img src="${interestedImage}" class="block p-4">
            <p class="block px-6 py-2">${interestedProduct}</p>
            <p class="block px-6 py-2">${interestedPrice}</p>
            <p class="block px-6 py-2">Requested by: ${interestedrequestor}</p>
            </div>`)
          }
         

      }  

    } else {
      // Signed out
      console.log('signed out')
      //Hide browse capabilties
      document.querySelector('form').classList.add('hidden')
      document.querySelector('.signed-out-message').insertAdjacentHTML('beforeend', `
      <p class="w-4/5 text-left text-2xl font-bold">Welcome to Furniture Swap. Login to explore furniture available to swap and upload furniture to swap!</p>
      `)
  
      // Initializes FirebaseUI Auth
      let ui = new firebaseui.auth.AuthUI(firebase.auth())
  
      // FirebaseUI configuration
      let authUIConfig = {
        signInOptions: [
          firebase.auth.EmailAuthProvider.PROVIDER_ID
        ],
        signInSuccessUrl: 'myswaps.html'
      }
  
      // Starts FirebaseUI Auth
      ui.start('.sign-in-or-sign-out', authUIConfig)
    }
})