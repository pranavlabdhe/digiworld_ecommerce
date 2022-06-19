import React, { useEffect, useState } from 'react'
import { getSubs } from '../../functions/sub'
import { Link } from 'react-router-dom'
const SubList = () => {
    const [subs,setSubs] = useState([])
    const [loading,setLoading] = useState(false)

    useEffect(()=>{
        setLoading(true)
        console.log("useEffect");
        getSubs()
        .then((res)=>{
            setSubs(res.data)
            setLoading(false)

        })
    },[])

    const showSubs = () =>
        subs.map((s)=>(
            <div className='col'>
            <Link to={`/sub/${s.slug}`} className="col-lg-12 text_color_1 btn btn-secondary ">{s.name} 
                 </Link>   
                 </div>
            // <div key={s._id} 
            // className='col p-2 btn btn-secondary  m-3 text_color_1' >
            //       <Link to={`/sub/${s.slug}`} className="text_color_1">{s.name} </Link>   
            //     </div>
        ));

  return (

    <div className='container-fluid'>
        <div className='row'>
            {loading ? (<h4 className='text-center'>Loading...</h4>) : (
                showSubs()
                )}
        </div>

    </div>
  )
}

export default SubList