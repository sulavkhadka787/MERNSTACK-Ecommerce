import {Link} from 'react-router-dom';

export default function Product(props){
    const {product}=props;
    return(
              <div className="item-img">
                  <Link to={`/product/${product._id}`}><img src={product.image} alt="#" /></Link>
                  <h2>{product.name}</h2>
              </div>    
    );

}