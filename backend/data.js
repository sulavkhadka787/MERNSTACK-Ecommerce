import bcrypt from 'bcryptjs';

const data={
    users:[
        {
            name:'Sulav',
            email:'sulav@gmail.com',
            password:bcrypt.hashSync('1234',8),
            isAdmin:true
        },
        {
            name:'John',
            email:'john@gmail.com',
            password:bcrypt.hashSync('1234',8),
            isAdmin:false
        }
    ],
    products:[
        {
            name:'Women\'s T-shirt',
            category:'Shirts',
            image:'/images/tshirt1.jpg',
            price:40,
            brand:'Nike',
            rating:4.5,
            numReviews:150,
            description:'Available in all sizes',
            countInStock:10

        },
        {
            name:'Men\'s T-shirt',
            category:'Shirts',
            image:'/images/mentshirt.jpg',
            price:40,
            brand:'Nike',
            rating:4.5,
            numReviews:150,
            description:'Available in all sizes',
            countInStock:10

        },
        {
            name:'Women\'s Jeans',
            category:'Jeans',
            image:'/images/jeans.jpg',
            price:60,
            brand:'Wrangler',
            rating:4.0,
            numReviews:120,
            description:'Available in blue ,black and white',
            countInStock:10
        },
        {
            name:'Men\'s Jeans',
            category:'Jeans',
            image:'/images/menjeans.jpg',
            price:70,
            brand:'Levi\'s',
            rating:4.5,
            numReviews:170,
            description:'Available in blue and black',
            countInStock:10

        },
        {
            name:'Women\'s Hoody',
            category:'Hoody',
            image:'/images/womenhoody.jpg',
            price:90,
            brand:'Adidas',
            rating:3.5,
            numReviews:57,
            description:'Available in all large and medium size',
            countInStock:0

        },
        {
            name:'Men\'s Jacket',
            category:'Jacket',
            image:'/images/menshirt.jpg',
            price:170,
            brand:'Denim',
            rating:4.5,
            numReviews:60,
            description:'Available in all black and Khaki color',
            countInStock:10

        }
    ]
}

export default data;