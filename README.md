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

 1. **/search-config**:  This resource has as goal return all configuration available in DB for build the search window in the front end. 

         `curl --location --request GET 'localhost:9084/V1/search-config'`
 