import Link from 'next/link'
import React from 'react'

const PageTitle = ({title, btn=false, path}: {title: string, btn?: boolean, path?: string}) => {
  return (
    <div className="p-5 bg-bgLightSecondary dark:bg-bgDarkSecondary rounded-md flex items-center justify-between">
        <h1 className="text-2xl font-semibold"> {title} </h1>
        { btn && <Link href={`/dashboard/${path}`} className="btn">Add New</Link> }
    </div>
  )
}

export default PageTitle
