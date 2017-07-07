import graphene
import meals.mutations
import meals.queries


class Query(meals.queries.Query, graphene.ObjectType):
    pass

schema = graphene.Schema(query=Query, mutation=meals.mutations.Mutations)