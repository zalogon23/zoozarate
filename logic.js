class Animal {
  name;
  animalSound;
  image;

  constructor(name, animalSound, image) {
    this.name = name;
    this.animalSound = animalSound;
    this.image = image;
  }

  speak(input) {
    const words = input.match(/\b[^\s]+\b/ig); //no spaces before nor after
    return [...words, ""].join(` ${this.animalSound} `);
  }
}

const animals = [
  new Animal("Lion", "rawr", "https://cdna.artstation.com/p/assets/images/images/004/155/762/large/jonas-roscinas-final.jpg?1480889774"),
  new Animal("Hipo", "gulp", "https://i.pinimg.com/736x/cc/2f/87/cc2f87054611b9e3a6cfc91c31caa178.jpg"),
  new Animal("Giraffe", "hmm", "https://preview.free3d.com/img/2014/02/1868293048916510149/c80zsajv-900.jpg"),
  new Animal("Rhino", "puff", "https://cdnb.artstation.com/p/assets/images/images/026/630/421/large/jake-lunt-davies-uncle-rhino-paint-02.jpg?1589296499"),
]

document.addEventListener("click", (e) => {
  if (e.target.classList.contains("picked-image")) showClickedImage(e);
  if (e.target.classList.contains("speak-button")) speak();
})
document.addEventListener("keydown", (e) => {
  if (e.target.classList.contains("picked") && e.key === "Enter") showClickedImage(e);
  if (e.target.classList.contains("content") && e.key === "Enter") speak();
})

//After the animals declaration and even listeners the program can start

render(); // Ther render is separated so it could be extended to re-render when new animals are added
setup();

function render() {
  const picker = document.querySelector(".picker");
  picker.innerHTML = "";

  animals.forEach(animal => {
    const button = document.createElement("button");
    button.classList.add("picked", animal.name.toLowerCase());

    const image = document.createElement("img");
    image.src = animal.image;

    image.classList.add("picked-image", animal.name.toLowerCase());

    button.append(image);
    picker.append(button);
  })
}

function setup() {
  document.querySelector(".picked-image").click();
}

function speak() {
  const previousModal = document.querySelector(".modal");
  if (previousModal) previousModal.remove();

  const content = document.querySelector(".content").value;
  if (!content.length) return;

  const animalName = Array.from(document.querySelector(".card").classList).find(attr => attr !== "card");
  if (!animalName) return;

  const animal = animals.find(anim => anim.name.toLowerCase() === animalName);
  if (!animal) return;

  const message = animal.speak(content);

  const modal = document.createElement("div");
  modal.classList.add("modal");
  modal.innerHTML = message;

  document.body.append(modal);

  setTimeout(() => modal.remove(), 5000);
}

function showClickedImage(e) {

  const stand = document.querySelector(".stand");
  const animalName = Array.from(e.target.classList).find(attr => attr !== "picked-image" && attr !== "picked");

  const previousCard = document.querySelector(".card");
  if (previousCard) {
    const previousAnimal = Array.from(previousCard.classList).find(attr => attr !== "card")
    if (previousAnimal === animalName) return;
  }

  const animal = animals.find(anim => anim.name.toLowerCase() === animalName);

  const animalCard = document.createElement("div");
  animalCard.classList.add("card", animalName);

  const animalImage = document.createElement("img");
  animalImage.src = animal.image;
  animalImage.classList.add("card-image");

  animalCard.append(animalImage);

  stand.innerHTML = "";
  stand.append(animalCard);
}