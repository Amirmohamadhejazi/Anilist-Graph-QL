/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import { useQuery } from '@tanstack/react-query'

import CartMovie from '@molecules/cartMovie/cartMovie'

import { getAllAnimeQueryFn } from '@core/services/api/allAnime-api'

type TItemsAnime = {
    coverImage: { large: string }
    description: string
    id: number
    siteUrl: string
    title: { english: string; native: string }
}
const LandingTemplate = () => {
    const { data, error, isError, isLoading, isSuccess }: any = useQuery({
        queryKey: ['AnimeData'],
        queryFn: getAllAnimeQueryFn
    })

    if (isLoading) {
        return '.... loading'
    }
    if (isError) {
        return error.message
    }
    if (isSuccess) {
        const dataPage: TItemsAnime[] = data.data.data['Page']['media']
        console.log(dataPage)

        return (
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mx-14 my-5'>
                {dataPage.map((items) => (
                    <CartMovie data={items} key={items.id} />
                ))}
            </div>
        )
    }
}

export { LandingTemplate }
