import React from 'react'
import {Select} from 'antd'
const {Option} =Select 
const ProductCreateForm = ({handleChange,handleSubmit,values,handleCategoryChange,showSub,subOptions,setValues}) => {
    const {title,description,price,categories,category,subs,shipping,quantity,images,colors,brands,color,brand} = values
  return (
    <>
         <form onSubmit={handleSubmit}>
                
                <div className='form-group'>
                    <label>Title</label>
                    <input type="text" name="title" className='form-control' value={title} onChange={handleChange}/>
                </div>

                <div className='form-group'>
                    <label>Description</label>
                    <input type="text" name="description" className='form-control' value={description} onChange={handleChange}/>
                </div>


                <div className='form-group'>
                    <label>Price</label>
                    <input type="number" name="price" className='form-control' value={price} onChange={handleChange}/>
                </div>

                <div className='form-group'>
                    <label>Shipping</label>
                     <select name="shipping" className='form-control' onChange={handleChange}>
                    <option >---Please Select--</option>
                    <option value="No">No</option>
                    <option value="Yes">Yes</option>
                     </select>
                </div>

                
                <div className='form-group'>
                    <label>Quantity</label>
                    <input type="number" name="quantity" className='form-control' value={quantity} onChange={handleChange}/>
                </div>

                <div className='form-group'>
                    <label>Color</label>
                     <select name="color" className='form-control' onChange={handleChange}>
                  
                    <option>---Please Select Color---</option>
                    {colors.map((c)=>{
                        return (
                            <option key={c} value={c}>{c}</option>
                        )
                    })}
                     </select>
                </div>
            
                <div className='form-group'>
                    <label>Brand</label>
                     <select name="brand" className='form-control' onChange={handleChange}>
                    
                    <option>---Please Select Brand---</option>
                    {brands.map((b)=>{
                        return (
                            <option key={b} value={b}>{b}</option>
                        )
                    })}
                     </select>
                </div>
            
                <div className='form-group'>
                      <label className='mt-2'> Category</label>
                      <select name='category' className='form-control mt-2 ' onChange={handleCategoryChange}>
                      <option>---Please select category---</option>
                        {categories.length > 0 && categories.map((c)=>{
                            return(
                                <option key={c._id} value={c._id}>{c.name}</option>
                            )
                        })}
                      </select>
                  </div>
          
                    {showSub && (
                    <div>
                    <label className='mt-2'> SubCategory</label>
                    <Select
                        mode="multiple"
                        style={{width:'100%'}}
                        placeholder="Please Select"
                        value={subs}
                        
                        onChange={((value)=>setValues({...values,subs:value}))}
                    >
                        {subOptions.length && subOptions.map((s)=>{
                            return(
                                <Option key={s._id} value={s._id} >{s.name}</Option>
                            )
                        })}
        
                    </Select>
                    </div>)}
                <br/>
                    <button className='btn btn-outline-info mt-3'>Save</button>
            </form>
    </>
  )
}

export default ProductCreateForm
