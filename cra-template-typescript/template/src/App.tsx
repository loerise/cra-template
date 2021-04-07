import React, { useEffect } from 'react'

import { RootContext } from './libs/context'
import { useRequestLoading } from './libs/hook'
import { app } from './libs/reducer'
import { jsonplaceholder } from './libs/service'

function App(): React.ReactElement {
  const postsLoading = useRequestLoading(jsonplaceholder.getAllPosts)
  const postLoading = useRequestLoading(jsonplaceholder.getPostsById)

  useEffect(() => {
    app.getAllPosts().subscribe((steam: unknown) => {
      console.log(steam)
    })
  }, [])

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    jsonplaceholder.getPostsById(1).subscribe(() => {})
  }, [])

  return (
    <RootContext.Provider value={{}}>
      <div className="flex justify-center items-center content-center flex-wrap h-screen bg-gray-100 text-white">
        <div className="w-full text-5xl text-center text-blue-800">HELLO EVERYONE</div>
        <div className="w-full mt-2 text-xl text-center text-gray-400">This is a custom cra template from loerise</div>
        <div className="w-full text-center text-gray-400">{postsLoading ? 'posts loading' : 'posts loaded'}</div>
        <div className="w-full text-center text-gray-400">{postLoading ? 'post loading' : 'post loaded'}</div>
      </div>
    </RootContext.Provider>
  )
}

export default App
