import { useEffect, useState } from 'react'
import axios from 'axios'
import BaseUrl from "../Api/BaseUrl";

export default function useFetch(query, pageNumber) {
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    const [listPost, setList] = useState([])
    const [hasMore, setHasMore] = useState(false)
    const [queryPost, setQuery] = useState(query)
    const [pageNumberPost, SetPage] = useState(pageNumber)

    const loadMore = (query,page)=>{
        setQuery(query)
        SetPage(page)
    }

    useEffect(() => {
        setList([])
    }, [query])

    useEffect(() => {
        setLoading(true)
        setError(false)
        axios({
            method: 'GET',
            url: BaseUrl+'/api/v2/users/me/posts?page='+pageNumberPost+'&count='+queryPost,
            headers: {
                Accept: 'application/json',
                authsessiontoken: localStorage.getItem('token'),
                'Content-Type': 'application/json',
            },
        }).then(res => {
            setList(prevList => {
                return [...new Set([...prevList, ...res.data])]
            })
            setHasMore(res.data.length > 0)
            setLoading(false)
        }).catch(e => {
            setError(true)
        })
    }, [queryPost, pageNumberPost])

    return { loading, error, listPost, hasMore, loadMore}
}
