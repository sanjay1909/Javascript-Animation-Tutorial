var a = Object.create(null);
console.log(a);

var b = {
    id: 42,
    name: 'sanjay'
};
console.log(b);

var c = ['sanjay'];
console.log(c);

function entity(id, name) {
    this.id = id;
    this.name = name;
}

console.log(entity);
console.log(new entity());
