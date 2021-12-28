const graphql = require('graphql');
const _ = require('lodash');
const User = require('../model/user');
const { GraphQLObjectType, GraphQLNonNull ,GraphQLList, GraphQLString, GraphQLSchema , GraphQLID,GraphQLInt} = graphql;

const userType = new GraphQLObjectType({
    name: 'users',
    fields: ( ) => ({
        id: {type: GraphQLID},
        userId: {type: GraphQLString}
    })
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        user: {
            type: userType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args){
                // code to get data from db / other source
                //return _.find(books, { id: args.id });
                return User.findById(args.id);
            }
        },
        users:{
            type:new GraphQLList(userType),
            resolve(parents,args){
                //return books
                return User.find({});
            }
        },
    }
});
const Mutation=new GraphQLObjectType({
    name:'Mutation',
    fields:{
        addUser:{
            type:userType,
            args:{
                userId:{type:new GraphQLNonNull(GraphQLString)}
            },
            resolve(parent,args){
                let user1 = new User({
                    userId:args.userId,
                });
                /*vr=user1.userId;
                console.log(vr);*/
               return user1.save()
            }
        }
    }
})
module.exports = new GraphQLSchema({query: RootQuery,mutation:Mutation});