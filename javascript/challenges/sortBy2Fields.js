//LEVEL: EASY

//Sort an array of objects by 2 fields in order of precedence
//i.e. if highest precedence field (eg. price fields in below example) is equal sort by 2nd highest precedence field (h_id below)

var homes = [
  { h_id: 3, city: "Dallas", state: "TX", zip: "75201", price: 2162500 },
  { h_id: 7, city: "Dallas", state: "TX", zip: "75201", price: 2162500 },
  { h_id: 4, city: "Dallas", state: "TX", zip: "75201", price: 2162500 },
  { h_id: 5, city: "Bevery Hills", state: "CA", zip: "90210", price: 319250 },
  { h_id: 9, city: "Bevery Hills", state: "CA", zip: "90210", price: 319250 },
  { h_id: 1, city: "Bevery Hills", state: "CA", zip: "90210", price: 319250 },
  { h_id: 6, city: "Dallas", state: "TX", zip: "75000", price: 556699 },
  { h_id: 5, city: "New York", state: "NY", zip: "00010", price: 962500 },
];

homes.sort((a, b) => {
  if (a.price == b.price) {
    return a.h_id - b.h_id;
  }
  return a.price - b.price;
});

console.log(homes);
