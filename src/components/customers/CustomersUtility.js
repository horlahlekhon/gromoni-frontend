import React from 'react';

// const [searchResult,] = useState([])

// export const paging = {persistSelectedOnPageChange: false, persistSelectedOnSort: false}

//     // TODO this is not done yet, should be changed to use api search endpoint which is presumable yet to be created.*sigh*
// export const handleSearch = (searchKey) => {
//         const res = typeof searchKey !== 'string' || !searchKey ? searchResult : initialResults.filter(e => e.name.toLowerCase().includes(searchKey.toLocaleLowerCase()))
//         setData(res)
//     }

// export const filter = (filters) => {
//         // handle filtering the data by date
//         const startDate = filters.startDate
//         const endDate = filters.endDate ? filters.endDate : new Date()
//         const result = startDate === null ? initialResults : initialResults.filter(e => e.date >= startDate && e.date <= endDate)
//         setData(result)
//     }