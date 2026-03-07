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

const searchLiveAmazonProducts = async (keyword) => {
    try {
        const options = {
            method: 'GET',
            url: 'https://real-time-amazon-data.p.rapidapi.com/search',
            params: {
                query: keyword,
                page: '1',
                country: 'IN',
                sort_by: 'RELEVANCE',
                product_condition: 'NEW'
            },
            headers: {
                'X-RapidAPI-Key': process.env.RAPIDAPI_KEY,
                'X-RapidAPI-Host': 'real-time-amazon-data.p.rapidapi.com'
            }
        };

        const response = await axios.request(options);

        if (response.data && response.data.data && response.data.data.products && response.data.data.products.length > 0) {
            return response.data.data.products.slice(0, 12).map(p => {
                let productUrl = p.product_url;
                if (productUrl) {
                    const tag = process.env.AMAZON_PARTNER_TAG || 'pricepeekindia-21';
                    if (productUrl.includes('?')) {
                        productUrl += `&tag=${tag}`;
                    } else {
                        productUrl += `?tag=${tag}`;
                    }
                }

                let numericPrice = null;
                if (p.product_price) {
                    numericPrice = Number(p.product_price.replace(/[^0-9.-]+/g, ""));
                }

                // Extract real brand from title (using first word or phrase if possible)
                let derivedBrand = 'Amazon Merchant';
                if (p.product_title) {
                    derivedBrand = p.product_title.split(' ')[0] || derivedBrand;
                }

                return {
                    _id: `amazon-${p.asin}`, // Dynamic ID mapped to real ASIN
                    name: p.product_title,
                    description: `Genuine product fetched in real-time right from Amazon India's live inventory system.`,
                    category: p.product_category || 'Electronics & More',
                    brand: derivedBrand,
                    images: [p.product_photo],
                    bestPrice: numericPrice,
                    bestStore: 'Amazon India',
                    bestPriceUrl: productUrl,
                    averageRating: p.product_star_rating ? Number(p.product_star_rating) : 0,
                    numReviews: p.product_num_ratings ? Number(p.product_num_ratings) : 0,
                };
            });
        }
        return [];
    } catch (error) {
        console.error('Error searching live Amazon data:', error.message);
        return [];
    }
};

const fetchLiveAmazonProductDetails = async (asin) => {
    try {
        const options = {
            method: 'GET',
            url: 'https://real-time-amazon-data.p.rapidapi.com/product-details',
            params: {
                asin: asin,
                country: 'IN'
            },
            headers: {
                'X-RapidAPI-Key': process.env.RAPIDAPI_KEY,
                'X-RapidAPI-Host': 'real-time-amazon-data.p.rapidapi.com'
            }
        };

        const response = await axios.request(options);
        const p = response.data.data;
        
        if (p) {
             let productUrl = p.product_url;
             if (productUrl) {
                 const tag = process.env.AMAZON_PARTNER_TAG || 'pricepeekindia-21';
                 if (productUrl.includes('?')) {
                     productUrl += `&tag=${tag}`;
                 } else {
                     productUrl += `?tag=${tag}`;
                 }
             }

             let numericPrice = null;
             if (p.product_price) {
                 numericPrice = Number(p.product_price.replace(/[^0-9.-]+/g, ""));
             }

             return {
                 _id: `amazon-${asin}`,
                 name: p.product_title,
                 description: p.product_description || 'Product details fetched directly from Amazon India.',
                 category: 'Searched Amazon Product',
                 brand: p.product_byline || 'Amazon',
                 images: [p.product_photo],
                 bestPrice: numericPrice,
                 averageRating: p.product_star_rating ? Number(p.product_star_rating) : 0,
                 numReviews: p.product_num_ratings ? Number(p.product_num_ratings) : 0,
                 stores: [
                     {
                         store: {
                             name: 'Amazon India (Live API)',
                             websiteUrl: 'https://amazon.in',
                             logo: 'https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg'
                         },
                         price: numericPrice,
                         currency: 'INR',
                         productUrl: productUrl,
                         isAvailable: true,
                         history: [] 
                     }
                 ]
             };
        }
        return null;
    } catch(err) {
        console.error('Failed to get live amazon product detail', err.message);
        return null;
    }
}

module.exports = {
    fetchLiveAmazonPrice,
    searchLiveAmazonProducts,
    fetchLiveAmazonProductDetails
};
