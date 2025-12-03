//LEVEL: EASY

// Implement a function compute amount such that it adds the numbers passed to it as shown below and .value() returns the output.
// Eg:
// computeAmount().lacs(15).crore(5).crore(2).lacs(20).thousand(45).crore(7).value()
// Expected output: 143545000

var computeAmount = () => ({
    total: 0,
    value: function() {
        console.log(this.total);
    },
    thousand: function (n) {
        this.total += n * Math.pow(10, 3);
        return this
    },
    lacs: function (n) {
        this.total += n * Math.pow(10, 5);
        return this
    },
    crore: function (n) {
        this.total += n * Math.pow(10, 7);
        return this
    },
})

//testcases
computeAmount().lacs(15).crore(5).crore(2).lacs(20).thousand(45).crore(7).value() //143545000