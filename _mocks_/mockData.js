const mockData = {
     authResponse: {
         token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ODYyMTIsImlhdCI6MTYxODA0MTk2MSwiZXhwIjoxNjE4MTI4MzYxfQ.TRWyRNZNbQQmS-rcYS6X7w0KCrZa5qTnEiiPcAKqFJE",
         user: { name: 'karthik', email: 'karthikkncs14@gmail.com' },
         status: 200
     },
     loginData: {
         email:"karthikkncs14@gmail.com",
         password:"123456",
     },
     invalidData: {
         email:"karthikkncs@gmail.com",
         password:"123456",
     },
     signUpData: {
         email:"karthikkncs14@gmail"+Date.now()+".com",
         password:"123456",
         name: "karthik"
     },
     signUpDataSample: {
         email:"karthikkncs14@gmail.com",
         password:"123456",
         name: "karthik"
     }
}
 export default mockData;
