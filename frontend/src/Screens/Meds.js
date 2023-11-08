import "./Meds.css"
const Meds = () =>{
    return(
        <div className="meds">
            <div className="medscreen_left">
                <div className="left_img">
                    <img src="https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.istockphoto.com%2Fphotos%2Fmedication&psig=AOvVaw1OQVHNftXTwBLMRy6QIoRT&ust=1699424613973000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCJC8wpWgsYIDFQAAAAAdAAAAABAE"  alt="med name"/>
                </div>

                <div className="left_info">
                    <p className="left_name">Med1</p>
                    <p>Price: 1000$ </p>
                    <p>Description: Medicines are chemicals or compounds used to cure, halt, or prevent disease; ease symptoms; or help in the diagnosis of illnesses. Advances in medicines have enabled doctors to cure many diseases and save lives. These days, medicines come from a variety of sources.</p>
                </div>

            </div>
            <div className="medscreen_right">
                <div className="right_info">
                    <p>
                        price: <span>$1000</span>
                    </p>
                    <p>
                        Status : <span>In stock</span>
                    </p>
                    <p>
                        Quantity
                        <select>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                        </select>
                    </p>
                    <p>
                        <button type="button"> Add to cart

                        </button>
                    </p>

                </div>
                
            </div>

        </div>
    )
} 

export default Meds;