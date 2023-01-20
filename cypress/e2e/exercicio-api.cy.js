/// <reference types="cypress" />
import contrato from '../e2e/contracts/users.contract'
import { faker } from '@faker-js/faker';

describe('Testes da Funcionalidade Usuários', () => {

     it('Deve validar contrato de usuários', () => {
          cy.request('usuarios').then(response => {
               return contrato.validateAsync(response.body)
          })
     });

     it('Deve listar usuários cadastrados', () => {
          cy.request('usuarios').then(response => {
               expect(response.status).equal(200)
               expect(response.body.quantidade).to.be.greaterThan(0)
          })
     });

     it('Deve cadastrar um usuário com sucesso', () => {
          cy.cadastrarUsuario(faker.name.firstName(), faker.internet.email(), faker.internet.password()).then(response => {
               expect(response.body.message).contain('Cadastro realizado com sucesso')
               expect(response.status).equal(201)
          })
     });

     it('Deve validar um usuário com email inválido', () => {
          cy.cadastrarUsuario(faker.name.firstName(), 'A.com.br', faker.internet.password())
               .then(response => {
                    expect(response.body.email).contain('email deve ser um email válido')
                    expect(response.status).equal(400)
               })
     });

     it('Deve editar um usuário previamente cadastrado', () => {
          let id, nome, email, pass
          cy.cadastrarUsuario(faker.name.firstName(), faker.internet.email(), faker.internet.password()).then(responseCad => {
               id = responseCad.body._id
               cy.buscarUsuario(id).then(responseEdit => {

                    nome = responseEdit.body.nome
                    email = faker.internet.email()
                    pass = responseEdit.body.password
                    cy.editarUsuario(id, nome, email, pass).then(response => {
                         expect(response.status).equal(200)
                         expect(response.body.message).contain('Registro alterado com sucesso')
                    })
               })
          })
     });

     it('Deve deletar um usuário previamente cadastrado', () => {
          let id
          cy.cadastrarUsuario(faker.name.firstName(), faker.internet.email(), faker.internet.password()).then(responseCad => {
               id = responseCad.body._id
               cy.deletarUsuario(id).then(response => {
                    expect(response.status).equal(200)
                    expect(response.body.message).contain('Registro excluído com sucesso')
               })
          })
     });
});
