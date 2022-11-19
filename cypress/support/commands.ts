import { User } from "../utils/user";

Cypress.Commands.add('register', (user: User) => {
    cy.request({
        method: 'POST',
        url: 'http://localhost:4001/users/signup',
        body: user
    })
})

Cypress.Commands.add('login', (username: string, password: string) => {
    cy.request({
        method: 'POST',
        url: 'http://localhost:4001/users/signin',
        body: {
            username: username,
            password: password
        }
    }).then((resp) => {
        localStorage.setItem('user', JSON.stringify(resp.body))
        return resp.body.token
    })
})

Cypress.Commands.add('deleteUser', (username: string, token: string) => {
    cy.request({
        method: 'DELETE',
        url: `http://localhost:4001/users/${username}`,
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
})
