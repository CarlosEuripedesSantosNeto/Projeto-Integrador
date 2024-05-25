document.addEventListener("DOMContentLoaded", () => {
    const profilePicInput = document.getElementById("profilePicInput");
    const uploadProfilePicBtn = document.getElementById("uploadProfilePicBtn");
    const profilePic = document.getElementById("profilePic");
  
    uploadProfilePicBtn.addEventListener("click", () => {
      const file = profilePicInput.files[0];
      if (file) {
        uploadProfilePic(file);
      } else {
        alert("Por favor, selecione uma imagem primeiro.");
      }
    });
  
    function uploadProfilePic(file) {
      const userId = firebase.auth().currentUser.uid;
      const storageRef = firebase.storage().ref();
      const profilePicRef = storageRef.child(`profilePics/${userId}.jpg`);
  
      profilePicRef.put(file).then(() => {
        profilePicRef.getDownloadURL().then((url) => {
          profilePic.src = url;
  
          // Atualiza a URL da foto de perfil no banco de dados
          firebase.database().ref(`users/${userId}/profilePicUrl`).set(url);
        });
      }).catch((error) => {
        console.error("Erro ao fazer upload da imagem: ", error);
      });
    }
  
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        const userId = user.uid;
  
        firebase.database().ref(`users/${userId}/profilePicUrl`).once('value').then((snapshot) => {
          const profilePicUrl = snapshot.val();
          if (profilePicUrl) {
            profilePic.src = profilePicUrl;
          }
        });
      }
    });
  });
  