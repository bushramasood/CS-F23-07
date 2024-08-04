import SummaryApi from "../common";
import { toast } from 'react-toastify';

const addToCart = async (e, id, customOrderText) => {
    e?.stopPropagation();
    e?.preventDefault();

    const response = await fetch(SummaryApi.addToCartProduct.url, {
        method: SummaryApi.addToCartProduct.method,
        credentials: 'include',
        headers: {
            "content-type": 'application/json'
        },
        body: JSON.stringify({
            productId: id,
            customOrderText // Add the custom order text to the request body
        })
    });

    const responseData = await response.json();

    if (responseData.success) {
        toast.success(responseData.message);
    }

    if (responseData.error) {
        toast.error(responseData.message);
    }

    return responseData;
};

export default addToCart;