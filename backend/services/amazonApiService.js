const axios = require('axios');

/**
 * Service to fetch live real-time price data from Amazon via RapidAPI
 */
const fetchLiveAmazonPrice = async (keyword) => {
    try {
        const options = {
            method: 'GET',
            url: 'https://real-time-amazon-data.p.rapidapi.com/search',
            params: {
                query: keyword,
                page: '1',
                country: 'IN', // Ensuring we pull from Amazon India
                sort_by: 'RELEVANCE',
                product_condition: 'NEW'
            },
            headers: {
                'X-RapidAPI-Key': process.env.RAPIDAPI_KEY,
                'X-RapidAPI-Host': 'real-time-amazon-data.p.rapidapi.com'
            }
        };

        const response = await axios.request(options);
        
        // Ensure data is structured properly and extract the first relevant product
        if (response.data && response.data.data && response.data.data.products && response.data.data.products.length > 0) {
            const topProduct = response.data.data.products[0];
            
            // Build the affiliate URL
            let productUrl = topProduct.product_url;
            if (productUrl) {
                // Ensure it has the correct affiliate tag
                const tag = process.env.AMAZON_PARTNER_TAG || 'pricepeekindia-21';
                
                // If the URL already has query params, append with &, else ?
                if (productUrl.includes('?')) {
                    productUrl += `&tag=${tag}`;
                } else {
                    productUrl += `?tag=${tag}`;
                }
            }

            // Extract price safely (removes ₹ symbol and commas to convert to Number)
            let numericPrice = null;
            if (topProduct.product_price) {
                numericPrice = Number(topProduct.product_price.replace(/[^0-9.-]+/g, ""));
            }

            return {
                store: 'Amazon India',
                price: numericPrice,
                url: productUrl,
                title: topProduct.product_title,
                image: topProduct.product_photo,
                inStock: true // Assuming in stock if it's currently listed and priced
            };
        }
        
        return null;
    } catch (error) {
        console.error('Error fetching live Amazon data:', error.message);
        return null; // Return null if fetching fails so we can fallback to DB data
    }
};

module.exports = {
    fetchLiveAmazonPrice
};
