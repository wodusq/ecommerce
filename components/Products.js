
import { ProductStyle } from '../styles/ProductStyle';
import Link from 'next/link';

export default function Product({product}){
    const {Title,price,image, slug} = product.attributes;
    return(
        <ProductStyle>
            <Link href={`product/${slug}`}>
                <div>
                        <img src={image.data.attributes.formats.small.url} alt="" />
                </div>
            </Link>
            <h2>{Title}</h2>
            <h3>{price}</h3>
        </ProductStyle>
    )
}
