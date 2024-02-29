import React, { useEffect, useState } from 'react'
import "./style.css"

const LoadMore = () => {

    const [loading, setLoading] = useState(false);

    const [count, setCount] = useState(0);
    const [data, setData] = useState([]);
    const [disable, setDisable] = useState(false);

    const fetchData = async () => {
        try {

            setLoading(true);
            const response = await fetch(`https://dummyjson.com/products?limit=20&skip=${count
                === 0 ? 0 : count * 20}`);

            const result = await response.json();

            if (result && result.products && result.products.length) {
                setLoading(false);
                setData(result.products)

            }

            // console.log(result)
        }
        catch (e) {
            console.log(e)
        }
    }

     console.log(data);
   
    useEffect(() => {
        fetchData();
    }, [count]);

    useEffect(() => {
        if (data.length && data[data.length-1].id === 100) setDisable(true)
        else setDisable(false)
    }, [data])

    if (loading) {
        return <div>Loading Please</div>
    }
    return (
        <div className='container'>
            <div className="product-container">
                {
                    data && data.map(product => {
                        return <div key={product.id} className="loadMore">
                            <img src={product.thumbnail} alt={product.title} />
                            <p>{product.title}</p>
                        </div>
                    })
                }
            </div>
            <div className="load-button">
                <button disabled={disable} onClick={() => setCount(count + 1)}>Load More</button>
                <button onClick={() => setCount(count === 0 ? 0 : count - 1)}>Load Previous</button>
            </div>
            {
                disable && <p>Your product is up to 100</p>
            }
        </div>
    )
}

export default LoadMore