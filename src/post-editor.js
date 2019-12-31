import React, {useState} from 'react'
import {Redirect} from 'react-router'

import {savePost} from './api'

function Editor({user}) {
  const [isSaving, setIsSaving] = useState(false)
  const [redirect, setRedirect] = useState(false)

  const handleSubmit = e => {
    e.preventDefault()
    setIsSaving(true)

    const {title, content, tags} = e.target.elements
    const newPost = {
      title: title.value,
      content: content.value,
      tags: tags.value.split(',').map(t => t.trim()),
      authorId: user.id,
      date: new Date().toISOString(),
    }
    savePost(newPost).then(() => setRedirect(true))
  }

  if (redirect) {
    return <Redirect to="/" />
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="title-input">Title</label>
      <input name="title" id="title-input" />

      <label htmlFor="content-input">Content</label>
      <input name="content" id="content-input" />

      <label htmlFor="tags-input">Tags</label>
      <input name="tags" id="tags-input" />

      <button type="submit" disabled={isSaving}>
        Submit
      </button>
    </form>
  )
}

export {Editor}
