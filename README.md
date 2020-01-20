[![Actions Status](https://github.com/ApmeM/keshir/workflows/Node%20CI/badge.svg)](https://github.com/ApmeM/keshir/actions)

# Description 

Serverless E-shop website. All server-side functions (product database, order storage) are handled by google services:
- For products source - Google spreadsheed csv exported file
- For order placing - Google form with 2 fields

Configuration stored in [.env](https://github.com/ApmeM/keshir/blob/master/.env) file:
```
REACT_APP_LOGO - Text that is displayed in page title, header and footer
REACT_APP_FORM_ID - Id of a google form store orders information. Can be found in network tab when posting form from web.
REACT_APP_FORM_CONTACT_ID - Id of a google form field to store contact information. Can be found in network tab when posting form from web.
REACT_APP_FORM_PRODUCTS_ID - Id of a google form field to store selected products information. Can be found in network tab when posting form from web.
REACT_APP_SPREADSHEET_ID - Id of a google spreadsheet that have csv export enabled to get products
REACT_APP_SPREADSHEET_PAGE_ID - Id of a page in a google spreadsheet that have csv export enabled to get products
```

Deployed to firebase using npm firebase-tools package and github actions.

# Credentials

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
