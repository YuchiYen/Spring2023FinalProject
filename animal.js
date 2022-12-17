


  class Animal {
    constructor(pet) {
      this.name = pet.name;
      this.age = pet.age;
    }
    BuildDiv() {
        
        const results = document.querySelector("#results");
        const div = document.createElement("div");
        div.classList.add("card", "card-body", "mb-3");
        div.innerHTML = `
            <div class="row" >
            <div class="col-sm-6">
              <h4>${pet.name}(${pet.age})</h4>
              <p class="text-secondary">${pet.breeds.primary}</p>
              ${pet.contact.address.address1 ? `<p>${pet.contact.address.address1}}</p>` : " " }
              <p>${pet.contact.address.city} ${pet.contact.address.state} ${pet.contact.address.postcode}</p>
              <ul class="list-group">
              <li class="list-group-item">Phone: ${pet.contact.phone}</li>
              ${
                pet.contact.email
                  ? `<li class="list-group-item">Email: ${pet.contact.email}</li>`
                  : ' '
              }
            <li class="list-group-item">Shelter ID:${pet.id}</li>
              </ul>
            </div>
            <div class="col-sm-6 text-center">
              <img class="img-fluid rounded-circle mt-2" src="${
                pet.photos[0].medium
              }">
            </div>
            </div>
            `;
        results.appendChild(div);
        
    }
  }
  
  let myCar = new Car("Ford", 2014);
  document.getElementById("demo").innerHTML =
  "My car is " + myCar.age() + " years old.";


