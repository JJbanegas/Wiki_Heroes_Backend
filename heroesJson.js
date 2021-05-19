/* esta hecho para introducir los datos en la base de datos, para luego poder trabajar con ellos. 
No le gusta que le haga un post desde el postman*/ 

db.books.insert([
    {
      heroName: 'Captain America',
      realName: 'Steven',
      lastName: 'Rogers',
      birthDate: '', // No se como maneja Mongo los datos tipo Date
      universe: 'Marvel Cinematic Universe', 
      firstAppearance: 'Captain America Comics #1',
      age: '102 years old',
      powers: 'enhanced strentgh',
      achievments: 'Defeted Hydra'
    }
])