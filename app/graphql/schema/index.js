const { buildSchema } = require("graphql");

module.exports = buildSchema(`
type Book {
    _id:ID!
    title:String!
    publishDate:String!
    bookImage:String!
    description:String!
    price:String!
    category:[String!]
}



type Order {
    _id:ID!
    product:[Book!]!
    trackingNumber:Int!
    buyer:User!
    totalPrice:Int!

}

type User {
    _id:ID!
    name:String!
    Email:String!
    Password:String
    phone:String!
    createdAt:String!
    updatedAt:String!
}


input userInput {
    name:String!
    email:String!
    password:String
    phone:String
}


input orderInput {
    product:[String!]
    trackingNumber:Int!
    buyer:String!
    totalPrice:Int!

}

input bookInput {
    
    title:String!
    publishDate:String!
    bookImage:String!
    price:String!
    description:String!
    category:[String!]
}

type RootQuery {
    books:[Book!]!
    orders:[Order!]!
    users:[User!]!
}
type RootMutation {
    createOrder(order:orderInput):Order
    updateOder(id:ID!, order:orderInput):Order
    deleteOder(id:ID!):Order

    createBook(book:bookInput):Book
    updateBook(id:ID!, book:bookInput):Book
    deleteBook(id:ID!):Book

    CreateUser(user:userInput):User
    updateUser(id:ID!, user:userInput):User
    deleteUser(id:ID!):User

}
schema {
    query:RootQuery
    mutation:RootMutation
}

`);
