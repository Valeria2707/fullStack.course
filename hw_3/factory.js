class Transport {
  ride() {
    console.log(`Riding a ${this.constructor.name}`);
  }

  stop() {
    console.log(`Stopping the ${this.constructor.name}`);
  }
}

class Car extends Transport {
  playMusic() {
    console.log("Playing music in the car.");
  }
}

class Bike extends Transport {
  ringBell() {
    console.log("Ringing the bike bell.");
  }
}

class TransportFactory {
  createTransport(options) {
    if (options.vehicleType === "car") {
      return new Car();
    } else if (options.vehicleType === "bike") {
      return new Bike();
    }
  }
}

const factory = new TransportFactory();

const myCar = factory.createTransport({ vehicleType: "car" });
myCar.ride();
myCar.playMusic();
myCar.stop();

const myBike = factory.createTransport({ vehicleType: "bike" });
myBike.ride();
myBike.ringBell();
myBike.stop();