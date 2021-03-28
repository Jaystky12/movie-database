import { onError } from 'apollo-link-error'
import { getNewToken } from './GetNewToken'
import { setContext } from 'apollo-link-context'
import { fromPromise, Observable } from 'apollo-link'

const promiseToObservable = (promiseFunc: any) =>
  new Observable((subscriber: any) => {
    promiseFunc.then(
      (value: any) => {
        if (subscriber.closed) return
        subscriber.next(value)
        subscriber.complete()
      },
      (err: any) => subscriber.error(err)
    )
    return subscriber // this line can removed, as per next comment
  })

export const errorLink = onError(({ graphQLErrors, networkError, operation, forward }) => {
  if (graphQLErrors) {
    for (let err of graphQLErrors) {
      switch (err.extensions.code) {
        case 'UNAUTHENTICATED':
          return promiseToObservable(getNewToken()).flatMap((token: string) => {
            console.log(token)
            localStorage.setItem('token', token)
            const oldHeaders = operation.getContext().headers
            operation.setContext({
              headers: {
                ...oldHeaders,
                Authorization: token ? `bearer ${token}` : ''
              }
            })
            return forward(operation)
          })
      }
    }
  }
})

export const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('token')
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      Authorization: token ? `bearer ${token}` : ''
    }
  }
})
