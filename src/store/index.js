import { createStore } from 'vuex'
import {
  getFirestore,
  collection,
  query,
  // getDocs,
  orderBy,
  doc,
  addDoc,
  deleteDoc,
  // updateDoc,
  onSnapshot
} from 'firebase/firestore';
import firebaseApp from '../firebaseConfig.js'

let db = getFirestore(firebaseApp)

export default createStore({
  state: {
    users: undefined
  },
  getters: {
  },
  mutations: {
    SET_USERS(state, users) {
      state.users = users
    },
    DEL_USERS(state, id) {
      let index = state.users.findIndex(user => user.id == id)
      console.log(index)
      state.users.splice(index, 1)
    }
  },
  actions: {
    setUsers({ commit }) {
      try {
        let users = []
        let usersRef = collection(db, 'users')
        const queryData = query(usersRef, orderBy('name', 'asc'))
        // let firstLoad = true;
        onSnapshot(queryData, (snapshot) => {
          snapshot.docChanges().forEach((change) => {
            let dataChange = change.doc.data();
            if (change.type == 'added') {
              console.log(`Se ha agregado el usuario ${dataChange.name}`);
            } else if (change.type == 'modified') {
              console.log(`Se ha modificado el usuario ${dataChange.name}`);
            } else if (change.type == "removed") {
              console.log(`Se ha eliminado el usuario ${dataChange.name}`);
              commit('DEL_USERS', change.doc.id)
            }
          })
          // firstLoad = false;
          users = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
          commit('SET_USERS', users)
        });
      } catch (error) {
        console.log(error)
      }
    },
    async addUser(context, newUser) {
      try {
        // let db = getFirestore(firebaseApp);
        let userRef = collection(db, 'users')
        let user = {
          name: newUser.name,
          mail: newUser.mail,
          username: newUser.username,
        }
        await addDoc(userRef, user);
        return true
      } catch (error) {
        console.log(error)
        return false
      }
    },
    async delUser(context, userID) {
      try {
        console.log("Datos: ", userID)
        let confirmDel = confirm("Desea eliminar el usuario: " + userID + "?");
        if (!confirmDel) {
          return
        }
        const usersRef = doc(db, 'users', userID)
        await deleteDoc(usersRef)
        alert("Usuario eliminado correctamente.")
      } catch (error) {
        console.log(error)
        alert("Error al intentar eliminar el usuario.")
      }
    },
    // preUpdateUser(userID) {
    //   let { id, name, mail, username } = this.users.find(user => user.id == userID);
    //   this.editUser = { id, name, mail, username };
    // },
    // async updateUser() {
    //   try {
    //     // let db = getFirestore(firebaseApp);
    //     let userRef = doc(db, 'users', this.editUser.id);
    //     await updateDoc(userRef, {
    //       name: this.editUser.name,
    //       mail: this.editUser.mail,
    //       username: this.editUser.username
    //     });
    //     alert('Usuario editado correctamente.');
    //     this.editUser = {
    //       id: '',
    //       name: '',
    //       mail: '',
    //       username: ''
    //     }
    //     this.updateModal.hide();
    //   } catch (error) {
    //     console.log(error);
    //     alert('Error al intentar editar el usuario.')
    //   }
    // }
  },
  modules: {
  }
})
