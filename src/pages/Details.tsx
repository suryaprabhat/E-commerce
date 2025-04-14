import { useParams } from "react-router-dom";
import { products } from "../data/products";
import { ProductDetails } from "../components/ProductDetails";

export const Details: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const product = products.find((p) => p.id === Number(id));

  if (!product) {
    return (
      <div className="not-found">
        <h2>Product not found</h2>
        <p>The product you're looking for doesn't exist.</p>
      </div>
    );
  }

  return <ProductDetails product={product} />;
};
