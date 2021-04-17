const { gql } = require('apollo-server')
const dbWorks = require('../dbWorks.js')

const typeDefs = gql`
    union Given = Equipment | Supply
`
const resolvers = {
    //Query가 추가되면 _queries의 RootQuery에도 추가 되어야 한다.
    Query: {
        givens: (parent, args) => {
            return [
                ...dbWorks.getEquipments(args),
                ...dbWorks.getSupplies(args)
            ]
        }
    },
    Given: {
        __resolveType(given, context, info) {
            if (given.used_by) {
                return 'Equipment'
            }
            if (given.team) {
                return 'Supply'
            }
            return null
        }
    }
}
module.exports = {
    typeDefs: typeDefs,
    resolvers: resolvers
}