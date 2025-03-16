// class Dog {

//   SOUND="Wow";

//   constructor(name="Bobby"){
//     this.name = name;
//     this.speak();
//   }

//   speak(){
//     console.log(`${this.SOUND} from ${this.name}`);
//   }
// };

// a1 = new Dog();
// a2 = new Dog("Blueberry");

// a3 = {
//   SOUND: 'Wow',
//   name: 'Bobby',
//   speak(){
//     console.log(`${this.SOUND} ${this.name}`)
//   }
// };
// a3.speak();

function Dog(name='Bobby'){
  this.SOUND = 'Wow';
  this.name = name;
  
  this.speak = () => {
    console.log(`${this.SOUND} ${this.name}`)
  };

  this.speak();
}

a4 = new Dog();
a5 = new Dog("Blueberry");