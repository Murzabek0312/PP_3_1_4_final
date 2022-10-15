const url = "http://localhost:8080/admin/"
 const urlForHeader = "http://localhost:8080/admin/header/"
const urlForRoles = "http://localhost:8080/admin/roles"
 const header = document.getElementById('header')
 const headerRoles = document.getElementById('headerRoles')
const usersTable = document.querySelector('#myTab')
const newUsersTable = document.getElementById('home')
const tbody = document.getElementById('data')
const homeTab = document.getElementById('homeTab')

const newUser = document.getElementById('profile')
const username = document.getElementById('createUsername')
const surname = document.getElementById('createSurname')
const age = document.getElementById('createAge')
const password = document.getElementById('createPassword')
const roles = document.getElementById('createRoles')
const createBtn = document.getElementById('createBtn')
const profileTab = document.getElementById('profileTab')


const deleteModal = new bootstrap.Modal(document.getElementById('deleteModal'))
const newDeleteModal = document.getElementById('deleteModal')
const deleteId = document.getElementById('deletedId')
const deleteName = document.getElementById('deleteUsername')
const deleteSurname = document.getElementById('deleteSurname')
const deleteAge = document.getElementById('deleteAge')
const deleteRole = document.getElementById('rolesDelete')
const modelDeleteBtn = document.getElementById('modelDeleteBtn')


const editModal = new bootstrap.Modal(document.getElementById('editModal'))
const newEditModal = document.getElementById('editModal')
const editId = document.getElementById('editId')
const editUsername = document.getElementById('editName')
const editSurname = document.getElementById('editSurname')
const editAge = document.getElementById('editAge')
const editPassword = document.getElementById('editPassword')
const editRole = document.getElementById('editRoles')
const modalEditBtn = document.getElementById('modalEditBtn')
const rolesEdit = document.getElementById('rolesEdit')


const userBtn = document.getElementById('userBtn')   //кнопка слева сверху юзер
const UserPanel = document.getElementById('UserPanel')   //блок информация о новом пользователе
const bodyUserShow = document.getElementById('bodyUserShow') // информация юзера в блоке
const opt1 = document.getElementById('0')

let options = document.getElementById('rolesEdit');
let delOptions = document.getElementById('rolesDelete')

   let res = ''
   const showUserInfo = () => {
    console.log('Зашел1')
    fetch(urlForHeader)
        .then(response => response.json())
        .then(user => {
            res += `
                    <tr>
                    <td>${user.id}</td>
                    <td>${user.username}</td>
                    <td>${user.surname}</td>
                    <td>${user.age}</td>   
                    <td>${user.roles.map(r => r.name)}</td>
                    
                    </tr>`
            console.log(user.username)
            bodyUserShow.innerHTML = res
        })
                
   }
    showUserInfo()
    // UserPanel.show()
// })

function getAuthentication() {
    fetch(urlForHeader)
        .then(response => response.json())
        .then(user => {
            let text = user.username
            let text2 = ' with roles: ' + user.roles.map(r => r.name.replace("ROLE_", ""))
            header.innerHTML = text
            headerRoles.innerHTML = text2
            console.log(user)
        })
}

getAuthentication()

let result = ''
const showUsersTable = () => {
    fetch(url)
        .then(response => response.json())
        .then(users => {
            users.forEach(user => {
                result += `<tr>
                            <td>${user.id}</td>
                            <td>${user.username}</td>
                            <td>${user.surname}</td>
                            <td>${user.age}</td>
                            <td class = 'd-none' >${user.roles.map(r => r.name)}</td>
                            <td><button type="button" class="btnEdit btn btn-primary" 
                                data-bs-toggle="modal" data-bs-target="#editModal">Edit</button></td>
                            <td><button id='btnDel' type="button" class="btnDel btn btn-danger" 
                                data-bs-toggle="modal" data-bs-target="#deleteModal">Delete</button></td>
                                <td class = 'd-none' >${user.password}</td>
                        </tr>`
            })
            tbody.innerHTML = result
        })
}

fetch(url)
    .then(response => response.json())
    .then(data => showUsersTable(data))
    .catch(error => console.log(error))


function getAllRoles2(){
    return fetch(urlForRoles)
    .then((response) => {
        let res = 
        response.json();
                return res;
    })
    .then((roles)=> {
        console.log('all roles:')
        console.log(roles);
        return roles;
    })
}


let roleArray = (options) => {
    let array = []
    if(options.length==1){
    for (let i = 0; i < 1; i++) {
        if (options[i].selected) {
            let role = {id: options[i].value}
            array.push(role)
        }
    }
    return array;}

    if(options.length>=2){
        for (let i = 0; i < 2; i++) {
            if (options[i].selected) {
                let role = {id: options[i].value}
                array.push(role)
            }
        }
        return array;
    }
    else{

        for (let i = 0; i < 2; i++) {
            if (options[i].selected) {
                let role = {id: options[i].value}
                array.push(role)
            }
        }
        return array;
    }
}

const refreshUsersTable = () => {
    fetch(url)
        .then(response => response.json())
        .then(data => {
            result = ''
            showUsersTable(data)
        })
}

const on = (element, event, selector, handler) => {
    element.addEventListener(event, e => {
        if (e.target.closest(selector)) {
            handler(e)
        }
    })
}

