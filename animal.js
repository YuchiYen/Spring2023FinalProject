  class Animal {
    constructor(animal) {
      this.name = animal.name;
      this.age = animal.age;
      this.address1 = animal.contact.address.address1;
      this.address2 = animal.contact.address.address2;
      this.city = animal.contact.address.city;
      this.state = animal.contact.address.state;
      this.postcode = animal.contact.address.postcode;
      this.phone = animal.contact.phone;
      this.email = animal.contact.email;
      this.id = animal.id;
      this.photo = animal.photos.length > 0 ? animal.photos[0].medium: "na.jpg";      
      this.breedsPrimary = animal.breeds.primary;
      this.url = animal.url;

    }
    BuildDiv() {
        let div = document.createElement("div");
        // div.classList.add("");
        div.innerHTML = `
            <div class="eachAnimal" >
            <div class="left">
            <a href="${this.url}" target="_blank"><img class="" src="${
              this.photo
            }"></a>
          </div>
            <div class="right">
              <h4>Name: ${this.name}(${this.age})</h4><br/>
              Breed: ${this.breedsPrimary}<br/>
              ${this.address1 ? `${this.address1}}` : " " } <br/>
              ${this.city} ${this.state} ${this.postcode}
              <ul class="">
              <li class="">Phone: ${this.phone}</li>
              ${
                this.email
                  ? `<li class="">Email: ${this.email}</li>`
                  : ' '
              }
            <li class="">Shelter ID:${this.id}</li>
              </ul>
            </div>

            </div>
            `;

            console.log(div);       
        document.querySelector("#searchResult").appendChild(div);
        
    }
  }
  