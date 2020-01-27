[![Actions Status](https://github.com/ApmeM/keshir/workflows/Node%20CI/badge.svg)](https://github.com/ApmeM/keshir/actions)

# Description 

Serverless E-shop website. All server-side functions (product database, order storage) are handled by someone else services (like Google):
- For products csv file source you can use Google spreadsheed csv exported file
- For order placing - Google form with 2 fields

#### Configuration

Basic configuration stored in [.env](https://github.com/ApmeM/keshir/blob/master/.env) file:
```
REACT_APP_LOGO - Text that is displayed in page title, header and footer
REACT_APP_CSV_URL - Url to download csv product files example of the file located in [public](https://github.com/ApmeM/keshir/blob/master/public/products.csv) folder
REACT_APP_ORDER_URL - Url to post selected products
REACT_APP_ORDER_URL_CONTACT_NAME - field name for contact information
REACT_APP_ORDER_URL_PRODUCTS_NAME - field name for selected products data
```

Deployed to firebase using npm firebase-tools package and github actions.

#### CSV

CSV contains following columns to be presented to a user:
```
id - product or variant id. It will be used to identify product in a system and will be sent back to REACT_APP_ORDER_URL with all product descriptions
     if id is not set - name is treated as a beginning of a new category.
name - name of a product or category. 
       if category name started with '-' it will not be displayed in to navigation menu
variant - product variant name. Displayed on product page when variant is selected
available - number of products available in stock.
            if undefined means infinity
selection - values for comboboxes that is has no price effect (like color or size) that is available to select.
            format : selectionName:value1[, value2...][;selectionName:value1[, value2...]]
            for example:  Size:12,16,20,24;Color:Black,White
            if not set - nothing to select and purchase button available when displayed
description - short text that is displayed under the name on a product card
characteristics - long html text to show on product page
price - price of a variant or product
originalPrice - price to be shown striked if product is on sale (can be bigger then price)
                if it is not empty and not equal to price - it will be displayed stiked on all pages
currency - currency of a product price
thumbanil - url to thubnail image
images - url to large image 
```

# Credentials

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
