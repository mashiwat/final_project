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
    
      let interested = await db.collection('interested').get()
     // let interested = querySnapshot.docs

    document.querySelector('.userspecificrequests').insertAdjacentHTML('beforeend', `
    <div class="bg-white rounded-xl border-2 border-blue-400 pb-4">
    <img src="${interested.productImage}" class="block p-4">
    <p class="block px-6 py-2">${interested.productName}</p>
    <p class="block px-6 py-2">${interested.productPrice}</p>
    </div>`)

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
        signInSuccessUrl: 'myswaps.html'
      }
  
      // Starts FirebaseUI Auth
      ui.start('.sign-in-or-sign-out', authUIConfig)
    }
})