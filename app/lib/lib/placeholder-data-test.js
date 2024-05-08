let products = [
    {
        discType: 'putter',
        name:'name1',
        speed: '1',
        color: 'green',
        weight:'6',
        price: '3',
        image: '/hero-desktop.png'
    },
    {
        discType: 'mid-range',
        name:'name2',
        speed: '12',
        color: 'blue',
        weight:'9',
        price: '134',
        image: '/ventures/BlueDisc1.Webp'
    },
    
    {
        discType: 'driver',
        name:'name3',
        speed: '6',
        color: 'yellow',
        weight:'7',
        price: '15.56',
        image: '/ventures/BlueDisc1.Webp'
    },
    {
        discType: 'driver',
        name:'name4',
        speed: '6',
        color: 'yellow',
        weight:'7',
        price: '15.56',
        image: '/ventures/'
    },
    {
        discType: 'mid-range',
        name:'name5',
        speed: '6',
        color: 'yellow',
        weight:'7',
        price: '15.56',
        image: '/ventures/'
    },
    {
        discType: 'mid-range',
        name:'name6',
        speed: '6',
        color: 'yellow',
        weight:'7',
        price: '15.56',
        image: '/ventures/'
    },
    {
        discType: 'mid-range',
        name:'name7',
        speed: '6',
        color: 'yellow',
        weight:'7',
        price: '15.56',
        image: '/ventures/'
    },
    {
        discType: 'mid-range',
        name:'name8',
        speed: '6',
        color: 'yellow',
        weight:'7',
        price: '15.56',
        image: '/ventures/'
    },
    {
        discType: 'mid-range',
        name:'name4',
        speed: '6',
        color: 'yellow',
        weight:'7',
        price: '15.56',
        image: '/ventures/'
    },
    {
        discType: 'mid-range',
        name:'name9',
        speed: '6',
        color: 'yellow',
        weight:'7',
        price: '15.56',
        image: '/ventures/'
    },
    {
        discType: 'mid-range',
        name:'name10',
        speed: '6',
        color: 'yellow',
        weight:'7',
        price: '15.56',
        image: '/ventures/'
    },
    {
        discType: 'mid-range',
        name:'name11',
        speed: '6',
        color: 'yellow',
        weight:'7',
        price: '15.56',
        image: '/ventures/'
    },
    
    ]

    function addListing(newListing) {
        products.push(newListing);
    }


    module.exports = {products, addListing}