describe('Prueba de la API', () => {
  it('Debería crear un usuario y luego autenticarlo', () => {
    const userData = {
      username: 'testUser4',
      email: 'cypress@test.cy',
      password: 'cypresspassword'
    };
  
    cy.request('POST', 'http://localhost:3002/api/user', userData)
      .then((response) => {
        expect(response.status).to.eq(201);
        
        cy.request('POST', 'http://localhost:3002/api/auth', userData)
          .then((loginResponse) => {
            expect(loginResponse.status).to.eq(200);
          });
      });
  });
});


