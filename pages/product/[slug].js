import {useQuery} from 'urql';
import { GET_PRODUCT_QUERY } from '../../lib/query';
import {useRouter} from 'next/router';
import { DetailsStyle, ProductInfo, Quantity, Buy } from '../../styles/ProductDetails';
import {AiFillPlusCircle,AiFillMinusCircle} from 'react-icons/ai';
import { useStateContext } from '../../lib/context';
import toast from 'react-hot-toast';
import { useEffect } from 'react';


export default function ProductDetails(){
    //use state
    const {qty, increaseQty, decreaseQty, onAdd, setQty} = useStateContext();

    //reset Qty
    useEffect(()=>{
        setQty(1);
    },[])
    //fetch slug
    const router = useRouter();
    console.log(router);

    const {query} = useRouter();

    //Ftch graphql data
    const [results] = useQuery({
        query: GET_PRODUCT_QUERY,
        variables: {slug: query.slug},
    });
    const{data,fetching,error} = results;
    if(fetching) return <p>Loading...</p>
    if (error) return <p>oh no... {error.message}</p>
    //extract our data

    const {Title, description, image} = data.products.data[0].attributes;

    //create a toast
    const notify = () =>{
        toast.success(`${Title} added to your card`, {duration:1500});
    };

    return(
        <DetailsStyle>
            <img src={image.data.attributes.formats.medium.url} alt={Title} />
            <ProductInfo>
                <h3>{Title}</h3>
                <p>{description}</p>
                <Quantity>
                    <span>Quantity</span>
                    <button><AiFillMinusCircle onClick={decreaseQty}/></button>
                    <p>{qty}</p>
                    <button><AiFillPlusCircle onClick={increaseQty}/></button>
                </Quantity>
                <Buy onClick={()=> {
                onAdd(data.products.data[0].attributes,qty);
                notify();
                
                }}>Add to cart</Buy>
            </ProductInfo>
        </DetailsStyle>
    );
}