// ----------------------------изменение юзера----------
on(document, 'click', '.btnEdit', async e => {
    editModal.show()
    let target = e.target.parentNode.parentNode
    id = target.children[0].innerHTML
    editId.value = target.children[0].innerHTML
    editUsername.value = target.children[1].innerHTML
    editSurname.value = target.children[2].innerHTML
    editAge.value = target.children[3].innerHTML
    editPassword.value = target.children[7].innerHTML
    rolesEdit.value=''


let allRoles = await getAllRoles2();
allRoles.forEach((role)=> {
            let option = 
            document.createElement('option');
                option.setAttribute('value', role.id);
                option.setAttribute('id', role.id);
                option.setAttribute('name', role.name);

                option.appendChild(document.createTextNode(role.name));
                rolesEdit.appendChild(option);
                
})

    roleAr = []
    roleAr.push(target.children[4].innerHTML)
    roleAr = target.children[4].innerHTML.split(',')
    
    let userRoles = [];
    let i = 0;
    roleAr.forEach((role) => userRoles[i++] = role);
    let optionToSelect;
    for(let i = 0; i < rolesEdit.options.length; i++){
        optionToSelect = rolesEdit.options[i];
        userRoles.forEach((ur) => {
            if(optionToSelect.text == ur){
               optionToSelect.selected = true;
            }
        })
    }

})

    

modalEditBtn.addEventListener('click', (e) => {
    e.preventDefault()
    
    let setRoles = roleArray(options)
    fetch(url, {
        method: 'PUT', headers: {'Content-Type': 'application/json'}, body: JSON.stringify({
            id: editId.value,
            username: editUsername.value,
            surname: editSurname.value,
            age: editAge.value,
            password: editPassword.value,
            roles: setRoles
        })
    })
        .then(data => showUsersTable(data))
        .catch(error => console.log(error))
        .then(refreshUsersTable)
        editModal.hide()
})

// -------------------------удаление юзера-------------------
on(document, 'click', '.btnDel', async e => {
    let target = e.target.parentNode.parentNode
    id = target.children[0].innerHTML
    deleteId.value = target.children[0].innerHTML
    deleteName.value = target.children[1].innerHTML
    deleteSurname.value = target.children[2].innerHTML
    deleteAge.value = target.children[3].innerHTML
     deleteRole.value = ' '

     let allRoles = await getAllRoles2();
     allRoles.forEach((role)=> {
                 let option = 
                 document.createElement('option');
                     option.setAttribute('value', role.id);
                     option.setAttribute('id', role.id);
                     option.setAttribute('name', role.name);
     
                     option.appendChild(document.createTextNode(role.name));
                     deleteRole.appendChild(option);
    
     })
     roleAr = []
     roleAr.push(target.children[4].innerHTML)
     roleAr = target.children[4].innerHTML.split(',')
     
     let userRoles = [];
     let i = 0;
     roleAr.forEach((role) => userRoles[i++] = role);
     let optionToSelect;
     for(let i = 0; i < deleteRole.options.length; i++){
         optionToSelect = deleteRole.options[i];
         userRoles.forEach((ur) => {
             if(optionToSelect.text == ur){
                optionToSelect.selected = true;
             }
             
         })
     }
    deleteModal.show()
})

modelDeleteBtn.addEventListener('click', (e) => {
    e.preventDefault()
    fetch(url + `${id}`, {
        method: 'DELETE',
    })
        .then(data => showUsersTable(data))
        .catch(error => console.log(error))
        .then(refreshUsersTable)
        deleteModal.hide()
})

// --------------------добавление юзера===========
// on(document, 'click', '.profileTab', async e => { 
    // e.preventDefault()
    profileTab.addEventListener('click', async e=>{
        e.preventDefault()
        console.log('opened here')
        roles.value = ''
            let i = 0;
            let allRoles = await getAllRoles2();
            allRoles.forEach((role)=> {
                        let option = 
                        document.createElement('option');
                            option.setAttribute('value', role.id);
                            option.setAttribute('id', role.id);
                            option.setAttribute('name', role.name);
                            if(i<2){
                            option.appendChild(document.createTextNode(role.name));
                            roles.appendChild(option);
                            i++;
                            }
                            
            })

    })
  


    createBtn.addEventListener('click', e=>{
        e.preventDefault()

        let options2 = document.getElementById('createRoles');
        let setRoles = roleArray(options2)

    fetch(url, {
        method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify({
            username: username.value,
            surname: surname.value,
            age: age.value,
            password: password.value,
            roles: setRoles
        })
    })
        .then(data => showUsersTable(data))
        .catch(error => console.log(error))
        .then(refreshUsersTable)
        // newUser.show()
        homeTab.click()
    // username.value = ''
    // surname.value = ''
    // age.value = ''
    // password.value = ''
    // roles.value = ''
})


// })


function getRoles(selector) {
    let collection = selector.selectedOptions
    let roles = []
    for (let i = 0; i < collection.length; i++) {
        if (collection[i].value === '2') {
            roles.push({
                id: 2,
                name: 'ROLE_ADMIN'
            })
        } else if (collection[i].value === '1') {
            roles.push({
                id: 1,
                name: 'ROLE_USER'
            })
        }
    }
    return roles
}


