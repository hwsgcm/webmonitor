



// Array of URLs to check
const urls = [
    'https://www.sgcarmart.com',
    'https://www.sgcarmart.com/used_cars/index.php',
    'https://www.sgcarmart.com/shop',
    'https://www.sgcarmart.com/shop-login/login',
    'https://www.sgcarmart.com/used-cars/starad-listings',
    'https://www.sgcarmart.com/electric-vehicle',
    'https://www.mycarforum.com',
    'https://www.quotz.com.sg',
    'https://www.vbook.com.sg/index.php',
    'https://www.torque.com.sg',
    'https://sanxe.toyotasure.vn',
    'https://sanxeapp.toyotasure.vn/robots.txt',
    'https://endpoint.sgcarmart.com/api-shop/guest-token',
    'https://endpoint.sgcarmart.com/api-shop/robots.txt',
    'https://www.sgcarmart.com/coe-price'
];

const postUrl = 'https://facebook.carmall.com/cron_zHN0UW3t2G5d/monitor_mail.php'; // Replace with the URL where you want to post the data

async function fetchAndPostStatusCodes() {
    try {
        const results = await Promise.all(urls.map(async (url) => {
            const response = await fetch(url);
            const statusCode = response.status;
            return { url, statusCode };
        }));

        // Collect URLs with status codes not equal to 200
        const errorResults = results.filter(result => result.statusCode !== 200);

        if (errorResults.length > 0) {
            const postData = errorResults.map(result => `url=${encodeURIComponent(result.url)}&statusCode=${result.statusCode}`).join('&');

            try {
                const postResponse = await fetch(postUrl, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    body: postData
                });

                console.log(`Posted data - Status: ${postResponse.status}`);
            } catch (error) {
                console.error('Error posting data:', error);
            }
        } else {
            console.log('All URLs returned status code 200.');
        }
    } catch (error) {
        console.error('Error fetching URLs:', error);
    }
}

fetchAndPostStatusCodes();
