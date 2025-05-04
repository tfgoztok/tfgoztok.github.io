function Animal(name, speed) {
    this.name = name;
    this.speed = speed;
  }
  
  Animal.prototype.run = function(speed) {
    this.speed += speed;
    console.log(`${this.name} runs at speed ${this.speed}`);
  };
  
  Animal.compareBySpeed = function(a1, a2) {
    return a1.speed - a2.speed;
  };
  
  function Rabbit(name, speed) {
    Animal.call(this, name, speed);
  }
  
  Rabbit.prototype = Object.create(Animal.prototype);
  Rabbit.prototype.constructor = Rabbit;
  
  Rabbit.prototype.hide = function() {
    console.log(`${this.name} hides`);
  };
  
  const rabbit = new Rabbit("Bunny", 10);
  rabbit.run(5); 
  rabbit.hide();
  
  const animal1 = new Animal("Dog", 20);
  const animal2 = new Animal("Cat", 15);
  console.log(Animal.compareBySpeed(animal1, animal2));