const urlForHeader = "http://localhost:8080/admin/header/"
const header = document.getElementById('header')
 const headerRoles = document.getElementById('headerRoles')


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
            body.innerHTML = res
        })
                
   }
    showUserInfo()