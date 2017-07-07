import graphene
import meals.schema


class Query(meals.schema.Query, graphene.ObjectType):
    pass


schema = graphene.Schema(query=Query, mutation=meals.schema.Mutations)