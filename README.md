# tr-search-engine-mngr

This microservice has as goal manage all logic associated to search options' configuration.

## Install:

 - [ ] Clone that repo: https://github.com/ansantacruz/tr-data-model
 - [ ] Execute the next commands:

    `nvm install 16`

    `nvm use 16`

    `npm i`

    `npm start`


Please, if you have any problem, contact to ansantacruz@uan.edu.co

## Commits in GitHub:

It's very important that you implement perfectly the guide attached below to collaborate in this project: https://turepuesto.atlassian.net/wiki/spaces/LR/pages/3211265/Est+ndares+de+git

## Exposed resources  :

 1. **/products/get-types**:  Resource in charge of returning the different types of products that can be consulted (Spare parts and accessories currently).

         `curl --location --request GET 'localhost:9084/V1/products/get-types'`

  2. **/products/get-category-by-produc-type/?**:  Resource in charge of returning the types for each type of product (for accessories, helmets, gloves, etc., and for spare parts, engine, suspension, electrical, etc.).

         `curl --location --request GET 'localhost:9084/V1/products/get-category-by-produc-type/2'`

  3. **/motorcycles/get-motorcycles-brands**:  Resource in charge of returning the different motorcycle brands configured in the database and their related information.

         `curl --location --request GET 'localhost:9084/V1/motorcycles/get-motorcycles-brands'`

  4. **/motorcycles/get-motorcycles-by-brand/?**:  Resource in charge of returning the different motorcycle models for a specific brand.

          `curl --location --request GET 'localhost:9084/V1/motorcycles/get-motorcycles-by-brand/3'`
5. **/motorcycles/get-spare-parts/?/?**:  Resource in charge of returning the different motorcycle models for a specific brand.

           `curl --location --request GET 'localhost:9084/V1/motorcycles/get-spare-parts/2/12'`
6. **/accessories/get-brands-of-category/?**:  This resource returns the available brands for a given type of accessory (helmets, jackets, etc). 

           `curl --location --request GET 'localhost:9084/V1/motorcycles/get-spare-parts/2/12'`

6. **/accessories/get-propducts-by-brand/?/?**:  This resource returns the products associated with a brand and category. 

           `curl --location --request GET 'localhost:9084/V1/accessories/get-propducts-by-brand/2/2'`